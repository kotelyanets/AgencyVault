import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";

import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16" as Stripe.LatestApiVersion,
});

export async function POST(req: Request) {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Webhook secret not configured." }, { status: 500 });
  }

  const body = await req.text();
  const signature = headers().get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe signature." }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const workspaceId = session.metadata?.workspaceId;

    if (workspaceId) {
      await prisma.workspace.update({
        where: { id: workspaceId },
        data: {
          plan: "PRO",
          subscriptionStatus: "ACTIVE",
          stripeCustomerId: typeof session.customer === "string" ? session.customer : null,
          stripeSubscriptionId: typeof session.subscription === "string" ? session.subscription : null,
          stripePriceId: process.env.STRIPE_PRO_PRICE_ID ?? null,
        },
      });
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;

    await prisma.workspace.updateMany({
      where: { stripeSubscriptionId: subscription.id },
      data: {
        plan: "TRIAL",
        subscriptionStatus: "CANCELED",
      },
    });
  }

  return NextResponse.json({ received: true });
}

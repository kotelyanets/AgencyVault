import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Stripe from "stripe";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16" as Stripe.LatestApiVersion,
});

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.workspaceId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.STRIPE_PRO_PRICE_ID || !process.env.NEXTAUTH_URL) {
    return NextResponse.json({ error: "Stripe is not configured." }, { status: 500 });
  }

  const workspace = await prisma.workspace.findUnique({
    where: { id: session.user.workspaceId },
    select: { id: true, stripeCustomerId: true },
  });

  if (!workspace) {
    return NextResponse.json({ error: "Workspace not found." }, { status: 404 });
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price: process.env.STRIPE_PRO_PRICE_ID,
        quantity: 1,
      },
    ],
    customer: workspace.stripeCustomerId ?? undefined,
    success_url: `${process.env.NEXTAUTH_URL}/dashboard/faturacao?success=true`,
    cancel_url: `${process.env.NEXTAUTH_URL}/dashboard/faturacao?canceled=true`,
    metadata: {
      workspaceId: workspace.id,
    },
  });

  return NextResponse.json({ url: checkoutSession.url });
}

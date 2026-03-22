require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

try {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const p = new PrismaClient({ adapter });
  console.log("Success with connectionString inside PrismaPg");
} catch(e) {
  console.error("Failed connectionString method:", e.message);
  try {
    const { Pool } = require('pg');
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    const p = new PrismaClient({ adapter });
    console.log("Success with Pool method");
  } catch(e2) {
    console.error("Failed Pool method:", e2.message);
  }
}

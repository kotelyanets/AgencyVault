const { PrismaClient } = require('@prisma/client');
try {
  new PrismaClient("postgres://dummy:dummy@localhost/dummy");
  console.log("String works");
} catch(e) { console.error("String failed:", e.message); }

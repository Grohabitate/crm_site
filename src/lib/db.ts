import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { PrismaClient } = require("@prisma/client");

type PrismaClientType = typeof PrismaClient;

const prisma = new PrismaClient();

declare global {
  var prisma: PrismaClientType | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db

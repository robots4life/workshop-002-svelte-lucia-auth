import { Prisma, PrismaClient } from '@prisma/client';

export const db = new PrismaClient({
	log: ['query']
});

export const PrismaError = Prisma;

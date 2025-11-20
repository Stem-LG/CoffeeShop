"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getCategoriesWithItems() {
    try {
        const categories = await prisma.category.findMany({
            include: {
                items: {
                    where: {
                        isAvailable: true,
                    },
                },
            },
        });
        return categories;
    } catch (error) {
        console.error("Failed to fetch menu:", error);
        return [];
    }
}

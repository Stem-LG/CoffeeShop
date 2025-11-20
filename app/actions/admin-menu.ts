"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function createMenuItem(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const price = parseFloat(formData.get("price") as string);
        const categoryId = formData.get("categoryId") as string;
        const image = formData.get("image") as string;

        await prisma.menuItem.create({
            data: {
                name,
                description,
                price,
                categoryId,
                image: image || null,
            },
        });

        revalidatePath("/admin/menu");
        revalidatePath("/menu");
        return { success: true };
    } catch (error) {
        console.error("Failed to create menu item:", error);
        return { success: false, error: "Failed to create item" };
    }
}

export async function deleteMenuItem(id: string) {
    try {
        await prisma.menuItem.delete({
            where: { id },
        });
        revalidatePath("/admin/menu");
        revalidatePath("/menu");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete menu item:", error);
        return { success: false, error: "Failed to delete item" };
    }
}

"use server";

import { PrismaClient } from "@prisma/client";
import { CartItem } from "@/context/CartContext";

const prisma = new PrismaClient();

type CreateOrderData = {
    customerName: string;
    customerEmail?: string;
    customerPhone: string;
    address: string;
    items: CartItem[];
    totalAmount: number;
};

export async function createOrder(formData: FormData) {
    try {
        const customerName = formData.get("customerName") as string;
        const customerEmail = formData.get("customerEmail") as string;
        const customerPhone = formData.get("customerPhone") as string;
        const address = formData.get("address") as string;
        const itemsJson = formData.get("items") as string;
        const totalAmountString = formData.get("totalAmount") as string;

        const items = JSON.parse(itemsJson) as CartItem[];
        const totalAmount = parseFloat(totalAmountString);

        // Generate a simple tracking number (e.g., ORD-123456)
        const trackingNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

        const order = await prisma.order.create({
            data: {
                trackingNumber,
                customerName,
                customerEmail,
                customerPhone,
                address,
                totalAmount,
                items: {
                    create: items.map((item) => ({
                        menuItemId: item.id,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                },
            },
        });

        return { success: true, trackingNumber: order.trackingNumber };
    } catch (error) {
        console.error("Failed to create order:", error);
        return { success: false, error: "Failed to create order" };
    }
}

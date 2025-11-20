"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function trackStatus(number: string) {
    try {
        if (number.startsWith("ORD-")) {
            const order = await prisma.order.findUnique({
                where: { trackingNumber: number },
                include: { items: { include: { menuItem: true } } },
            });
            if (order) return { type: "order", data: order };
        } else if (number.startsWith("RES-")) {
            const reservation = await prisma.reservation.findUnique({
                where: { reservationNumber: number },
            });
            if (reservation) return { type: "reservation", data: reservation };
        }
        return { error: "Number not found" };
    } catch (error) {
        console.error("Failed to track status:", error);
        return { error: "Failed to track status" };
    }
}

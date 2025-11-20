"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function updateReservationStatus(reservationId: string, newStatus: string) {
    try {
        await prisma.reservation.update({
            where: { id: reservationId },
            data: { status: newStatus },
        });
        revalidatePath("/admin/reservations");
        revalidatePath("/admin/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Failed to update reservation status:", error);
        return { success: false, error: "Failed to update status" };
    }
}

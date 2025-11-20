"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type CreateReservationData = {
    customerName: string;
    customerEmail?: string;
    customerPhone: string;
    date: Date;
    guests: number;
};

export async function createReservation(data: CreateReservationData) {
    try {
        // Generate a simple reservation number (e.g., RES-123456)
        const reservationNumber = `RES-${Math.floor(100000 + Math.random() * 900000)}`;

        const reservation = await prisma.reservation.create({
            data: {
                reservationNumber,
                customerName: data.customerName,
                customerEmail: data.customerEmail,
                customerPhone: data.customerPhone,
                date: data.date,
                guests: data.guests,
            },
        });

        return { success: true, reservationNumber: reservation.reservationNumber };
    } catch (error) {
        console.error("Failed to create reservation:", error);
        return { success: false, error: "Failed to create reservation" };
    }
}

"use server";

import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function login(prevState: any, formData: FormData) {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const admin = await prisma.admin.findUnique({
        where: { username },
    });

    if (admin && admin.password === password) {
        // Set a simple session cookie
        const cookieStore = await cookies();
        cookieStore.set("admin_session", admin.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });
        redirect("/admin/dashboard");
    } else {
        return { error: "Invalid credentials" };
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
    redirect("/admin/login");
}

export async function getAdminSession() {
    const cookieStore = await cookies();
    return cookieStore.get("admin_session")?.value;
}

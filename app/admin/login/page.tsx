"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Coffee } from "lucide-react";

const initialState = {
    error: "",
};

export default function AdminLoginPage() {
    // @ts-ignore - useActionState types are tricky with server actions returning different shapes
    const [state, formAction] = useActionState(login, initialState);

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Coffee className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-2xl font-serif">Admin Login</CardTitle>
                    <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="username" className="text-sm font-medium">Username</label>
                            <Input id="username" name="username" required placeholder="admin" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium">Password</label>
                            <Input id="password" name="password" type="password" required placeholder="•••••" />
                        </div>
                        {state?.error && (
                            <p className="text-sm text-red-500 text-center">{state.error}</p>
                        )}
                        <Button type="submit" className="w-full">Sign In</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

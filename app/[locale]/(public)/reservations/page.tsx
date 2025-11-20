"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Calendar, Clock, Users, CheckCircle } from "lucide-react";
import { createReservation } from "@/app/actions/reservation";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function ReservationsPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [reservationComplete, setReservationComplete] = useState<{ reservationNumber: string } | null>(null);
    const t = useTranslations('Reservations');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const dateStr = formData.get("date") as string;
        const timeStr = formData.get("time") as string;

        // Combine date and time
        const dateTime = new Date(`${dateStr}T${timeStr}`);

        const data = {
            customerName: formData.get("name") as string,
            customerEmail: formData.get("email") as string,
            customerPhone: formData.get("phone") as string,
            guests: parseInt(formData.get("guests") as string),
            date: dateTime,
        };

        const result = await createReservation(data);

        if (result.success && result.reservationNumber) {
            setReservationComplete({ reservationNumber: result.reservationNumber });
        } else {
            alert("Failed to make reservation. Please try again.");
        }
        setIsSubmitting(false);
    };

    if (reservationComplete) {
        return (
            <div className="container mx-auto px-4 py-12 md:px-6 flex flex-col items-center justify-center text-center min-h-[60vh]">
                <div className="mb-6 rounded-full bg-green-100 p-6 text-green-600">
                    <CheckCircle className="h-12 w-12" />
                </div>
                <h1 className="mb-4 text-3xl font-bold font-serif">{t('successTitle')}</h1>
                <p className="mb-8 text-lg text-muted-foreground">
                    {t('reservationNumber')} <span className="font-bold text-foreground">{reservationComplete.reservationNumber}</span>
                </p>
                <div className="flex gap-4">
                    <Link href="/track">
                        <Button variant="outline">{t('checkStatus')}</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-serif">{t('title')}</h1>
                <p className="max-w-[700px] text-muted-foreground text-lg">
                    {t('description')}
                </p>
            </div>

            <div className="mx-auto max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardTitle>{t('detailsTitle')}</CardTitle>
                        <p className="text-sm text-muted-foreground">{t('detailsDesc')}</p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                                    <Input id="name" name="name" required placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                                    <Input id="email" name="email" type="email" required placeholder="john@example.com" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                                <Input id="phone" name="phone" type="tel" required placeholder="(555) 123-4567" />
                            </div>
                            <div className="grid gap-4 sm:grid-cols-3">
                                <div className="space-y-2">
                                    <label htmlFor="date" className="text-sm font-medium">{t('date')}</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input id="date" name="date" type="date" required className="pl-9" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="time" className="text-sm font-medium">{t('time')}</label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input id="time" name="time" type="time" required className="pl-9" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="guests" className="text-sm font-medium">{t('guests')}</label>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input id="guests" name="guests" type="number" min="1" max="20" required className="pl-9" placeholder="2" />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="specialRequests" className="text-sm font-medium">Special Requests (Optional)</label>
                                <Input id="specialRequests" name="specialRequests" placeholder="High chair, allergies, etc." />
                            </div>

                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? t('booking') : t('confirm')}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Search, Package, Calendar, CheckCircle, Clock, Truck } from "lucide-react";
import { trackStatus } from "@/app/actions/track";
import { useTranslations } from "next-intl";

export default function TrackPage() {
    const [statusResult, setStatusResult] = useState<any>(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const t = useTranslations('Track');

    const handleTrack = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setStatusResult(null);
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const trackingNumber = formData.get("trackingNumber") as string;

        if (!trackingNumber) {
            setError("Please enter a tracking number.");
            setIsLoading(false);
            return;
        }

        const result = await trackStatus(trackingNumber);

        if ('error' in result) {
            setError(result.error || "Could not find order or reservation.");
        } else {
            setStatusResult(result);
        }
        setIsLoading(false);
    };

    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-serif">{t('title')}</h1>
                <p className="max-w-[700px] text-muted-foreground text-lg">
                    {t('description')}
                </p>
            </div>

            <div className="mx-auto max-w-xl space-y-8">
                <Card>
                    <CardContent className="pt-6">
                        <form onSubmit={handleTrack} className="flex gap-2">
                            <Input
                                name="trackingNumber"
                                placeholder={t('placeholder')}
                                className="flex-1"
                            />
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? <Clock className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                                <span className="ml-2">{t('button')}</span>
                            </Button>
                        </form>
                        {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
                    </CardContent>
                </Card>

                {statusResult && statusResult.type === 'order' && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Package className="h-5 w-5 text-primary" />
                                {t('orderDetails')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center border-b pb-4">
                                <span className="font-medium text-muted-foreground">Status</span>
                                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-sm">
                                    {statusResult.data.status}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-muted-foreground">{t('customer')}</p>
                                    <p className="font-medium">{statusResult.data.customerName}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">{t('total')}</p>
                                    <p className="font-medium">${statusResult.data.totalAmount.toFixed(2)}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-muted-foreground mb-2">{t('items')}</p>
                                <ul className="space-y-2">
                                    {statusResult.data.items.map((item: any) => (
                                        <li key={item.id} className="flex justify-between text-sm">
                                            <span>{item.quantity}x {item.menuItem.name}</span>
                                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {statusResult && statusResult.type === 'reservation' && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-primary" />
                                {t('reservationDetails')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center border-b pb-4">
                                <span className="font-medium text-muted-foreground">Status</span>
                                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-sm">
                                    {statusResult.data.status}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-muted-foreground">{t('customer')}</p>
                                    <p className="font-medium">{statusResult.data.customerName}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Guests</p>
                                    <p className="font-medium">{statusResult.data.guests}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Date</p>
                                    <p className="font-medium">{new Date(statusResult.data.date).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Time</p>
                                    <p className="font-medium">{new Date(statusResult.data.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}

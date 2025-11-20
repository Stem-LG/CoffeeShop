"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const t = useTranslations('Contact');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSent(true);
        setIsSubmitting(false);
    };

    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-serif">{t('title')}</h1>
                <p className="max-w-[700px] text-muted-foreground text-lg">
                    {t('description')}
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
                {/* Contact Info */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('infoTitle')}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                    <h3 className="font-medium">{t('addressTitle')}</h3>
                                    <p className="text-muted-foreground">
                                        123 Coffee Street<br />
                                        Paris, France 75001
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                    <h3 className="font-medium">{t('phoneTitle')}</h3>
                                    <p className="text-muted-foreground">+33 1 23 45 67 89</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Mail className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                    <h3 className="font-medium">{t('emailTitle')}</h3>
                                    <p className="text-muted-foreground">hello@portocoffee.com</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>{t('hoursTitle')}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">{t('weekdays')}</span>
                                <span className="font-medium">7:00 AM - 8:00 PM</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">{t('saturday')}</span>
                                <span className="font-medium">8:00 AM - 9:00 PM</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">{t('sunday')}</span>
                                <span className="font-medium">8:00 AM - 6:00 PM</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Contact Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>{t('formTitle')}</CardTitle>
                        <p className="text-sm text-muted-foreground">{t('formDesc')}</p>
                    </CardHeader>
                    <CardContent>
                        {isSent ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="mb-4 rounded-full bg-green-100 p-4 text-green-600">
                                    <Send className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{t('successTitle')}</h3>
                                <p className="text-muted-foreground">{t('successDesc')}</p>
                                <Button
                                    variant="outline"
                                    className="mt-6"
                                    onClick={() => setIsSent(false)}
                                >
                                    {t('sendAnother')}
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label htmlFor="firstName" className="text-sm font-medium">{t('firstName')}</label>
                                        <Input id="firstName" required placeholder="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="lastName" className="text-sm font-medium">{t('lastName')}</label>
                                        <Input id="lastName" required placeholder="Doe" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">{t('email')}</label>
                                    <Input id="email" type="email" required placeholder="john@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-medium">{t('subject')}</label>
                                    <Input id="subject" required placeholder={t('subjectPlaceholder')} />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium">{t('message')}</label>
                                    <textarea
                                        id="message"
                                        required
                                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder={t('messagePlaceholder')}
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? t('sending') : t('send')}
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

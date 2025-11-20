"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { Link } from "@/i18n/routing";
import { createOrder } from "@/app/actions/order";
import { useTranslations } from "next-intl";

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [orderResult, setOrderResult] = useState<{ success: boolean; trackingNumber?: string; error?: string } | null>(null);
    const t = useTranslations('Cart');

    const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsCheckingOut(true);

        const formData = new FormData(e.currentTarget);

        // Add items to formData as JSON string
        formData.append("items", JSON.stringify(items));
        formData.append("totalAmount", totalPrice.toString());

        const result = await createOrder(formData);

        if (result.success) {
            clearCart();
            setOrderResult(result);
        } else {
            setOrderResult(result);
        }
        setIsCheckingOut(false);
    };

    if (orderResult?.success) {
        return (
            <div className="container mx-auto px-4 py-12 md:px-6 flex flex-col items-center justify-center text-center min-h-[60vh]">
                <div className="mb-6 rounded-full bg-green-100 p-6 text-green-600">
                    <ShoppingBag className="h-12 w-12" />
                </div>
                <h1 className="mb-4 text-3xl font-bold font-serif">{t('successTitle')}</h1>
                <p className="mb-8 text-lg text-muted-foreground">
                    {t('trackingNumber')} <span className="font-bold text-foreground">{orderResult.trackingNumber}</span>
                </p>
                <div className="flex gap-4">
                    <Link href="/track">
                        <Button variant="outline">{t('trackOrder')}</Button>
                    </Link>
                    <Link href="/">
                        <Button>{t('backToHome')}</Button>
                    </Link>
                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-12 md:px-6 flex flex-col items-center justify-center text-center min-h-[60vh]">
                <div className="mb-6 rounded-full bg-secondary p-6 text-primary">
                    <ShoppingBag className="h-12 w-12" />
                </div>
                <h1 className="mb-4 text-3xl font-bold font-serif">{t('empty')}</h1>
                <p className="mb-8 text-lg text-muted-foreground">
                    {t('emptyDesc')}
                </p>
                <Link href="/menu">
                    <Button size="lg" className="gap-2">
                        <ArrowLeft className="h-4 w-4" /> {t('browseMenu')}
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <h1 className="mb-8 text-3xl font-bold font-serif">{t('title')}</h1>
            <div className="grid gap-8 lg:grid-cols-2">
                {/* Cart Items */}
                <div className="space-y-4">
                    {items.map((item) => (
                        <Card key={item.id} className="flex flex-row items-center p-4 gap-4">
                            {item.image && (
                                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md">
                                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                </div>
                            )}
                            <div className="flex-1">
                                <h3 className="font-bold">{item.name}</h3>
                                <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                    <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                    <Plus className="h-3 w-3" />
                                </Button>
                            </div>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="text-destructive hover:text-destructive"
                                onClick={() => removeFromCart(item.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </Card>
                    ))}
                    <div className="flex justify-between border-t pt-4 text-lg font-bold">
                        <span>Total</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                </div>

                {/* Checkout Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>{t('deliveryDetails')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleCheckout} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="customerName" className="text-sm font-medium">{t('name')}</label>
                                <Input id="customerName" name="customerName" required placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="customerEmail" className="text-sm font-medium">{t('email')}</label>
                                <Input id="customerEmail" name="customerEmail" type="email" placeholder="john@example.com" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="customerPhone" className="text-sm font-medium">{t('phone')}</label>
                                <Input id="customerPhone" name="customerPhone" type="tel" required placeholder="(555) 123-4567" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="address" className="text-sm font-medium">{t('address')}</label>
                                <Input id="address" name="address" required placeholder="123 Main St, Apt 4B" />
                            </div>

                            {orderResult?.error && (
                                <div className="text-sm text-destructive">{orderResult.error}</div>
                            )}

                            <Button type="submit" className="w-full" disabled={isCheckingOut}>
                                {isCheckingOut ? t('placingOrder') : t('placeOrder')}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

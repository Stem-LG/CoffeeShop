"use client";

import { useState } from "react";
import { Menu, X, Coffee, ShoppingBag, Globe } from "lucide-react";
import { Button } from "./ui/Button";
import { useCart } from "@/context/CartContext";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { totalItems } = useCart();
    const t = useTranslations('Navbar');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const navLinks = [
        { href: "/", label: t('home') },
        { href: "/menu", label: t('menu') },
        { href: "/reservations", label: t('reservations') },
        { href: "/track", label: t('trackOrder') },
        { href: "/contact", label: t('contact') },
    ];

    const toggleLanguage = () => {
        const nextLocale = locale === 'en' ? 'fr' : 'en';
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2 font-serif text-xl font-bold text-primary">
                    <Coffee className="h-6 w-6" />
                    <span>The Coffee House</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex md:items-center md:gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Button variant="ghost" size="icon" onClick={toggleLanguage} title="Switch Language">
                        <Globe className="h-4 w-4" />
                        <span className="sr-only">Switch Language</span>
                        <span className="ml-2 text-xs font-bold uppercase">{locale}</span>
                    </Button>
                    <Link href="/cart">
                        <Button size="sm" variant="default" className="relative">
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            {t('orderNow')}
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                                    {totalItems}
                                </span>
                            )}
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="flex items-center gap-4 md:hidden">
                    <Button variant="ghost" size="icon" onClick={toggleLanguage}>
                        <span className="text-xs font-bold uppercase">{locale}</span>
                    </Button>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? (
                            <X className="h-6 w-6 text-foreground" />
                        ) : (
                            <Menu className="h-6 w-6 text-foreground" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden border-t p-4 bg-background">
                    <div className="flex flex-col space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-foreground hover:text-primary"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Button className="w-full">{t('orderNow')}</Button>
                    </div>
                </div>
            )}
        </nav>
    );
}

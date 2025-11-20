import { Link } from "@/i18n/routing";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

export function Footer() {
    const t = useTranslations('Footer');
    const tNav = useTranslations('Navbar');

    return (
        <footer className="bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 py-12 md:px-6">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <h3 className="text-lg font-serif font-bold">The Coffee House</h3>
                        <p className="text-sm text-primary-foreground/80">
                            {t('description')}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-wider">{t('links')}</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/menu" className="hover:text-accent">{tNav('menu')}</Link></li>
                            <li><Link href="/reservations" className="hover:text-accent">{tNav('reservations')}</Link></li>
                            <li><Link href="/track" className="hover:text-accent">{tNav('trackOrder')}</Link></li>
                            <li><Link href="/contact" className="hover:text-accent">{tNav('contact')}</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-wider">{t('contact')}</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                123 Coffee Lane, Brew City
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                (555) 123-4567
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                hello@thecoffeehouse.com
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-wider">{t('followUs')}</h4>
                        <div className="flex gap-4">
                            <Link href="#" className="hover:text-accent"><Facebook className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-accent"><Instagram className="h-5 w-5" /></Link>
                            <Link href="#" className="hover:text-accent"><Twitter className="h-5 w-5" /></Link>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/60">
                    © {new Date().getFullYear()} The Coffee House. {t('rights')}
                </div>
            </div>
        </footer>
    );
}

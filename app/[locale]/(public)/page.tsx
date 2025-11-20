import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { ArrowRight, Clock, MapPin, Truck } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations('Home');

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-40" />
        <div className="container mx-auto relative flex h-full flex-col items-center justify-center text-center text-primary-foreground px-4">
          <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-7xl font-serif">
            {t('heroTitle')}
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-primary-foreground/90 sm:text-xl">
            {t('heroDescription')}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/menu">
              <Button size="lg" className="w-full sm:w-auto text-lg h-12 px-8 bg-accent hover:bg-accent/90 text-accent-foreground border-none">
                {t('orderDelivery')}
              </Button>
            </Link>
            <Link href="/reservations">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-12 px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                {t('bookTable')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="border-none shadow-none bg-transparent">
            <CardContent className="flex flex-col items-center text-center p-6">
              <div className="mb-4 rounded-full bg-secondary p-4 text-primary">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold font-serif">{t('openDaily')}</h3>
              <p className="text-muted-foreground whitespace-pre-line">
                {t('openHours')}
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-none bg-transparent">
            <CardContent className="flex flex-col items-center text-center p-6">
              <div className="mb-4 rounded-full bg-secondary p-4 text-primary">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold font-serif">{t('fastDelivery')}</h3>
              <p className="text-muted-foreground whitespace-pre-line">
                {t('deliveryDesc')}
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-none bg-transparent">
            <CardContent className="flex flex-col items-center text-center p-6">
              <div className="mb-4 rounded-full bg-secondary p-4 text-primary">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold font-serif">{t('primeLocation')}</h3>
              <p className="text-muted-foreground whitespace-pre-line">
                {t('locationDesc')}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Menu Preview */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-serif">
            {t('ourFavorites')}
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {t('favoritesDesc')}
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Placeholder items - in a real app these would come from DB */}
          {[
            { name: "Signature Latte", price: "$4.75", img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1937&auto=format&fit=crop" },
            { name: "Avocado Toast", price: "$8.50", img: "https://images.unsplash.com/photo-1588137372308-15f75323ca8d?q=80&w=1974&auto=format&fit=crop" },
            { name: "Berry Croissant", price: "$3.50", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1926&auto=format&fit=crop" },
          ].map((item, i) => (
            <Card key={i} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg font-serif">{item.name}</h3>
                  <span className="font-medium text-primary">{item.price}</span>
                </div>
                <Button className="w-full mt-4" variant="secondary">{t('addToOrder')}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/menu">
            <Button size="lg" variant="outline" className="gap-2">
              {t('viewFullMenu')} <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

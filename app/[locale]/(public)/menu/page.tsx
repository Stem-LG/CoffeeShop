import { getCategoriesWithItems } from "@/app/actions/menu";
import MenuGrid from "@/components/MenuGrid";
import { getTranslations } from "next-intl/server";

export default async function MenuPage() {
    const categories = await getCategoriesWithItems();
    const t = await getTranslations('Menu');

    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-serif">{t('title')}</h1>
                <p className="max-w-[700px] text-muted-foreground text-lg">
                    {t('description')}
                </p>
            </div>

            {categories.length > 0 ? (
                <MenuGrid
                    categories={categories}
                    addToCartLabel={t('addToCart')}
                    unavailableLabel={t('unavailable')}
                />
            ) : (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">{t('unavailable')}</p>
                </div>
            )}
        </div>
    );
}

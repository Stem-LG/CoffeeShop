"use client";

import { useState } from "react";
import { Category, MenuItem } from "@prisma/client";
import { Button } from "./ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/Card";
import { useCart } from "@/context/CartContext";
import { Plus } from "lucide-react";

type MenuGridProps = {
    categories: (Category & { items: MenuItem[] })[];
    addToCartLabel?: string;
    unavailableLabel?: string;
};

export default function MenuGrid({
    categories,
    addToCartLabel = "Add to Cart",
    unavailableLabel = "No items available in this category."
}: MenuGridProps) {
    const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || "");
    const { addToCart } = useCart();

    const handleAddToCart = (item: MenuItem) => {
        addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
        });
    };

    return (
        <div className="flex flex-col gap-8">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center sticky top-16 z-40 bg-background/95 backdrop-blur py-4 border-b">
                {categories.map((category) => (
                    <Button
                        key={category.id}
                        variant={activeCategory === category.id ? "default" : "outline"}
                        onClick={() => setActiveCategory(category.id)}
                        className="rounded-full"
                    >
                        {category.name}
                    </Button>
                ))}
            </div>

            {/* Menu Items */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categories
                    .find((c) => c.id === activeCategory)
                    ?.items.map((item) => (
                        <Card key={item.id} className="flex flex-col overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300">
                            <div className="aspect-video w-full overflow-hidden bg-secondary/20 relative">
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-full w-full object-cover transition-transform hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-muted-foreground">
                                        No Image
                                    </div>
                                )}
                            </div>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-xl font-serif">{item.name}</CardTitle>
                                    <span className="font-bold text-primary">${item.price.toFixed(2)}</span>
                                </div>
                                <CardDescription>{item.description}</CardDescription>
                            </CardHeader>
                            <CardFooter className="mt-auto pt-0">
                                <Button onClick={() => handleAddToCart(item)} className="w-full gap-2">
                                    <Plus className="h-4 w-4" /> {addToCartLabel}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                {categories.find((c) => c.id === activeCategory)?.items.length === 0 && (
                    <div className="col-span-full text-center text-muted-foreground py-12">
                        {unavailableLabel}
                    </div>
                )}
            </div>
        </div>
    );
}

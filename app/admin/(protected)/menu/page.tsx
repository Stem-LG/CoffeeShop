import { PrismaClient } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createMenuItem, deleteMenuItem } from "@/app/actions/admin-menu";
import { Trash2 } from "lucide-react";

const prisma = new PrismaClient();

export default async function AdminMenuPage() {
    const categories = await prisma.category.findMany();
    const items = await prisma.menuItem.findMany({
        include: { category: true },
        orderBy: { category: { name: "asc" } },
    });

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold font-serif">Menu Management</h1>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Add New Item Form */}
                <Card className="lg:col-span-1 h-fit">
                    <CardHeader>
                        <CardTitle>Add New Item</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form action={async (formData) => {
                            "use server";
                            await createMenuItem(formData);
                        }} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">Name</label>
                                <Input id="name" name="name" required placeholder="Item Name" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="description" className="text-sm font-medium">Description</label>
                                <Input id="description" name="description" required placeholder="Description" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="price" className="text-sm font-medium">Price</label>
                                <Input id="price" name="price" type="number" step="0.01" required placeholder="0.00" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="categoryId" className="text-sm font-medium">Category</label>
                                <select
                                    id="categoryId"
                                    name="categoryId"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    required
                                >
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="image" className="text-sm font-medium">Image URL</label>
                                <Input id="image" name="image" placeholder="https://..." />
                            </div>
                            <Button type="submit" className="w-full">Add Item</Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Menu Items List */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Current Menu Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                                    <div className="flex items-center gap-4">
                                        {item.image && (
                                            <img src={item.image} alt={item.name} className="h-12 w-12 rounded-md object-cover" />
                                        )}
                                        <div>
                                            <p className="font-bold">{item.name}</p>
                                            <p className="text-sm text-muted-foreground">{item.category.name} - ${item.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <form action={async () => {
                                        "use server";
                                        await deleteMenuItem(item.id);
                                    }}>
                                        <Button size="icon" variant="ghost" className="text-destructive hover:text-destructive">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </form>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

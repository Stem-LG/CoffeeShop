import { PrismaClient } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { updateOrderStatus } from "@/app/actions/admin-order";

const prisma = new PrismaClient();

export default async function AdminOrdersPage() {
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        include: { items: { include: { menuItem: true } } },
    });

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold font-serif">Orders</h1>

            <div className="grid gap-4">
                {orders.map((order) => (
                    <Card key={order.id}>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Order #{order.trackingNumber}</CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    {new Date(order.createdAt).toLocaleString()} - {order.customerName}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold">{order.status}</span>
                                <form action={async () => {
                                    "use server";
                                    await updateOrderStatus(order.id, "DELIVERED");
                                }}>
                                    <Button size="sm" variant="outline" disabled={order.status === "DELIVERED"}>
                                        Mark Delivered
                                    </Button>
                                </form>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm">
                                <p className="font-bold mb-2">Items:</p>
                                <ul className="list-disc pl-5 mb-4">
                                    {order.items.map((item) => (
                                        <li key={item.id}>
                                            {item.quantity}x {item.menuItem.name} - ${item.price.toFixed(2)}
                                        </li>
                                    ))}
                                </ul>
                                <p className="font-bold">Total: ${order.totalAmount.toFixed(2)}</p>
                                <p className="text-muted-foreground mt-2">Address: {order.address}</p>
                                <p className="text-muted-foreground">Phone: {order.customerPhone}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {orders.length === 0 && <p className="text-muted-foreground">No orders found.</p>}
            </div>
        </div>
    );
}

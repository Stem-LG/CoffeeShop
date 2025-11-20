import { PrismaClient } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ShoppingBag, Calendar, DollarSign, Users } from "lucide-react";

const prisma = new PrismaClient();

export default async function AdminDashboard() {
    // Fetch stats
    const totalOrders = await prisma.order.count();
    const totalReservations = await prisma.reservation.count();
    const totalRevenue = await prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: { status: { not: "CANCELLED" } },
    });

    const recentOrders = await prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { items: true },
    });

    const recentReservations = await prisma.reservation.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold font-serif">Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalRevenue._sum.totalAmount?.toFixed(2) || "0.00"}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalOrders}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Reservations</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalReservations}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {/* Recent Orders */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentOrders.map((order) => (
                                <div key={order.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                                    <div>
                                        <p className="font-medium">{order.customerName}</p>
                                        <p className="text-sm text-muted-foreground">{order.trackingNumber}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">${order.totalAmount.toFixed(2)}</p>
                                        <p className="text-xs text-muted-foreground">{order.status}</p>
                                    </div>
                                </div>
                            ))}
                            {recentOrders.length === 0 && <p className="text-muted-foreground">No recent orders.</p>}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Reservations */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Reservations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentReservations.map((res) => (
                                <div key={res.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                                    <div>
                                        <p className="font-medium">{res.customerName}</p>
                                        <p className="text-sm text-muted-foreground">{res.reservationNumber}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">{new Date(res.date).toLocaleDateString()}</p>
                                        <p className="text-xs text-muted-foreground">{res.guests} guests</p>
                                    </div>
                                </div>
                            ))}
                            {recentReservations.length === 0 && <p className="text-muted-foreground">No recent reservations.</p>}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

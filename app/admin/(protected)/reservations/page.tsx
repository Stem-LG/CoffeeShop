import { PrismaClient } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { updateReservationStatus } from "@/app/actions/admin-reservation";

const prisma = new PrismaClient();

export default async function AdminReservationsPage() {
    const reservations = await prisma.reservation.findMany({
        orderBy: { date: "asc" },
    });

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold font-serif">Reservations</h1>

            <div className="grid gap-4">
                {reservations.map((res) => (
                    <Card key={res.id}>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Reservation #{res.reservationNumber}</CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    {new Date(res.date).toLocaleDateString()} at {new Date(res.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold">{res.status}</span>
                                <form action={async () => {
                                    "use server";
                                    await updateReservationStatus(res.id, "CONFIRMED");
                                }}>
                                    <Button size="sm" variant="outline" disabled={res.status === "CONFIRMED"}>
                                        Confirm
                                    </Button>
                                </form>
                                <form action={async () => {
                                    "use server";
                                    await updateReservationStatus(res.id, "COMPLETED");
                                }}>
                                    <Button size="sm" variant="outline" disabled={res.status === "COMPLETED"}>
                                        Complete
                                    </Button>
                                </form>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm">
                                <p className="font-bold">Customer: {res.customerName}</p>
                                <p>Guests: {res.guests}</p>
                                <p className="text-muted-foreground">Phone: {res.customerPhone}</p>
                                {res.customerEmail && <p className="text-muted-foreground">Email: {res.customerEmail}</p>}
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {reservations.length === 0 && <p className="text-muted-foreground">No reservations found.</p>}
            </div>
        </div>
    );
}

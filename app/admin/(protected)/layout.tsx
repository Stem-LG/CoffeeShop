import { getAdminSession, logout } from "@/app/actions/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { LayoutDashboard, ShoppingBag, Calendar, Coffee, LogOut, Menu as MenuIcon } from "lucide-react";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getAdminSession();

    if (!session) {
        redirect("/admin/login");
    }

    return (
        <div className="flex min-h-screen bg-muted/40">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
                <div className="flex h-16 items-center gap-2 border-b px-6 font-serif text-lg font-bold text-primary">
                    <Coffee className="h-6 w-6" />
                    <span>Admin Panel</span>
                </div>
                <nav className="flex flex-1 flex-col gap-2 p-4">
                    <Link href="/admin/dashboard">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <LayoutDashboard className="h-4 w-4" /> Dashboard
                        </Button>
                    </Link>
                    <Link href="/admin/orders">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <ShoppingBag className="h-4 w-4" /> Orders
                        </Button>
                    </Link>
                    <Link href="/admin/reservations">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <Calendar className="h-4 w-4" /> Reservations
                        </Button>
                    </Link>
                    <Link href="/admin/menu">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <MenuIcon className="h-4 w-4" /> Menu Items
                        </Button>
                    </Link>
                </nav>
                <div className="border-t p-4">
                    <form action={logout}>
                        <Button variant="outline" className="w-full gap-2 text-destructive hover:text-destructive">
                            <LogOut className="h-4 w-4" /> Logout
                        </Button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 sm:ml-64">
                <div className="container p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}

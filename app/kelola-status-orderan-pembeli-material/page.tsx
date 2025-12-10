// @/app/kelola-status-orderan-pembeli-material/page.tsx
import Sidebar from "@/components/Sidebar";
import { getOrders } from "@/lib/actions/order";
import { redirect } from "next/navigation";
import { ShoppingCart, User, Package, CreditCard, Clock, CheckCircle, XCircle, Plus } from "lucide-react";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils/format";

export default async function KelolaStatusOrderanPembeliMaterialPage() {
    let orders;
    let pagination;

    try {
        const response = await getOrders();
        orders = response.data;
        pagination = response.pagination;
    } catch (error) {
        redirect("/");
    }

    // Calculate stats
    const totalOrders = pagination.total;
    const pendingPayment = orders.filter(o => o.paymentStatus === "pending").length;
    const settledPayment = orders.filter(o => o.paymentStatus === "settlement").length;
    const totalRevenue = orders
        .filter(o => o.paymentStatus === "settlement")
        .reduce((sum, o) => sum + o.grossAmount, 0);

    // Payment status badge
    const getPaymentStatusBadge = (status: string) => {
        const badges = {
            pending: "bg-yellow-100 text-yellow-800",
            settlement: "bg-green-100 text-green-800",
            expire: "bg-red-100 text-red-800",
            cancel: "bg-gray-100 text-gray-800",
        };
        return badges[status as keyof typeof badges] || "bg-gray-100 text-gray-800";
    };

    // Order status badge
    const getOrderStatusBadge = (status: string) => {
        const badges = {
            diproses: "bg-blue-100 text-blue-800",
            selesai: "bg-green-100 text-green-800",
            dibatalkan: "bg-red-100 text-red-800",
        };
        return badges[status as keyof typeof badges] || "bg-gray-100 text-gray-800";
    };

    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 lg:ml-64 p-4 lg:p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            Kelola Status Orderan
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Manajemen orderan pembeli material
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-5 rounded-3xl">
                        <p className="text-gray-600 text-sm">Total Orderan</p>
                        <p className="text-2xl font-bold text-foreground">
                            {totalOrders}
                        </p>
                    </div>
                    <div className="bg-white p-5 rounded-3xl">
                        <p className="text-gray-600 text-sm">Pending Payment</p>
                        <p className="text-2xl font-bold text-yellow-600">
                            {pendingPayment}
                        </p>
                    </div>
                    <div className="bg-white p-5 rounded-3xl">
                        <p className="text-gray-600 text-sm">Paid</p>
                        <p className="text-2xl font-bold text-green-600">
                            {settledPayment}
                        </p>
                    </div>
                    <div className="bg-white p-5 rounded-3xl">
                        <p className="text-gray-600 text-sm">Total Revenue</p>
                        <p className="text-2xl font-bold text-blue-600">
                            {formatCurrency(totalRevenue)}
                        </p>
                    </div>
                </div>

                {/* Orders Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-background border border-black/10 rounded-4xl p-6 transition"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <ShoppingCart className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm text-foreground">
                                            {order.orderId}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {formatDate(order.createdAt)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Status Badges */}
                            <div className="flex gap-2 mb-4">
                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusBadge(order.paymentStatus)}`}>
                                    {order.paymentStatus}
                                </span>
                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusBadge(order.orderStatus)}`}>
                                    {order.orderStatus}
                                </span>
                            </div>

                            {/* Customer Info */}
                            <div className="bg-gray-50 p-3 rounded-2xl mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <User className="w-4 h-4 text-gray-600" />
                                    <span className="text-sm font-medium text-gray-700">
                                        Pelanggan
                                    </span>
                                </div>
                                <p className="text-sm font-semibold text-foreground">
                                    {order.customerId.nama}
                                </p>
                                <p className="text-xs text-gray-600 mt-1">
                                    {order.customerId.email}
                                </p>
                            </div>

                            {/* Product Info */}
                            <div className="mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Package className="w-4 h-4 text-gray-600" />
                                    <span className="text-sm font-medium text-gray-700">
                                        Produk
                                    </span>
                                </div>
                                <p className="text-sm font-semibold text-foreground">
                                    {order.productId.nama}
                                </p>
                                <p className="text-xs text-gray-600">
                                    {order.productId.kodeSku} • {order.quantity} {order.productId.satuan}
                                </p>
                            </div>

                            {/* Price Details */}
                            <div className="space-y-2 mb-4 pt-3 border-t border-gray-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Harga Satuan</span>
                                    <span className="text-sm font-semibold text-foreground">
                                        {formatCurrency(order.productId.hargaJual)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">Total</span>
                                    <span className="text-lg font-bold text-primary">
                                        {formatCurrency(order.grossAmount)}
                                    </span>
                                </div>
                            </div>

                            {/* Payment URL */}
                            {order.paymentUrl && order.paymentStatus === "pending" && (
                                <div className="mb-4">
                                    <a
                                        href={order.paymentUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-blue-600 hover:text-blue-800 underline"
                                    >
                                        Link Pembayaran →
                                    </a>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="pt-4 border-t border-gray-200 flex gap-2">
                                <Link
                                    href={`/kelola-status-orderan-pembeli-material/${order._id}`}
                                    className="flex-1 text-center px-4 py-2 bg-gray-100 text-foreground rounded-full hover:bg-gray-200 transition text-sm font-medium"
                                >
                                    Detail
                                </Link>
                                <button
                                    type="button"
                                    className="flex-1 px-4 py-2 bg-primary text-white rounded-full hover:bg-yellow-600 transition text-sm font-medium"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {orders.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl shadow-md">
                        <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Belum ada orderan
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Orderan pelanggan akan muncul di sini
                        </p>
                    </div>
                )}

                {/* Pagination Info */}
                {pagination.totalPages > 1 && (
                    <div className="mt-6 text-center text-sm text-gray-600">
                        Halaman {pagination.page} dari {pagination.totalPages} • Total {pagination.total} orderan
                    </div>
                )}
            </main>
        </div>
    );
}
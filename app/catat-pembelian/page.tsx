// @/app/catat-pembelian/page.tsx
import Sidebar from "@/components/Sidebar";
import { getPurchases } from "@/lib/actions/purchase";
import { redirect } from "next/navigation";
import { ShoppingCart, Building2, Package, DollarSign, Calendar, Plus } from "lucide-react";
import Link from "next/link";

export default async function CatatPembelianPage() {
    let purchases;

    try {
        const response = await getPurchases();
        purchases = response.data;
    } catch (error) {
        redirect("/");
    }

    // Calculate stats
    const totalPurchases = purchases.length;
    const totalValue = purchases.reduce((sum, purchase) => sum + purchase.totalHarga, 0);
    const uniqueMaterials = new Set(purchases.map(p => p.namaMaterial)).size;

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 lg:ml-64 p-4 lg:p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            Catat Pembelian
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Manajemen data pembelian material dari supplier
                        </p>
                    </div>
                    <Link
                        href="/catat-pembelian/create"
                        className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition"
                    >
                        <Plus className="w-5 h-5" />
                        Tambah Pembelian
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-5 rounded-3xl">
                        <p className="text-gray-600 text-sm">Total Pembelian</p>
                        <p className="text-2xl font-bold text-foreground">
                            {totalPurchases}
                        </p>
                    </div>
                    <div className="bg-white p-5 rounded-3xl">
                        <p className="text-gray-600 text-sm">Total Nilai Pembelian</p>
                        <p className="text-2xl font-bold text-green-600">
                            {formatCurrency(totalValue)}
                        </p>
                    </div>
                    <div className="bg-white p-5 rounded-3xl">
                        <p className="text-gray-600 text-sm">Total Material</p>
                        <p className="text-2xl font-bold text-blue-600">
                            {uniqueMaterials}
                        </p>
                    </div>
                </div>

                {/* Purchases Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {purchases.map((purchase) => (
                        <div
                            key={purchase._id}
                            className="bg-background border border-black/10 rounded-4xl p-6 transition"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Package className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-foreground">
                                            {purchase.namaMaterial}
                                        </h3>
                                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium mt-1">
                                            {purchase.unit}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Supplier Info */}
                            <div className="bg-gray-50 p-3 rounded-2xl mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Building2 className="w-4 h-4 text-gray-600" />
                                    <span className="text-sm font-medium text-gray-700">
                                        Supplier
                                    </span>
                                </div>
                                <p className="text-sm font-semibold text-foreground">
                                    {purchase.supplierId.namaPerusahaan}
                                </p>
                                <p className="text-xs text-gray-600 mt-1">
                                    {purchase.supplierId.kontak}
                                </p>
                            </div>

                            {/* Purchase Details */}
                            <div className="space-y-3 mb-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Jumlah</span>
                                    <span className="text-sm font-semibold text-foreground">
                                        {purchase.jumlah} {purchase.unit}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Harga per Unit</span>
                                    <span className="text-sm font-semibold text-foreground">
                                        {formatCurrency(purchase.hargaPerUnit)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                                    <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                        <DollarSign className="w-4 h-4" />
                                        Total Harga
                                    </span>
                                    <span className="text-lg font-bold text-primary">
                                        {formatCurrency(purchase.totalHarga)}
                                    </span>
                                </div>
                            </div>

                            {/* Date */}
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                                <Calendar className="w-3 h-3" />
                                <span>{formatDate(purchase.createdAt)}</span>
                            </div>

                            {/* Actions */}
                            <div className="pt-4 border-t border-gray-200 flex gap-2">
                                <Link
                                    href={`/catat-pembelian/${purchase._id}/detail`}
                                    className="flex-1 text-center px-4 py-2 bg-gray-100 text-foreground rounded-full hover:bg-gray-200 transition text-sm font-medium"
                                >
                                    Detail
                                </Link>
                                <button
                                    type="button"
                                    className="flex-1 px-4 py-2 bg-primary text-white rounded-full hover:bg-yellow-600 transition text-sm font-medium"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {purchases.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl shadow-md">
                        <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Belum ada pembelian
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Tambahkan pembelian material pertama Anda
                        </p>
                        <Link
                            href="/catat-pembelian/create"
                            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
                        >
                            <Plus className="w-5 h-5" />
                            Tambah Pembelian
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
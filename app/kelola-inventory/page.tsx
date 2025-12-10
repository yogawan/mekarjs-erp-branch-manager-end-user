// @/app/kelola-inventory/page.tsx
import Sidebar from "@/components/Sidebar";
import { getInventories } from "@/lib/actions/inventory";
import { redirect } from "next/navigation";
import { Package, Warehouse, AlertTriangle, Plus, TrendingDown } from "lucide-react";
import Link from "next/link";

export default async function KelolaInventoryPage() {
    let inventories;

    try {
        const response = await getInventories();
        inventories = response.data;
    } catch (error) {
        redirect("/");
    }

    // Calculate stats
    const totalItems = inventories.reduce((sum, inv) => sum + inv.jumlah, 0);
    const lowStockItems = inventories.filter(inv => inv.jumlah <= inv.stokMinimum).length;
    const uniqueWarehouses = new Set(inventories.map(inv => inv.gudangId._id)).size;

    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 lg:ml-64 p-4 lg:p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            Kelola Inventory
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Manajemen stok barang di gudang
                        </p>
                    </div>
                    <Link
                        href="/kelola-inventory/create"
                        className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition"
                    >
                        <Plus className="w-5 h-5" />
                        Tambah Inventory
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-5 rounded-3xl">
                        <p className="text-gray-600 text-sm">Total Item</p>
                        <p className="text-2xl font-bold text-foreground">
                            {inventories.length}
                        </p>
                    </div>
                    <div className="bg-white p-5 rounded-3xl">
                        <p className="text-gray-600 text-sm">Total Stok</p>
                        <p className="text-2xl font-bold text-blue-600">
                            {totalItems}
                        </p>
                    </div>
                    <div className="bg-white p-5 rounded-3xl">
                        <p className="text-gray-600 text-sm">Stok Rendah</p>
                        <p className="text-2xl font-bold text-red-600">
                            {lowStockItems}
                        </p>
                    </div>
                </div>

                {/* Inventories Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {inventories.map((inventory) => (
                        <div
                            key={inventory._id}
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
                                            {inventory.produkId ? `Produk ${inventory.produkId}` : "Produk Tidak Tersedia"}
                                        </h3>
                                        {inventory.jumlah <= inventory.stokMinimum && (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium mt-1">
                                                <AlertTriangle className="w-3 h-3" />
                                                Stok Rendah
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Warehouse Info */}
                            <div className="bg-gray-50 p-3 rounded-2xl mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Warehouse className="w-4 h-4 text-gray-600" />
                                    <span className="text-sm font-medium text-gray-700">
                                        Gudang
                                    </span>
                                </div>
                                <p className="text-sm font-semibold text-foreground">
                                    {inventory.gudangId.nama}
                                </p>
                                <p className="text-xs text-gray-600 mt-1">
                                    {inventory.gudangId.kode}
                                </p>
                            </div>

                            {/* Stock Details */}
                            <div className="space-y-3 mb-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">Jumlah Stok</span>
                                    <span className="text-lg font-bold text-foreground">
                                        {inventory.jumlah}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                                    <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                        <TrendingDown className="w-4 h-4" />
                                        Stok Minimum
                                    </span>
                                    <span className="text-sm font-semibold text-orange-600">
                                        {inventory.stokMinimum}
                                    </span>
                                </div>
                            </div>

                            {/* Stock Status Bar */}
                            <div className="mb-4">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full ${inventory.jumlah <= inventory.stokMinimum
                                                ? "bg-red-500"
                                                : inventory.jumlah <= inventory.stokMinimum * 2
                                                    ? "bg-orange-500"
                                                    : "bg-green-500"
                                            }`}
                                        style={{
                                            width: `${Math.min((inventory.jumlah / (inventory.stokMinimum * 3)) * 100, 100)}%`,
                                        }}
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    {inventory.jumlah <= inventory.stokMinimum
                                        ? "Perlu restock segera"
                                        : inventory.jumlah <= inventory.stokMinimum * 2
                                            ? "Stok menipis"
                                            : "Stok aman"}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="pt-4 border-t border-gray-200 flex gap-2">
                                <Link
                                    href={`/kelola-inventory/${inventory._id}`}
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
                {inventories.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl shadow-md">
                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Belum ada inventory
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Tambahkan inventory pertama Anda
                        </p>
                        <Link
                            href="/kelola-inventory/create"
                            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
                        >
                            <Plus className="w-5 h-5" />
                            Tambah Inventory
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
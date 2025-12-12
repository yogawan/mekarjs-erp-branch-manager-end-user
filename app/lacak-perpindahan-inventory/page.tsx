// @/app/lacak-perpindahan-inventory/page.tsx
import Sidebar from "@/components/Sidebar";
import { getInventoryMovements } from "@/lib/actions/inventoryMovement";
import { redirect } from "next/navigation";
import { ArrowRight, Package, Warehouse, Calendar, FileText } from "lucide-react";

export default async function LacakPerpindahanInventoryPage() {
    let movements;

    try {
        const response = await getInventoryMovements();
        movements = response.data;
    } catch (error) {
        redirect("/");
    }

    // Calculate stats
    const totalMovements = movements.length;
    const totalQuantity = movements.reduce((sum, m) => sum + m.jumlah, 0);
    const uniqueProducts = new Set(movements.map(m => m.produkId._id)).size;
    const uniqueWarehouses = new Set([
        ...movements.map(m => m.gudangAsalId._id),
        ...movements.map(m => m.gudangTujuanId._id),
    ]).size;

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 lg:ml-64 p-4 lg:p-8">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-foreground">
                        Lacak Perpindahan Inventory
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Monitor perpindahan barang antar gudang
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-5 rounded-3xl border border-black/10">
                        <p className="text-gray-600 text-sm mb-1">Total Perpindahan</p>
                        <p className="text-2xl font-bold text-foreground">
                            {totalMovements}
                        </p>
                    </div>
                    <div className="bg-white p-5 rounded-3xl border border-black/10">
                        <p className="text-gray-600 text-sm mb-1">Total Kuantitas</p>
                        <p className="text-2xl font-bold text-blue-600">
                            {totalQuantity}
                        </p>
                    </div>
                    <div className="bg-white p-5 rounded-3xl border border-black/10">
                        <p className="text-gray-600 text-sm mb-1">Produk Berbeda</p>
                        <p className="text-2xl font-bold text-green-600">
                            {uniqueProducts}
                        </p>
                    </div>
                    <div className="bg-white p-5 rounded-3xl border border-black/10">
                        <p className="text-gray-600 text-sm mb-1">Gudang Terlibat</p>
                        <p className="text-2xl font-bold text-purple-600">
                            {uniqueWarehouses}
                        </p>
                    </div>
                </div>

                {/* Movements Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {movements.map((movement) => (
                        <div
                            key={movement._id}
                            className="bg-white border border-black/10 rounded-3xl p-6"
                        >
                            {/* Product Info */}
                            <div className="flex items-start gap-3 mb-4">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Package className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-foreground">
                                        {movement.produkId.nama}
                                    </h3>
                                    <p className="text-xs text-gray-600">
                                        SKU: {movement.produkId.kodeSku}
                                    </p>
                                    <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                        {movement.tipe}
                                    </span>
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="bg-gray-50 p-3 rounded-2xl mb-4">
                                <p className="text-xs text-gray-600 mb-1">Jumlah</p>
                                <p className="text-lg font-bold text-foreground">
                                    {movement.jumlah} {movement.produkId.satuan}
                                </p>
                            </div>

                            {/* Warehouse Transfer */}
                            <div className="space-y-3 mb-4">
                                {/* Source Warehouse */}
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-red-50 p-3 rounded-2xl">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Warehouse className="w-4 h-4 text-red-600" />
                                            <p className="text-xs text-red-600 font-medium">
                                                Dari
                                            </p>
                                        </div>
                                        <p className="font-semibold text-sm text-foreground">
                                            {movement.gudangAsalId.nama}
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            {movement.gudangAsalId.kode}
                                        </p>
                                    </div>
                                </div>

                                {/* Arrow */}
                                <div className="flex justify-center">
                                    <ArrowRight className="w-5 h-5 text-gray-400" />
                                </div>

                                {/* Destination Warehouse */}
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-green-50 p-3 rounded-2xl">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Warehouse className="w-4 h-4 text-green-600" />
                                            <p className="text-xs text-green-600 font-medium">
                                                Ke
                                            </p>
                                        </div>
                                        <p className="font-semibold text-sm text-foreground">
                                            {movement.gudangTujuanId.nama}
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            {movement.gudangTujuanId.kode}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Notes */}
                            {movement.catatan && (
                                <div className="bg-gray-50 p-3 rounded-2xl mb-4">
                                    <div className="flex items-center gap-2 mb-1">
                                        <FileText className="w-4 h-4 text-gray-600" />
                                        <p className="text-xs text-gray-600 font-medium">
                                            Catatan
                                        </p>
                                    </div>
                                    <p className="text-sm text-gray-700">
                                        {movement.catatan}
                                    </p>
                                </div>
                            )}

                            {/* Date */}
                            <div className="pt-3 border-t border-gray-200">
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <Calendar className="w-3 h-3" />
                                    <span>{formatDate(movement.createdAt)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {movements.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-3xl border border-black/10">
                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Belum ada perpindahan inventory
                        </h3>
                        <p className="text-gray-500">
                            Data perpindahan barang akan muncul di sini
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}
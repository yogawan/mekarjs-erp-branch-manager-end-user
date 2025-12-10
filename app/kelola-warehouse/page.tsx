// @/app/kelola-warehouse/page.tsx
import Sidebar from "@/components/Sidebar";
import { getWarehouses } from "@/lib/actions/warehouse";
import { redirect } from "next/navigation";
import { Warehouse, MapPin, FileText, Plus } from "lucide-react";
import Link from "next/link";

export default async function KelolaWarehousePage() {
    let warehouses;

    try {
        const response = await getWarehouses();
        warehouses = response.data;
    } catch (error) {
        redirect("/");
    }

    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 lg:ml-64 p-4 lg:p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            Kelola Warehouse
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Manajemen data gudang penyimpanan
                        </p>
                    </div>
                    <Link
                        href="/kelola-warehouse/create"
                        className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition"
                    >
                        <Plus className="w-5 h-5" />
                        Tambah Warehouse
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-5 rounded-3xl">
                        <p className="text-gray-600 text-sm">Total Warehouse</p>
                        <p className="text-2xl font-bold text-foreground">
                            {warehouses.length}
                        </p>
                    </div>
                    <div className="bg-white p-5 rounded-3xl">
                        <p className="text-gray-600 text-sm">Lokasi Berbeda</p>
                        <p className="text-2xl font-bold text-blue-600">
                            {new Set(warehouses.map(w => w.alamat)).size}
                        </p>
                    </div>
                </div>

                {/* Warehouses Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {warehouses.map((warehouse) => (
                        <div
                            key={warehouse._id}
                            className="bg-background border border-black/10 rounded-4xl p-6 transition"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Warehouse className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-foreground">
                                            {warehouse.nama}
                                        </h3>
                                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium mt-1">
                                            {warehouse.kode}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex items-start gap-2 mb-4">
                                <MapPin className="w-4 h-4 text-gray-600 mt-0.5 shrink-0" />
                                <span className="text-sm text-gray-600 line-clamp-2">
                                    {warehouse.alamat}
                                </span>
                            </div>

                            {/* Description */}
                            <div className="bg-gray-50 p-3 rounded-2xl mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <FileText className="w-4 h-4 text-gray-600" />
                                    <span className="text-sm font-medium text-gray-700">
                                        Deskripsi
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-2">
                                    {warehouse.deskripsi}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="pt-4 border-t border-gray-200 flex gap-2">
                                <Link
                                    href={`/kelola-warehouse/${warehouse._id}`}
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
                {warehouses.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl shadow-md">
                        <Warehouse className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Belum ada warehouse
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Tambahkan warehouse pertama Anda
                        </p>
                        <Link
                            href="/kelola-warehouse/create"
                            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
                        >
                            <Plus className="w-5 h-5" />
                            Tambah Warehouse
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
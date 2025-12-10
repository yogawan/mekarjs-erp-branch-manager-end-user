"use client";

import { useState, useMemo } from "react";
import { Package, Tag, Building2, DollarSign } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/lib/utils/format";

interface ProductListProps {
    products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
    const [selectedBranch, setSelectedBranch] = useState<string>("all");

    // Get unique branches
    const branches = useMemo(() => {
        const uniqueBranches = new Map<string, { id: string; name: string; code: string }>();
        products.forEach((product) => {
            if (!uniqueBranches.has(product.cabangId._id)) {
                uniqueBranches.set(product.cabangId._id, {
                    id: product.cabangId._id,
                    name: product.cabangId.namaCabang,
                    code: product.cabangId.kodeCabang,
                });
            }
        });
        return Array.from(uniqueBranches.values());
    }, [products]);

    // Filter products by selected branch
    const filteredProducts = useMemo(() => {
        if (selectedBranch === "all") {
            return products;
        }
        return products.filter((product) => product.cabangId._id === selectedBranch);
    }, [products, selectedBranch]);

    return (
        <>
            {/* Filter Section */}
            {branches.length > 1 && (
                <div className="mb-6">
                    <label htmlFor="branch-filter" className="block text-sm font-medium text-gray-700 mb-2">
                        Filter Cabang
                    </label>
                    <select
                        id="branch-filter"
                        value={selectedBranch}
                        onChange={(e) => setSelectedBranch(e.target.value)}
                        className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                        <option value="all">Semua Cabang ({products.length})</option>
                        {branches.map((branch) => (
                            <option key={branch.id} value={branch.id}>
                                {branch.name} ({products.filter(p => p.cabangId._id === branch.id).length})
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <div
                        key={product._id}
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
                                        {product.nama}
                                    </h3>
                                    <span
                                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${product.aktif
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {product.aktif ? "Aktif" : "Nonaktif"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* SKU */}
                        <div className="flex items-center gap-2 mb-4">
                            <Tag className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">
                                SKU: {product.kodeSku}
                            </span>
                        </div>

                        {/* Branch Info */}
                        <div className="bg-gray-50 p-3 rounded-2xl mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Building2 className="w-4 h-4 text-gray-600" />
                                <span className="text-sm font-medium text-gray-700">
                                    Cabang
                                </span>
                            </div>
                            <p className="text-sm font-semibold text-foreground">
                                {product.cabangId.namaCabang}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                                {product.cabangId.kodeCabang}
                            </p>
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                            <p className="text-sm text-gray-600 line-clamp-2">
                                {product.deskripsi}
                            </p>
                        </div>

                        {/* Price & Unit */}
                        <div className="space-y-3 mb-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Satuan</span>
                                <span className="text-sm font-semibold text-foreground">
                                    {product.satuan}
                                </span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                                <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                    <DollarSign className="w-4 h-4" />
                                    Harga Jual
                                </span>
                                <span className="text-lg font-bold text-primary">
                                    {formatCurrency(product.hargaJual)}
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-4 border-t border-gray-200 flex gap-2">
                            <Link
                                href={`/kelola-produk/${product._id}`}
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

            {/* Empty State for Filtered Results */}
            {filteredProducts.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl shadow-md">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        Tidak ada produk
                    </h3>
                    <p className="text-gray-500 mb-6">
                        {selectedBranch === "all"
                            ? "Belum ada produk yang tersedia"
                            : "Tidak ada produk untuk cabang yang dipilih"}
                    </p>
                </div>
            )}
        </>
    );
}

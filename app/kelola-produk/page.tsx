// @/app/kelola-produk/page.tsx
import Sidebar from "@/components/Sidebar";
import { getProducts } from "@/lib/actions/product";
import { redirect } from "next/navigation";
import { Package, Plus } from "lucide-react";
import Link from "next/link";
import ProductList from "@/components/ProductList";

export default async function KelolaProdukPage() {
    let products;

    try {
        const response = await getProducts();
        products = response.data;
    } catch (error) {
        redirect("/");
    }

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 lg:ml-64 p-4 lg:p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            Kelola Produk
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Manajemen data produk stone crusher
                        </p>
                    </div>
                    <Link
                        href="/kelola-produk/create"
                        className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition"
                    >
                        <Plus className="w-5 h-5" />
                        Tambah Produk
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-5 rounded-3xl">
                        <p className="text-gray-600 text-sm">Total Produk</p>
                        <p className="text-2xl font-bold text-foreground">
                            {products.length}
                        </p>
                    </div>
                    <div className="bg-white p-5 rounded-3xl">
                        <p className="text-gray-600 text-sm">Produk Aktif</p>
                        <p className="text-2xl font-bold text-green-600">
                            {products.filter((p) => p.aktif).length}
                        </p>
                    </div>
                    <div className="bg-white p-5 rounded-3xl">
                        <p className="text-gray-600 text-sm">Produk Nonaktif</p>
                        <p className="text-2xl font-bold text-red-600">
                            {products.filter((p) => !p.aktif).length}
                        </p>
                    </div>
                </div>

                {/* Product List with Branch Filtering */}
                <ProductList products={products} />

                {/* Empty State */}
                {products.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl shadow-md">
                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Belum ada produk
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Tambahkan produk pertama Anda
                        </p>
                        <Link
                            href="/kelola-produk/create"
                            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
                        >
                            <Plus className="w-5 h-5" />
                            Tambah Produk
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
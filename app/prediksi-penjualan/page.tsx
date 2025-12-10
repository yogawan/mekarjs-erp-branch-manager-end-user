// @/app/prediksi-penjualan/page.tsx
import Sidebar from "@/components/Sidebar";
import { getInventoryForecasts } from "@/lib/actions/forecast";
import { redirect } from "next/navigation";
import { TrendingUp, Package, Warehouse, Calendar, BarChart3, AlertCircle } from "lucide-react";
import { formatDate } from "@/lib/utils/format";

export default async function PrediksiPenjualanPage() {
    let forecasts;

    try {
        const response = await getInventoryForecasts();
        forecasts = response.data;
    } catch (error) {
        redirect("/");
    }

    // Calculate stats
    const totalForecasts = forecasts.length;
    const totalCurrentStock = forecasts.reduce((sum, f) => sum + f.stokSaatIni, 0);
    const totalPredictedDemand = forecasts.reduce((sum, f) => sum + f.permintaanDiprediksi, 0);
    const avgDemand = totalForecasts > 0 ? Math.round(totalPredictedDemand / totalForecasts) : 0;

    // Get period badge
    const getPeriodBadge = (periode: string) => {
        const badges = {
            harian: "bg-blue-100 text-blue-800",
            mingguan: "bg-green-100 text-green-800",
            bulanan: "bg-purple-100 text-purple-800",
        };
        return badges[periode as keyof typeof badges] || "bg-gray-100 text-gray-800";
    };

    // Check if stock is sufficient
    const isStockSufficient = (current: number, predicted: number) => {
        return current >= predicted;
    };

    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 lg:ml-64 p-4 lg:p-8">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-foreground">
                        Prediksi Penjualan
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Forecasting permintaan inventory berdasarkan data historis
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-5 rounded-3xl">
                        <p className="text-gray-600 text-sm">Total Prediksi</p>
                        <p className="text-2xl font-bold text-foreground">
                            {totalForecasts}
                        </p>
                    </div>
                    <div className="bg-white p-5 rounded-3xl">
                        <p className="text-gray-600 text-sm">Total Stok Saat Ini</p>
                        <p className="text-2xl font-bold text-blue-600">
                            {totalCurrentStock}
                        </p>
                    </div>
                    <div className="bg-white p-5 rounded-3xl">
                        <p className="text-gray-600 text-sm">Total Permintaan Diprediksi</p>
                        <p className="text-2xl font-bold text-orange-600">
                            {totalPredictedDemand}
                        </p>
                    </div>
                    <div className="bg-white p-5 rounded-3xl">
                        <p className="text-gray-600 text-sm">Rata-rata Permintaan</p>
                        <p className="text-2xl font-bold text-green-600">
                            {avgDemand}
                        </p>
                    </div>
                </div>

                {/* Forecasts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {forecasts.map((forecast) => (
                        <div
                            key={forecast._id}
                            className="bg-background border border-black/10 rounded-4xl p-6 transition"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <TrendingUp className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-foreground">
                                            {forecast.produkId ? `Produk ${forecast.produkId}` : "Produk Umum"}
                                        </h3>
                                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getPeriodBadge(forecast.periode)}`}>
                                            {forecast.periode.charAt(0).toUpperCase() + forecast.periode.slice(1)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Warehouse Info */}
                            {forecast.gudangId && (
                                <div className="bg-gray-50 p-3 rounded-2xl mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Warehouse className="w-4 h-4 text-gray-600" />
                                        <span className="text-sm font-medium text-gray-700">
                                            Gudang
                                        </span>
                                    </div>
                                    <p className="text-sm font-semibold text-foreground">
                                        {forecast.gudangId.nama}
                                    </p>
                                    <p className="text-xs text-gray-600 mt-1">
                                        {forecast.gudangId.kode}
                                    </p>
                                </div>
                            )}

                            {/* Stock & Demand Info */}
                            <div className="space-y-3 mb-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600 flex items-center gap-1">
                                        <Package className="w-4 h-4" />
                                        Stok Saat Ini
                                    </span>
                                    <span className="text-lg font-bold text-foreground">
                                        {forecast.stokSaatIni}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                                    <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                                        <BarChart3 className="w-4 h-4" />
                                        Permintaan Diprediksi
                                    </span>
                                    <span className="text-lg font-bold text-orange-600">
                                        {forecast.permintaanDiprediksi}
                                    </span>
                                </div>
                            </div>

                            {/* Stock Status */}
                            <div className="mb-4">
                                {isStockSufficient(forecast.stokSaatIni, forecast.permintaanDiprediksi) ? (
                                    <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                                        <Package className="w-4 h-4 text-green-600" />
                                        <span className="text-sm text-green-800 font-medium">
                                            Stok mencukupi
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 p-2 bg-red-50 rounded-lg">
                                        <AlertCircle className="w-4 h-4 text-red-600" />
                                        <span className="text-sm text-red-800 font-medium">
                                            Perlu restock ({forecast.permintaanDiprediksi - forecast.stokSaatIni} unit)
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Prediction Date */}
                            <div className="pt-3 border-t border-gray-200">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar className="w-4 h-4" />
                                    <span>Prediksi untuk: {formatDate(forecast.tanggalPrediksi)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {forecasts.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl shadow-md">
                        <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Belum ada prediksi
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Data prediksi penjualan akan muncul di sini
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}
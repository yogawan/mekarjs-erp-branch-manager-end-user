// @/app/dashboard-keuangan/page.tsx
import Sidebar from "@/components/Sidebar";
import {
    getFinanceOverview,
    getFinanceCashflow,
    getFinancePayments,
    getFinanceIncome,
    getFinanceExpenses,
} from "@/lib/actions/finance";
import { redirect } from "next/navigation";
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    Percent,
    ArrowUpCircle,
    ArrowDownCircle,
    CreditCard,
    ShoppingBag,
    Package,
    Clock,
    CheckCircle,
    XCircle,
    Calendar,
} from "lucide-react";

export default async function DashboardKeuanganPage() {
    let overview, cashflow, payments, income, expenses;

    try {
        const [overviewRes, cashflowRes, paymentsRes, incomeRes, expensesRes] =
            await Promise.all([
                getFinanceOverview(),
                getFinanceCashflow(),
                getFinancePayments(),
                getFinanceIncome(),
                getFinanceExpenses(),
            ]);

        overview = overviewRes.data;
        cashflow = cashflowRes.data;
        payments = paymentsRes.data;
        income = incomeRes.data;
        expenses = expensesRes.data;
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

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    // Format datetime
    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // Get payment status badge color
    const getPaymentStatusColor = (status: string) => {
        switch (status) {
            case "settlement":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-red-100 text-red-800";
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 lg:ml-64 p-4 lg:p-8">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-foreground">
                        Dashboard Keuangan
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Ringkasan lengkap keuangan cabang Anda
                    </p>
                </div>

                {/* Overview Section */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                        Ringkasan Keuangan
                    </h2>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white p-5 rounded-3xl border border-black/10">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <ArrowUpCircle className="w-6 h-6 text-green-600" />
                                </div>
                                <p className="text-gray-600 text-sm">Total Pemasukan</p>
                            </div>
                            <p className="text-2xl font-bold text-green-600">
                                {formatCurrency(overview.totalIncome)}
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-3xl border border-black/10">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-red-100 rounded-lg">
                                    <ArrowDownCircle className="w-6 h-6 text-red-600" />
                                </div>
                                <p className="text-gray-600 text-sm">Total Pengeluaran</p>
                            </div>
                            <p className="text-2xl font-bold text-red-600">
                                {formatCurrency(overview.totalExpenses)}
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-3xl border border-black/10">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <DollarSign className="w-6 h-6 text-blue-600" />
                                </div>
                                <p className="text-gray-600 text-sm">Laba Bersih</p>
                            </div>
                            <p className="text-2xl font-bold text-blue-600">
                                {formatCurrency(overview.netProfit)}
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-3xl border border-black/10">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <Percent className="w-6 h-6 text-purple-600" />
                                </div>
                                <p className="text-gray-600 text-sm">Margin Keuntungan</p>
                            </div>
                            <p className="text-2xl font-bold text-purple-600">
                                {overview.profitMargin}%
                            </p>
                        </div>
                    </div>

                    {/* Income & Expense Sources */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {/* Income Sources */}
                        <div className="bg-white p-6 rounded-3xl border border-black/10">
                            <h3 className="text-lg font-bold text-foreground mb-4">
                                Sumber Pemasukan
                            </h3>
                            <div className="space-y-3">
                                {overview.incomeSources.map((source, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-700">
                                                {source.source}
                                            </span>
                                            <span className="text-sm font-semibold text-foreground">
                                                {source.percentage}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-green-500 h-2 rounded-full"
                                                style={{ width: `${source.percentage}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between items-center text-xs text-gray-600">
                                            <span>{source.count} transaksi</span>
                                            <span>{formatCurrency(source.amount)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Expense Sources */}
                        <div className="bg-white p-6 rounded-3xl border border-black/10">
                            <h3 className="text-lg font-bold text-foreground mb-4">
                                Sumber Pengeluaran
                            </h3>
                            <div className="space-y-3">
                                {overview.expenseSources.map((source, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-700">
                                                {source.source}
                                            </span>
                                            <span className="text-sm font-semibold text-foreground">
                                                {source.percentage}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-red-500 h-2 rounded-full"
                                                style={{ width: `${source.percentage}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between items-center text-xs text-gray-600">
                                            <span>{source.count} transaksi</span>
                                            <span>{formatCurrency(source.amount)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Payment Analysis */}
                    <div className="bg-white p-6 rounded-3xl border border-black/10">
                        <h3 className="text-lg font-bold text-foreground mb-4">
                            Analisis Status Pembayaran
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            <div className="text-center">
                                <p className="text-xs text-gray-600 mb-1">Pending</p>
                                <p className="text-lg font-bold text-yellow-600">
                                    {overview.paymentAnalysis.pending.count}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {formatCurrency(overview.paymentAnalysis.pending.amount)}
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-xs text-gray-600 mb-1">Settlement</p>
                                <p className="text-lg font-bold text-green-600">
                                    {overview.paymentAnalysis.settlement.count}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {formatCurrency(overview.paymentAnalysis.settlement.amount)}
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-xs text-gray-600 mb-1">Cancel</p>
                                <p className="text-lg font-bold text-gray-600">
                                    {overview.paymentAnalysis.cancel.count}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {formatCurrency(overview.paymentAnalysis.cancel.amount)}
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-xs text-gray-600 mb-1">Deny</p>
                                <p className="text-lg font-bold text-gray-600">
                                    {overview.paymentAnalysis.deny.count}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {formatCurrency(overview.paymentAnalysis.deny.amount)}
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-xs text-gray-600 mb-1">Expire</p>
                                <p className="text-lg font-bold text-gray-600">
                                    {overview.paymentAnalysis.expire.count}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {formatCurrency(overview.paymentAnalysis.expire.amount)}
                                </p>
                            </div>
                            <div className="text-center">
                                <p className="text-xs text-gray-600 mb-1">Failure</p>
                                <p className="text-lg font-bold text-red-600">
                                    {overview.paymentAnalysis.failure.count}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {formatCurrency(overview.paymentAnalysis.failure.amount)}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Cashflow Section */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                        Arus Kas (Cashflow)
                    </h2>
                    <div className="bg-white rounded-3xl border border-black/10 overflow-hidden">
                        <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-black/10">
                            <p className="text-sm text-gray-600">Saldo Akhir</p>
                            <p className="text-3xl font-bold text-foreground">
                                {formatCurrency(cashflow.finalBalance)}
                            </p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tanggal
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tipe Transaksi
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Jumlah
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Saldo
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {cashflow.cashflow.map((transaction, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {formatDateTime(transaction.date)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${transaction.type.startsWith("PEMASUKAN")
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-red-100 text-red-800"
                                                        }`}
                                                >
                                                    {transaction.type.startsWith("PEMASUKAN") ? (
                                                        <ArrowUpCircle className="w-3 h-3" />
                                                    ) : (
                                                        <ArrowDownCircle className="w-3 h-3" />
                                                    )}
                                                    {transaction.type}
                                                </span>
                                            </td>
                                            <td
                                                className={`px-6 py-4 whitespace-nowrap text-sm text-right font-semibold ${transaction.type.startsWith("PEMASUKAN")
                                                        ? "text-green-600"
                                                        : "text-red-600"
                                                    }`}
                                            >
                                                {transaction.type.startsWith("PEMASUKAN") ? "+" : "-"}
                                                {formatCurrency(transaction.amount)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-foreground">
                                                {formatCurrency(transaction.balance)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Payments Section */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                        Transaksi Pembayaran
                    </h2>

                    {/* Payment Summary */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-3xl border border-black/10">
                            <p className="text-xs text-gray-600 mb-1">Total</p>
                            <p className="text-xl font-bold text-foreground">
                                {payments.summary.total}
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-3xl border border-black/10">
                            <p className="text-xs text-gray-600 mb-1">Pending</p>
                            <p className="text-xl font-bold text-yellow-600">
                                {payments.summary.pending}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                {formatCurrency(payments.summary.totalPendingAmount)}
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-3xl border border-black/10">
                            <p className="text-xs text-gray-600 mb-1">Settlement</p>
                            <p className="text-xl font-bold text-green-600">
                                {payments.summary.settlement}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                {formatCurrency(payments.summary.totalSettledAmount)}
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-3xl border border-black/10">
                            <p className="text-xs text-gray-600 mb-1">Failed</p>
                            <p className="text-xl font-bold text-red-600">
                                {payments.summary.failed}
                            </p>
                        </div>
                    </div>

                    {/* Payment Transactions */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {payments.transactions.map((transaction) => (
                            <div
                                key={transaction._id}
                                className="bg-white border border-black/10 rounded-3xl p-6"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            <CreditCard className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground text-sm">
                                                {transaction.orderId}
                                            </p>
                                            <p className="text-xs text-gray-600">
                                                {transaction.customer}
                                            </p>
                                        </div>
                                    </div>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(
                                            transaction.paymentStatus
                                        )}`}
                                    >
                                        {transaction.paymentStatus}
                                    </span>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Jumlah</span>
                                        <span className="text-lg font-bold text-primary">
                                            {formatCurrency(transaction.amount)}
                                        </span>
                                    </div>
                                    {transaction.paymentType && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">
                                                Metode Pembayaran
                                            </span>
                                            <span className="text-sm font-medium text-foreground">
                                                {transaction.paymentType}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">
                                            Status Order
                                        </span>
                                        <span className="text-sm font-medium text-foreground">
                                            {transaction.orderStatus}
                                        </span>
                                    </div>
                                </div>

                                <div className="pt-3 border-t border-gray-200 space-y-1">
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <Calendar className="w-3 h-3" />
                                        <span>Order: {formatDateTime(transaction.date)}</span>
                                    </div>
                                    {transaction.settlementTime && (
                                        <div className="flex items-center gap-2 text-xs text-green-600">
                                            <CheckCircle className="w-3 h-3" />
                                            <span>
                                                Settled: {formatDateTime(transaction.settlementTime)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Income Section */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                        Detail Pemasukan
                    </h2>

                    {/* Income Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white p-5 rounded-3xl border border-black/10">
                            <p className="text-gray-600 text-sm mb-1">Total Pemasukan</p>
                            <p className="text-2xl font-bold text-green-600">
                                {formatCurrency(income.summary.totalIncome)}
                            </p>
                        </div>
                        <div className="bg-white p-5 rounded-3xl border border-black/10">
                            <p className="text-gray-600 text-sm mb-1">Dari Penjualan</p>
                            <p className="text-2xl font-bold text-foreground">
                                {formatCurrency(income.summary.totalFromSales)}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                {income.summary.salesCount} transaksi
                            </p>
                        </div>
                        <div className="bg-white p-5 rounded-3xl border border-black/10">
                            <p className="text-gray-600 text-sm mb-1">Dari Order</p>
                            <p className="text-2xl font-bold text-foreground">
                                {formatCurrency(income.summary.totalFromOrders)}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                {income.summary.ordersCount} transaksi
                            </p>
                        </div>
                    </div>

                    {/* Sales */}
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-foreground mb-3">
                            Penjualan Langsung
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {income.sales.map((sale) => (
                                <div
                                    key={sale._id}
                                    className="bg-white border border-black/10 rounded-3xl p-6"
                                >
                                    <div className="flex items-start gap-3 mb-4">
                                        <div className="p-2 bg-green-100 rounded-lg">
                                            <ShoppingBag className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-foreground">
                                                {sale.customer}
                                            </p>
                                            <p className="text-xs text-gray-600">
                                                {formatDateTime(sale.date)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Jumlah</span>
                                            <span className="text-sm font-semibold text-foreground">
                                                {sale.quantity} unit
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">
                                                Harga per Unit
                                            </span>
                                            <span className="text-sm font-semibold text-foreground">
                                                {formatCurrency(sale.unitPrice)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                                            <span className="text-sm font-medium text-gray-700">
                                                Total
                                            </span>
                                            <span className="text-lg font-bold text-green-600">
                                                {formatCurrency(sale.totalAmount)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Orders */}
                    <div>
                        <h3 className="text-lg font-bold text-foreground mb-3">
                            Order yang Sudah Dibayar
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {income.orders.map((order) => (
                                <div
                                    key={order._id}
                                    className="bg-white border border-black/10 rounded-3xl p-6"
                                >
                                    <div className="flex items-start gap-3 mb-4">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            <Package className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-foreground text-sm">
                                                {order.orderId}
                                            </p>
                                            <p className="text-xs text-gray-600">{order.customer}</p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {formatDateTime(order.date)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Jumlah</span>
                                            <span className="text-sm font-semibold text-foreground">
                                                {order.quantity} unit
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">
                                                Metode Pembayaran
                                            </span>
                                            <span className="text-sm font-semibold text-foreground">
                                                {order.paymentType}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                                            <span className="text-sm font-medium text-gray-700">
                                                Total
                                            </span>
                                            <span className="text-lg font-bold text-green-600">
                                                {formatCurrency(order.totalAmount)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Expenses Section */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                        Detail Pengeluaran
                    </h2>

                    {/* Expense Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white p-5 rounded-3xl border border-black/10">
                            <p className="text-gray-600 text-sm mb-1">Total Pengeluaran</p>
                            <p className="text-2xl font-bold text-red-600">
                                {formatCurrency(expenses.summary.totalExpenses)}
                            </p>
                        </div>
                        <div className="bg-white p-5 rounded-3xl border border-black/10">
                            <p className="text-gray-600 text-sm mb-1">Dari Pembelian</p>
                            <p className="text-2xl font-bold text-foreground">
                                {formatCurrency(expenses.summary.totalFromPurchases)}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                {expenses.summary.purchasesCount} transaksi
                            </p>
                        </div>
                    </div>

                    {/* Purchases */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {expenses.purchases.map((purchase) => (
                            <div
                                key={purchase._id}
                                className="bg-white border border-black/10 rounded-3xl p-6"
                            >
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="p-2 bg-red-100 rounded-lg">
                                        <Package className="w-6 h-6 text-red-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-foreground">
                                            {purchase.material}
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            Supplier: {purchase.supplier}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {formatDateTime(purchase.date)}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Jumlah</span>
                                        <span className="text-sm font-semibold text-foreground">
                                            {purchase.quantity} {purchase.unit}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">
                                            Harga per {purchase.unit}
                                        </span>
                                        <span className="text-sm font-semibold text-foreground">
                                            {formatCurrency(purchase.unitPrice)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                                        <span className="text-sm font-medium text-gray-700">
                                            Total
                                        </span>
                                        <span className="text-lg font-bold text-red-600">
                                            {formatCurrency(purchase.totalAmount)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
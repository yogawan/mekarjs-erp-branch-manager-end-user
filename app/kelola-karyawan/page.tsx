// @/app/kelola-karyawan/page.tsx
import Sidebar from "@/components/Sidebar";
import { getEmployees } from "@/lib/actions/employee";
import { redirect } from "next/navigation";
import { Users, Building2, Mail, Phone, MapPin, Calendar, DollarSign, CheckCircle, XCircle, Plus } from "lucide-react";
import Link from "next/link";
import { formatCurrency, formatDate } from "@/lib/utils/format";

export default async function KelolaKaryawanPage() {
    let employees;

    try {
        const response = await getEmployees();
        employees = response.data;
    } catch (error) {
        redirect("/");
    }

    // Calculate stats
    const totalEmployees = employees.length;
    const activeEmployees = employees.filter(e => e.status === "aktif").length;
    const inactiveEmployees = employees.filter(e => e.status === "nonaktif").length;
    const totalSalary = employees
        .filter(e => e.status === "aktif")
        .reduce((sum, e) => sum + e.gaji, 0);

    // Get status badge
    const getStatusBadge = (status: string) => {
        return status === "aktif"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800";
    };

    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 lg:ml-64 p-4 lg:p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            Kelola Karyawan
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Manajemen data karyawan perusahaan
                        </p>
                    </div>
                    <Link
                        href="/kelola-karyawan/create"
                        className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition"
                    >
                        <Plus className="w-5 h-5" />
                        Tambah Karyawan
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-5 rounded-3xl">
                        <p className="text-gray-600 text-sm">Total Karyawan</p>
                        <p className="text-2xl font-bold text-foreground">
                            {totalEmployees}
                        </p>
                    </div>
                    <div className="bg-white p-5 rounded-3xl">
                        <p className="text-gray-600 text-sm">Karyawan Aktif</p>
                        <p className="text-2xl font-bold text-green-600">
                            {activeEmployees}
                        </p>
                    </div>
                    <div className="bg-white p-5 rounded-3xl">
                        <p className="text-gray-600 text-sm">Karyawan Nonaktif</p>
                        <p className="text-2xl font-bold text-red-600">
                            {inactiveEmployees}
                        </p>
                    </div>
                    <div className="bg-white p-5 rounded-3xl">
                        <p className="text-gray-600 text-sm">Total Gaji Aktif</p>
                        <p className="text-2xl font-bold text-blue-600">
                            {formatCurrency(totalSalary)}
                        </p>
                    </div>
                </div>

                {/* Employees Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {employees.map((employee) => (
                        <div
                            key={employee._id}
                            className="bg-background border border-black/10 rounded-4xl p-6 transition"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Users className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-foreground">
                                            {employee.nama}
                                        </h3>
                                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusBadge(employee.status)}`}>
                                            {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                                        </span>
                                    </div>
                                </div>
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
                                    {employee.cabangId.namaCabang}
                                </p>
                                <p className="text-xs text-gray-600 mt-1">
                                    {employee.cabangId.kodeCabang}
                                </p>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-gray-600" />
                                    <span className="text-sm text-gray-700 truncate">
                                        {employee.email}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-gray-600" />
                                    <span className="text-sm text-gray-700">
                                        {employee.telepon}
                                    </span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <MapPin className="w-4 h-4 text-gray-600 mt-0.5 shrink-0" />
                                    <span className="text-sm text-gray-700 line-clamp-2">
                                        {employee.alamat}
                                    </span>
                                </div>
                            </div>

                            {/* Salary & Join Date */}
                            <div className="space-y-3 mb-4 pt-3 border-t border-gray-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600 flex items-center gap-1">
                                        <DollarSign className="w-4 h-4" />
                                        Gaji
                                    </span>
                                    <span className="text-base font-bold text-primary">
                                        {formatCurrency(employee.gaji)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600 flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        Tanggal Masuk
                                    </span>
                                    <span className="text-sm font-semibold text-foreground">
                                        {formatDate(employee.tanggalMasuk)}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-4 border-t border-gray-200 flex gap-2">
                                <Link
                                    href={`/kelola-karyawan/${employee._id}`}
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
                {employees.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl shadow-md">
                        <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Belum ada karyawan
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Tambahkan karyawan pertama Anda
                        </p>
                        <Link
                            href="/kelola-karyawan/create"
                            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
                        >
                            <Plus className="w-5 h-5" />
                            Tambah Karyawan
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
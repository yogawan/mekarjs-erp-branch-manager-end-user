// @/app/kelola-pembeli-material/page.tsx
import Sidebar from "@/components/Sidebar";
import { getCustomers } from "@/lib/actions/customer";
import { redirect } from "next/navigation";
import { Users, Mail, MapPin, Plus, UserCircle } from "lucide-react";
import Link from "next/link";

export default async function KelolaPembeliMaterialPage() {
	let customers;

	try {
		const response = await getCustomers();
		customers = response.data;
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
							Kelola Pembeli Material
						</h1>
						<p className="text-gray-600 mt-1">
							Manajemen data pelanggan dan pembeli material
						</p>
					</div>
					<Link
						href="/kelola-pembeli-material/create"
						className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition"
					>
						<Plus className="w-5 h-5" />
						Tambah Pembeli
					</Link>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
					<div className="bg-white p-5 rounded-3xl">
						<p className="text-gray-600 text-sm">Total Pembeli</p>
						<p className="text-2xl font-bold text-foreground">
							{customers.length}
						</p>
					</div>
					<div className="bg-white p-5 rounded-3xl">
						<p className="text-gray-600 text-sm">Pembeli Aktif</p>
						<p className="text-2xl font-bold text-green-600">
							{customers.filter((c) => c.isActive).length}
						</p>
					</div>
					<div className="bg-white p-5 rounded-3xl">
						<p className="text-gray-600 text-sm">Pembeli Nonaktif</p>
						<p className="text-2xl font-bold text-red-600">
							{customers.filter((c) => !c.isActive).length}
						</p>
					</div>
				</div>

				{/* Customers Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
					{customers.map((customer) => (
						<div
							key={customer._id}
							className="border border-black/10 rounded-4xl p-6 transition"
						>
							{/* Header */}
							<div className="flex justify-between items-start mb-4">
								<div className="flex items-start gap-3">
									<div className="p-2 bg-primary/10 rounded-lg">
										<UserCircle className="w-6 h-6 text-primary" />
									</div>
									<div>
										<h3 className="font-semibold text-lg text-foreground">
											{customer.nama}
										</h3>
										<span
											className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
												customer.isActive
													? "bg-green-100 text-green-800"
													: "bg-red-100 text-red-800"
											}`}
										>
											{customer.isActive ? "Aktif" : "Nonaktif"}
										</span>
									</div>
								</div>
							</div>

							{/* Contact Info */}
							<div className="space-y-3 mb-4">
								<div className="flex items-center gap-2 text-sm text-gray-600">
									<Mail className="w-4 h-4 shrink-0" />
									<span className="truncate">{customer.email}</span>
								</div>
								<div className="flex items-start gap-2 text-sm text-gray-600">
									<MapPin className="w-4 h-4 shrink-0 mt-0.5" />
									<span className="line-clamp-2">{customer.alamat}</span>
								</div>
							</div>

							{/* Metadata */}
							<div className="pt-4 border-t border-gray-200">
								<div className="text-xs text-gray-500">
									<p>
										Bergabung:{" "}
										{new Date(customer.createdAt).toLocaleDateString("id-ID", {
											day: "numeric",
											month: "short",
											year: "numeric",
										})}
									</p>
								</div>
							</div>

							{/* Actions */}
							<div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
								<Link
									href={`/kelola-pembeli-material/${customer._id}`}
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
				{customers.length === 0 && (
					<div className="text-center py-12 bg-white rounded-xl shadow-md">
						<Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
						<h3 className="text-xl font-semibold text-gray-700 mb-2">
							Belum ada pembeli
						</h3>
						<p className="text-gray-500 mb-6">
							Tambahkan pembeli material pertama Anda
						</p>
						<Link
							href="/kelola-pembeli-material/create"
							className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition"
						>
							<Plus className="w-5 h-5" />
							Tambah Pembeli
						</Link>
					</div>
				)}
			</main>
		</div>
	);
}
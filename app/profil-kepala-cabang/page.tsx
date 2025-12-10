// @/app/profil-kepala-cabang/page.tsx
import Sidebar from "@/components/Sidebar";
import { getProfile } from "@/lib/actions/profile";
import { redirect } from "next/navigation";
import { User, Building2, Mail, Phone, MapPin, Calendar, CheckCircle, XCircle, ExternalLink } from "lucide-react";
import { formatDate } from "@/lib/utils/format";

export default async function ProfilKepalaCabangPage() {
	let profile;

	try {
		const response = await getProfile();
		profile = response.branchManager;
	} catch (error) {
		redirect("/");
	}

	return (
		<div className="flex">
			<Sidebar />
			<main className="flex-1 lg:ml-64 p-4 lg:p-8">
				{/* Header */}
				<div className="mb-6">
					<h1 className="text-3xl font-bold text-foreground">
						Profil Kepala Cabang
					</h1>
					<p className="text-gray-600 mt-1">
						Informasi akun dan cabang yang Anda kelola
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* Personal Information Card */}
					<div className="bg-white rounded-4xl p-6 border border-black/10">
						<div className="flex items-center gap-3 mb-6">
							<div className="p-3 bg-primary/10 rounded-xl">
								<User className="w-6 h-6 text-primary" />
							</div>
							<div>
								<h2 className="text-xl font-bold text-foreground">
									Informasi Pribadi
								</h2>
								<p className="text-sm text-gray-600">
									Data kepala cabang
								</p>
							</div>
						</div>

						<div className="space-y-4">
							{/* Name */}
							<div>
								<label className="text-sm font-medium text-gray-600 block mb-1">
									Nama Lengkap
								</label>
								<p className="text-base font-semibold text-foreground">
									{profile.nama}
								</p>
							</div>

							{/* Email */}
							<div>
								<label className="text-sm font-medium text-gray-600 block mb-1">
									Email
								</label>
								<div className="flex items-center gap-2">
									<Mail className="w-4 h-4 text-gray-500" />
									<p className="text-base text-foreground">
										{profile.email}
									</p>
								</div>
							</div>

							{/* Status */}
							<div>
								<label className="text-sm font-medium text-gray-600 block mb-1">
									Status Akun
								</label>
								<div className="flex items-center gap-2">
									{profile.isActive ? (
										<>
											<CheckCircle className="w-4 h-4 text-green-600" />
											<span className="text-base font-semibold text-green-600">
												Aktif
											</span>
										</>
									) : (
										<>
											<XCircle className="w-4 h-4 text-red-600" />
											<span className="text-base font-semibold text-red-600">
												Nonaktif
											</span>
										</>
									)}
								</div>
							</div>

							{/* Created Date */}
							<div>
								<label className="text-sm font-medium text-gray-600 block mb-1">
									Tanggal Bergabung
								</label>
								<div className="flex items-center gap-2">
									<Calendar className="w-4 h-4 text-gray-500" />
									<p className="text-base text-foreground">
										{formatDate(profile.createdAt)}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Branch Information Card */}
					<div className="bg-white rounded-4xl p-6 border border-black/10">
						<div className="flex items-center gap-3 mb-6">
							<div className="p-3 bg-blue-100 rounded-xl">
								<Building2 className="w-6 h-6 text-blue-600" />
							</div>
							<div>
								<h2 className="text-xl font-bold text-foreground">
									Informasi Cabang
								</h2>
								<p className="text-sm text-gray-600">
									Cabang yang Anda kelola
								</p>
							</div>
						</div>

						<div className="space-y-4">
							{/* Branch Name */}
							<div>
								<label className="text-sm font-medium text-gray-600 block mb-1">
									Nama Cabang
								</label>
								<p className="text-base font-semibold text-foreground">
									{profile.cabangId.namaCabang}
								</p>
							</div>

							{/* Branch Code */}
							<div>
								<label className="text-sm font-medium text-gray-600 block mb-1">
									Kode Cabang
								</label>
								<span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
									{profile.cabangId.kodeCabang}
								</span>
							</div>

							{/* Address */}
							<div>
								<label className="text-sm font-medium text-gray-600 block mb-1">
									Alamat
								</label>
								<div className="flex items-start gap-2">
									<MapPin className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
									<p className="text-base text-foreground">
										{profile.cabangId.alamat}
									</p>
								</div>
							</div>

							{/* Contact */}
							<div>
								<label className="text-sm font-medium text-gray-600 block mb-1">
									Kontak
								</label>
								<div className="flex items-center gap-2">
									<Phone className="w-4 h-4 text-gray-500" />
									<p className="text-base text-foreground">
										{profile.cabangId.kontak}
									</p>
								</div>
							</div>

							{/* Google Maps Link */}
							<div>
								<label className="text-sm font-medium text-gray-600 block mb-1">
									Lokasi Maps
								</label>
								<a
									href={profile.cabangId.googleMapsLink}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
								>
									<ExternalLink className="w-4 h-4" />
									Buka di Google Maps
								</a>
							</div>

							{/* Branch Status */}
							<div>
								<label className="text-sm font-medium text-gray-600 block mb-1">
									Status Cabang
								</label>
								<div className="flex items-center gap-2">
									{profile.cabangId.isActive ? (
										<>
											<CheckCircle className="w-4 h-4 text-green-600" />
											<span className="text-base font-semibold text-green-600">
												Aktif
											</span>
										</>
									) : (
										<>
											<XCircle className="w-4 h-4 text-red-600" />
											<span className="text-base font-semibold text-red-600">
												Nonaktif
											</span>
										</>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Additional Info */}
				<div className="mt-6 bg-blue-50 border border-blue-200 rounded-3xl p-4">
					<p className="text-sm text-blue-800">
						<strong>Catatan:</strong> Jika ada perubahan data yang diperlukan, silakan hubungi administrator sistem.
					</p>
				</div>
			</main>
		</div>
	);
}
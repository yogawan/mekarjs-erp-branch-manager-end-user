export interface Supplier {
	_id: string;
	namaPerusahaan: string;
	email: string;
	kontak: string;
	alamatPerusahaan: string;
	materialYangDiSupply: string[];
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export interface SuppliersResponse {
	success: boolean;
	data: Supplier[];
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface Cabang {
	_id: string;
	namaCabang: string;
	kodeCabang: string;
	alamat: string;
	kontak: string;
	googleMapsLink: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export interface BranchManager {
	_id: string;
	nama: string;
	email: string;
	password: string;
	cabangId: Cabang;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export interface LoginResponse {
	message: string;
	token: string;
	branchManager: BranchManager;
}

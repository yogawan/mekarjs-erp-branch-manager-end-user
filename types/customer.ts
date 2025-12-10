export interface Customer {
	_id: string;
	nama: string;
	email: string;
	alamat: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export interface CustomersResponse {
	success: boolean;
	data: Customer[];
}

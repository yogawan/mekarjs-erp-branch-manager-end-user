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

export interface Purchase {
    _id: string;
    supplierId: Supplier;
    namaMaterial: string;
    unit: string;
    hargaPerUnit: number;
    jumlah: number;
    totalHarga: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
}

export interface PurchasesResponse {
    success: boolean;
    data: Purchase[];
}

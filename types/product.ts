export interface Branch {
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

export interface Product {
    _id: string;
    cabangId: Branch;
    nama: string;
    kodeSku: string;
    deskripsi: string;
    satuan: string;
    hargaJual: number;
    aktif: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface ProductsResponse {
    success: boolean;
    data: Product[];
}

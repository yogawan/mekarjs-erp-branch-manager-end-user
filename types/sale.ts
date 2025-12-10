export interface Customer {
    _id: string;
    nama: string;
    email: string;
}

export interface Product {
    _id: string;
    nama: string;
    kodeSku: string;
}

export interface Sale {
    _id: string;
    customerId: Customer;
    productId: Product;
    jumlah: number;
    hargaSatuan: number;
    totalHarga: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface SalesResponse {
    success: boolean;
    data: Sale[];
}

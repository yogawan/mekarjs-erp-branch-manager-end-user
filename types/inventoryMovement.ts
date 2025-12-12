export interface Warehouse {
    _id: string;
    nama: string;
    kode: string;
    alamat: string;
    deskripsi: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface Product {
    _id: string;
    cabangId: string;
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

export interface InventoryMovement {
    _id: string;
    produkId: Product;
    tipe: string;
    jumlah: number;
    gudangAsalId: Warehouse;
    gudangTujuanId: Warehouse;
    catatan: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface InventoryMovementResponse {
    success: boolean;
    data: InventoryMovement[];
}

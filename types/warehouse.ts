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

export interface WarehousesResponse {
    success: boolean;
    data: Warehouse[];
}

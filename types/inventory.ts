import type { Warehouse } from "./warehouse";

export interface Inventory {
    _id: string;
    produkId: string | null;
    gudangId: Warehouse;
    jumlah: number;
    stokMinimum: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface InventoriesResponse {
    success: boolean;
    data: Inventory[];
}

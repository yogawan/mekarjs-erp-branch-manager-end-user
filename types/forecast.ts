import type { Warehouse } from "./warehouse";

export interface InventoryForecast {
    _id: string;
    produkId: string | null;
    gudangId: Warehouse | null;
    stokSaatIni: number;
    permintaanDiprediksi: number;
    tanggalPrediksi: string;
    periode: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface InventoryForecastsResponse {
    success: boolean;
    data: InventoryForecast[];
}

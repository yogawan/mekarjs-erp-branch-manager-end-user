"use server";

import { getAuthToken } from "./auth";
import type { WarehousesResponse } from "@/types/warehouse";

export async function getWarehouses(): Promise<WarehousesResponse> {
    const token = await getAuthToken();

    if (!token) {
        throw new Error("Unauthorized");
    }

    const response = await fetch(
        "https://mekarjs-erp-core-service.yogawanadityapratama.com/api/branch-manager/warehouse",
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            cache: "no-store",
        },
    );

    if (!response.ok) {
        throw new Error("Failed to fetch warehouses");
    }

    return response.json();
}

"use server";

import { getAuthToken } from "./auth";
import type { InventoryMovementResponse } from "@/types/inventoryMovement";

export async function getInventoryMovements(): Promise<InventoryMovementResponse> {
    const token = await getAuthToken();

    if (!token) {
        throw new Error("Unauthorized");
    }

    const response = await fetch(
        "https://mekarjs-erp-core-service.yogawanadityapratama.com/api/branch-manager/inventory-movement",
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
        throw new Error("Failed to fetch inventory movements");
    }

    return response.json();
}

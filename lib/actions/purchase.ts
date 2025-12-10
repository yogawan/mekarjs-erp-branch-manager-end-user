"use server";

import { getAuthToken } from "./auth";
import type { PurchasesResponse } from "@/types/purchase";

export async function getPurchases(): Promise<PurchasesResponse> {
    const token = await getAuthToken();

    if (!token) {
        throw new Error("Unauthorized");
    }

    const response = await fetch(
        "https://mekarjs-erp-core-service.yogawanadityapratama.com/api/branch-manager/purchase",
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
        throw new Error("Failed to fetch purchases");
    }

    return response.json();
}

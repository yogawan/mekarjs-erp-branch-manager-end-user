"use server";

import { getAuthToken } from "./auth";
import type { ProductsResponse } from "@/types/product";

export async function getProducts(): Promise<ProductsResponse> {
    const token = await getAuthToken();

    if (!token) {
        throw new Error("Unauthorized");
    }

    const response = await fetch(
        "https://mekarjs-erp-core-service.yogawanadityapratama.com/api/branch-manager/product",
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
        throw new Error("Failed to fetch products");
    }

    return response.json();
}

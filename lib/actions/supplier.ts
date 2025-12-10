"use server";

import { getAuthToken } from "./auth";
import type { SuppliersResponse } from "@/types/supplier";

export async function getSuppliers(): Promise<SuppliersResponse> {
	const token = await getAuthToken();

	if (!token) {
		throw new Error("Unauthorized");
	}

	const response = await fetch(
		"https://mekarjs-erp-core-service.yogawanadityapratama.com/api/branch-manager/supplier",
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
		throw new Error("Failed to fetch suppliers");
	}

	return response.json();
}

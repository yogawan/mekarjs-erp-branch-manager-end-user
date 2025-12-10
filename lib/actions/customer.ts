"use server";

import { getAuthToken } from "./auth";
import type { CustomersResponse } from "@/types/customer";

export async function getCustomers(): Promise<CustomersResponse> {
	const token = await getAuthToken();

	if (!token) {
		throw new Error("Unauthorized");
	}

	const response = await fetch(
		"https://mekarjs-erp-core-service.yogawanadityapratama.com/api/branch-manager/customers",
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
		throw new Error("Failed to fetch customers");
	}

	return response.json();
}

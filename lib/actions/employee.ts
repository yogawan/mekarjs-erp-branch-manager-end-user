"use server";

import { getAuthToken } from "./auth";
import type { EmployeesResponse } from "@/types/employee";

export async function getEmployees(): Promise<EmployeesResponse> {
    const token = await getAuthToken();

    if (!token) {
        throw new Error("Unauthorized");
    }

    const response = await fetch(
        "https://mekarjs-erp-core-service.yogawanadityapratama.com/api/branch-manager/employee",
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
        throw new Error("Failed to fetch employees");
    }

    return response.json();
}

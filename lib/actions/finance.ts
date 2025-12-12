"use server";

import { getAuthToken } from "./auth";
import type {
    FinanceOverviewResponse,
    FinanceCashflowResponse,
    FinancePaymentsResponse,
    FinanceIncomeResponse,
    FinanceExpensesResponse,
} from "@/types/finance";

const BASE_URL = "https://mekarjs-erp-core-service.yogawanadityapratama.com/api/branch-manager/finance";

export async function getFinanceOverview(): Promise<FinanceOverviewResponse> {
    const token = await getAuthToken();

    if (!token) {
        throw new Error("Unauthorized");
    }

    const response = await fetch(`${BASE_URL}?type=overview`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch finance overview");
    }

    return response.json();
}

export async function getFinanceCashflow(): Promise<FinanceCashflowResponse> {
    const token = await getAuthToken();

    if (!token) {
        throw new Error("Unauthorized");
    }

    const response = await fetch(`${BASE_URL}?type=cashflow`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch finance cashflow");
    }

    return response.json();
}

export async function getFinancePayments(): Promise<FinancePaymentsResponse> {
    const token = await getAuthToken();

    if (!token) {
        throw new Error("Unauthorized");
    }

    const response = await fetch(`${BASE_URL}?type=payments`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch finance payments");
    }

    return response.json();
}

export async function getFinanceIncome(): Promise<FinanceIncomeResponse> {
    const token = await getAuthToken();

    if (!token) {
        throw new Error("Unauthorized");
    }

    const response = await fetch(`${BASE_URL}?type=income`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch finance income");
    }

    return response.json();
}

export async function getFinanceExpenses(): Promise<FinanceExpensesResponse> {
    const token = await getAuthToken();

    if (!token) {
        throw new Error("Unauthorized");
    }

    const response = await fetch(`${BASE_URL}?type=expenses`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch finance expenses");
    }

    return response.json();
}

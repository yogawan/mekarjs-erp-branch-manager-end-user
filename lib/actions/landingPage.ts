"use server";

import { getAuthToken } from "./auth";
import type { LandingPageResponse, UpdateLandingPageData } from "@/types/landingPage";

const BASE_URL = "https://mekarjs-erp-core-service.yogawanadityapratama.com/api/branch-manager/landing-page";

export async function getLandingPage(): Promise<LandingPageResponse> {
    const token = await getAuthToken();

    if (!token) {
        throw new Error("Unauthorized");
    }

    const response = await fetch(BASE_URL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch landing page");
    }

    return response.json();
}

export async function updateLandingPage(
    id: string,
    data: UpdateLandingPageData
): Promise<LandingPageResponse> {
    const token = await getAuthToken();

    if (!token) {
        throw new Error("Unauthorized");
    }

    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to update landing page");
    }

    return response.json();
}

import { getAuthToken } from "./auth";

export interface ProfileResponse {
	message: string;
	branchManager: {
		_id: string;
		nama: string;
		email: string;
		cabangId: {
			_id: string;
			namaCabang: string;
			kodeCabang: string;
			alamat: string;
			kontak: string;
			googleMapsLink: string;
			isActive: boolean;
			createdAt: string;
			updatedAt: string;
			__v: number;
		};
		isActive: boolean;
		createdAt: string;
		updatedAt: string;
		__v: number;
	};
}

export async function getProfile(): Promise<ProfileResponse> {
	const token = await getAuthToken();

	if (!token) {
		throw new Error("Unauthorized");
	}

	const response = await fetch(
		"https://mekarjs-erp-core-service.yogawanadityapratama.com/api/branch-manager/account/profile",
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			cache: "no-store", // Always get fresh data
		},
	);

	if (!response.ok) {
		throw new Error("Failed to fetch profile");
	}

	return response.json();
}

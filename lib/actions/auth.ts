"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { LoginRequest } from "@/types/auth";

export async function loginAction(_prevState: unknown, formData: FormData) {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	if (!email || !password) {
		return { error: "Email dan password harus diisi" };
	}

	try {
		const response = await fetch(
			"https://mekarjs-erp-core-service.yogawanadityapratama.com/api/branch-manager/account/login",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password } as LoginRequest),
			},
		);

		const data = await response.json();

		if (!response.ok) {
			return { error: data.message || "Login gagal" };
		}

		// Set httpOnly cookie di server
		const cookieStore = await cookies();
		cookieStore.set("auth_token", data.token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 60 * 60 * 24 * 7, // 7 hari
		});

		// Simpan data branch manager
		cookieStore.set("branch_manager", JSON.stringify(data.branchManager), {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 60 * 60 * 24 * 7,
		});
	} catch (error: unknown) {
		return { error: "Terjadi kesalahan server" };
	}

	// Redirect di luar try-catch
	redirect("/tanya-ai");
}

export async function logoutAction() {
	const cookieStore = await cookies();
	cookieStore.delete("auth_token");
	cookieStore.delete("branch_manager");
	redirect("/");
}

export async function getAuthToken(): Promise<string | null> {
	const cookieStore = await cookies();
	const token = cookieStore.get("auth_token");
	return token?.value || null;
}

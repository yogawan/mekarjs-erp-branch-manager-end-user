"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { loginAction } from "@/lib/actions/auth";
import { useActionState } from "react";

export default function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [state, formAction, isPending] = useActionState(loginAction, null);

	return (
		<>
			{/* Error Message */}
			{state?.error && (
				<div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
					<p className="text-red-600 text-sm">{state.error}</p>
				</div>
			)}

			{/* Login Form */}
			<form action={formAction} className="space-y-6">
				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium text-foreground mb-2"
					>
						Email
					</label>
					<input
						id="email"
						name="email"
						type="email"
						required
						disabled={isPending}
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed"
						placeholder="nama@email.com"
					/>
				</div>

				<div>
					<label
						htmlFor="password"
						className="block text-sm font-medium text-foreground mb-2"
					>
						Password
					</label>
					<div className="relative">
						<input
							id="password"
							name="password"
							type={showPassword ? "text" : "password"}
							required
							disabled={isPending}
							className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed"
							placeholder="••••••••"
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
							disabled={isPending}
						>
							{showPassword ? (
								<EyeOff className="w-5 h-5" />
							) : (
								<Eye className="w-5 h-5" />
							)}
						</button>
					</div>
				</div>

				<button
					type="submit"
					disabled={isPending}
					className="w-full bg-primary text-white font-normal p-5 rounded-full hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{isPending ? "Memproses..." : "Login"}
				</button>
			</form>
		</>
	);
}

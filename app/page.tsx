import LoginForm from "@/components/LoginForm";
import Image from "next/image";

export default function LoginPage() {
	return (
		<div className="min-h-screen grid md:grid-cols-2">
			{/* Left - Login Form */}
			<div className="bg-background flex items-center justify-center px-4 py-8">
				<div className="w-full max-w-md">
					{/* Header */}
					<div className="text-center mb-8">
						<h1 className="text-3xl font-normal text-foreground mb-2">
							MekarJS ERP
						</h1>
						<p className="text-gray-600">Branch Manager Portal</p>
					</div>

					<LoginForm />

					{/* Footer */}
					<div className="mt-6 text-center text-sm text-gray-500">
						© 2025 PT. Mekar Jaya Sejahtera
					</div>
				</div>
			</div>

			{/* Right - Image */}
			<div className="hidden md:block relative">
				<Image
					src="https://res.cloudinary.com/dy4hqxkv1/image/upload/v1765321241/anatol-rurac-uSRLqYkS2w0-unsplash_tska4y.jpg"
					alt="MekarJS ERP"
					fill
					className="object-cover"
					priority
				/>
			</div>
		</div>
	);
}


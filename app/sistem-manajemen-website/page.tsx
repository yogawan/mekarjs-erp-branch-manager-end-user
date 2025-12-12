// @/app/sistem-manajemen-website/page.tsx
import Sidebar from "@/components/Sidebar";
import { getLandingPage } from "@/lib/actions/landingPage";
import { redirect } from "next/navigation";
import { Globe, Menu, Image, ShoppingBag, MessageSquare, Edit } from "lucide-react";
import Link from "next/link";

export default async function SistemManajemenWebsitePage() {
    let landingPage;

    try {
        const response = await getLandingPage();
        landingPage = response.data;
    } catch (error) {
        redirect("/");
    }

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 lg:ml-64 p-4 lg:p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            Sistem Manajemen Website
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Kelola konten landing page website Anda
                        </p>
                    </div>
                    <Link
                        href={`/sistem-manajemen-website/${landingPage._id}/update`}
                        className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition"
                    >
                        <Edit className="w-5 h-5" />
                        Edit Website
                    </Link>
                </div>

                {/* Preview Sections */}
                <div className="space-y-6">
                    {/* Navbar Section */}
                    <section className="bg-white p-6 rounded-3xl border border-black/10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Menu className="w-6 h-6 text-blue-600" />
                            </div>
                            <h2 className="text-xl font-bold text-foreground">Navbar</h2>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Logo</p>
                                <div className="flex items-center gap-3">
                                    <img
                                        src={landingPage.navbar.logo}
                                        alt="Logo"
                                        className="w-12 h-12 object-contain bg-gray-100 rounded-lg p-2"
                                    />
                                    <p className="text-sm text-gray-700 font-mono break-all">
                                        {landingPage.navbar.logo}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-2">
                                    Menu Items ({landingPage.navbar.menus.length})
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                    {landingPage.navbar.menus.map((menu, index) => (
                                        <div
                                            key={index}
                                            className="bg-gray-50 p-3 rounded-2xl"
                                        >
                                            <p className="font-semibold text-sm text-foreground">
                                                {menu.label}
                                            </p>
                                            <p className="text-xs text-gray-600 font-mono">
                                                {menu.link}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Hero Section */}
                    <section className="bg-white p-6 rounded-3xl border border-black/10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Globe className="w-6 h-6 text-purple-600" />
                            </div>
                            <h2 className="text-xl font-bold text-foreground">Hero Section</h2>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Title</p>
                                <p className="text-lg font-bold text-foreground">
                                    {landingPage.hero.title}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Subtitle</p>
                                <p className="text-base text-foreground">
                                    {landingPage.hero.subtitle}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Description</p>
                                <p className="text-sm text-gray-700">
                                    {landingPage.hero.description}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Background Image</p>
                                <p className="text-sm text-gray-700 font-mono break-all">
                                    {landingPage.hero.backgroundImage}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Call to Action</p>
                                <div className="bg-gray-50 p-3 rounded-2xl inline-block">
                                    <p className="font-semibold text-sm text-foreground">
                                        {landingPage.hero.cta.label}
                                    </p>
                                    <p className="text-xs text-gray-600 font-mono">
                                        {landingPage.hero.cta.link}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* About Section */}
                    <section className="bg-white p-6 rounded-3xl border border-black/10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <MessageSquare className="w-6 h-6 text-green-600" />
                            </div>
                            <h2 className="text-xl font-bold text-foreground">
                                About Section
                            </h2>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Title</p>
                                <p className="text-lg font-bold text-foreground">
                                    {landingPage.about.title}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Description</p>
                                <p className="text-sm text-gray-700">
                                    {landingPage.about.description}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Image</p>
                                <div className="flex items-center gap-3">
                                    <img
                                        src={landingPage.about.image}
                                        alt="About"
                                        className="w-12 h-12 object-contain bg-gray-100 rounded-lg p-2"
                                    />
                                    <p className="text-sm text-gray-700 font-mono break-all">
                                        {landingPage.about.image}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Products Section */}
                    <section className="bg-white p-6 rounded-3xl border border-black/10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-orange-100 rounded-lg">
                                <ShoppingBag className="w-6 h-6 text-orange-600" />
                            </div>
                            <h2 className="text-xl font-bold text-foreground">
                                Products Section
                            </h2>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Title</p>
                                <p className="text-lg font-bold text-foreground">
                                    {landingPage.products.title}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Description</p>
                                <p className="text-sm text-gray-700">
                                    {landingPage.products.description}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-2">
                                    Products ({landingPage.products.items.length})
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {landingPage.products.items.map((product, index) => (
                                        <div
                                            key={index}
                                            className="bg-gray-50 p-4 rounded-2xl"
                                        >
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-32 object-contain bg-white rounded-lg mb-3"
                                            />
                                            <p className="font-semibold text-foreground">
                                                {product.name}
                                            </p>
                                            <p className="text-xs text-gray-600 mt-1">
                                                {product.description}
                                            </p>
                                            <p className="text-sm font-bold text-primary mt-2">
                                                {formatCurrency(product.price)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Footer Section */}
                    <section className="bg-white p-6 rounded-3xl border border-black/10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-gray-100 rounded-lg">
                                <Image className="w-6 h-6 text-gray-600" />
                            </div>
                            <h2 className="text-xl font-bold text-foreground">Footer</h2>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Description</p>
                                <p className="text-sm text-gray-700">
                                    {landingPage.footer.description}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-2">
                                    Social Links ({landingPage.footer.socialLinks.length})
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                    {landingPage.footer.socialLinks.map((link, index) => (
                                        <div
                                            key={index}
                                            className="bg-gray-50 p-3 rounded-2xl"
                                        >
                                            <p className="font-semibold text-sm text-foreground">
                                                {link.platform}
                                            </p>
                                            <p className="text-xs text-gray-600 font-mono break-all">
                                                {link.url}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Copyright</p>
                                <p className="text-sm text-gray-700">
                                    {landingPage.footer.copyright}
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
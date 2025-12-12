// @/app/sistem-manajemen-website/[id]/update/page.tsx
"use client";

import Sidebar from "@/components/Sidebar";
import { getLandingPage, updateLandingPage } from "@/lib/actions/landingPage";
import type { UpdateLandingPageData, NavbarMenu, ProductItem, SocialLink } from "@/types/landingPage";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Plus, Trash2, Save, Loader2 } from "lucide-react";

export default function UpdateSistemManajemenWebsitePage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const [formData, setFormData] = useState<UpdateLandingPageData>({
        navbar: {
            logo: "",
            menus: [],
        },
        hero: {
            title: "",
            subtitle: "",
            description: "",
            backgroundImage: "",
            cta: {
                label: "",
                link: "",
            },
        },
        about: {
            title: "",
            description: "",
            image: "",
        },
        products: {
            title: "",
            description: "",
            items: [],
        },
        footer: {
            description: "",
            socialLinks: [],
            copyright: "",
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getLandingPage();
                const data = response.data;
                setFormData({
                    navbar: {
                        logo: data.navbar.logo,
                        menus: data.navbar.menus.map(m => ({ label: m.label, link: m.link })),
                    },
                    hero: {
                        title: data.hero.title,
                        subtitle: data.hero.subtitle,
                        description: data.hero.description,
                        backgroundImage: data.hero.backgroundImage,
                        cta: {
                            label: data.hero.cta.label,
                            link: data.hero.cta.link,
                        },
                    },
                    about: {
                        title: data.about.title,
                        description: data.about.description,
                        image: data.about.image,
                    },
                    products: {
                        title: data.products.title,
                        description: data.products.description,
                        items: data.products.items.map(p => ({
                            name: p.name,
                            description: p.description,
                            price: p.price,
                            image: p.image,
                        })),
                    },
                    footer: {
                        description: data.footer.description,
                        socialLinks: data.footer.socialLinks.map(s => ({
                            platform: s.platform,
                            url: s.url,
                        })),
                        copyright: data.footer.copyright,
                    },
                });
                setLoading(false);
            } catch (error) {
                setMessage({ type: "error", text: "Gagal memuat data" });
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage(null);

        try {
            await updateLandingPage(id, formData);
            setMessage({ type: "success", text: "Landing page berhasil diperbarui!" });
            setTimeout(() => {
                router.push("/sistem-manajemen-website");
            }, 1500);
        } catch (error) {
            setMessage({ type: "error", text: "Gagal memperbarui landing page" });
        } finally {
            setSubmitting(false);
        }
    };

    // Navbar Menu Handlers
    const addMenu = () => {
        setFormData({
            ...formData,
            navbar: {
                ...formData.navbar,
                menus: [...formData.navbar.menus, { label: "", link: "" }],
            },
        });
    };

    const removeMenu = (index: number) => {
        setFormData({
            ...formData,
            navbar: {
                ...formData.navbar,
                menus: formData.navbar.menus.filter((_, i) => i !== index),
            },
        });
    };

    const updateMenu = (index: number, field: keyof NavbarMenu, value: string) => {
        const newMenus = [...formData.navbar.menus];
        newMenus[index] = { ...newMenus[index], [field]: value };
        setFormData({
            ...formData,
            navbar: { ...formData.navbar, menus: newMenus },
        });
    };

    // Product Handlers
    const addProduct = () => {
        setFormData({
            ...formData,
            products: {
                ...formData.products,
                items: [
                    ...formData.products.items,
                    { name: "", description: "", price: 0, image: "" },
                ],
            },
        });
    };

    const removeProduct = (index: number) => {
        setFormData({
            ...formData,
            products: {
                ...formData.products,
                items: formData.products.items.filter((_, i) => i !== index),
            },
        });
    };

    const updateProduct = (index: number, field: keyof ProductItem, value: string | number) => {
        const newItems = [...formData.products.items];
        newItems[index] = { ...newItems[index], [field]: value };
        setFormData({
            ...formData,
            products: { ...formData.products, items: newItems },
        });
    };

    // Social Link Handlers
    const addSocialLink = () => {
        setFormData({
            ...formData,
            footer: {
                ...formData.footer,
                socialLinks: [...formData.footer.socialLinks, { platform: "", url: "" }],
            },
        });
    };

    const removeSocialLink = (index: number) => {
        setFormData({
            ...formData,
            footer: {
                ...formData.footer,
                socialLinks: formData.footer.socialLinks.filter((_, i) => i !== index),
            },
        });
    };

    const updateSocialLink = (index: number, field: keyof SocialLink, value: string) => {
        const newLinks = [...formData.footer.socialLinks];
        newLinks[index] = { ...newLinks[index], [field]: value };
        setFormData({
            ...formData,
            footer: { ...formData.footer, socialLinks: newLinks },
        });
    };

    if (loading) {
        return (
            <div className="flex">
                <Sidebar />
                <div className="flex-1 lg:ml-64 p-8 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            </div>
        );
    }

    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 lg:ml-64 p-4 lg:p-8">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-foreground">
                        Edit Landing Page
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Perbarui konten website Anda
                    </p>
                </div>

                {/* Message */}
                {message && (
                    <div
                        className={`mb-6 p-4 rounded-2xl ${message.type === "success"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                    >
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Navbar Section */}
                    <section className="bg-white p-6 rounded-3xl border border-black/10">
                        <h2 className="text-xl font-bold text-foreground mb-4">Navbar</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Logo URL
                                </label>
                                <input
                                    type="text"
                                    value={formData.navbar.logo}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            navbar: { ...formData.navbar, logo: e.target.value },
                                        })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Menu Items
                                    </label>
                                    <button
                                        type="button"
                                        onClick={addMenu}
                                        className="flex items-center gap-1 text-sm text-primary hover:text-yellow-600"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Tambah Menu
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {formData.navbar.menus.map((menu, index) => (
                                        <div
                                            key={index}
                                            className="flex gap-2 items-start bg-gray-50 p-3 rounded-2xl"
                                        >
                                            <div className="flex-1 space-y-2">
                                                <input
                                                    type="text"
                                                    placeholder="Label"
                                                    value={menu.label}
                                                    onChange={(e) =>
                                                        updateMenu(index, "label", e.target.value)
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
                                                    required
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Link"
                                                    value={menu.link}
                                                    onChange={(e) =>
                                                        updateMenu(index, "link", e.target.value)
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
                                                    required
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeMenu(index)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Hero Section */}
                    <section className="bg-white p-6 rounded-3xl border border-black/10">
                        <h2 className="text-xl font-bold text-foreground mb-4">Hero Section</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={formData.hero.title}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            hero: { ...formData.hero, title: e.target.value },
                                        })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-2xl"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Subtitle
                                </label>
                                <input
                                    type="text"
                                    value={formData.hero.subtitle}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            hero: { ...formData.hero, subtitle: e.target.value },
                                        })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-2xl"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={formData.hero.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            hero: { ...formData.hero, description: e.target.value },
                                        })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-2xl"
                                    rows={3}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Background Image URL
                                </label>
                                <input
                                    type="text"
                                    value={formData.hero.backgroundImage}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            hero: {
                                                ...formData.hero,
                                                backgroundImage: e.target.value,
                                            },
                                        })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-2xl"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        CTA Label
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.hero.cta.label}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                hero: {
                                                    ...formData.hero,
                                                    cta: { ...formData.hero.cta, label: e.target.value },
                                                },
                                            })
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-2xl"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        CTA Link
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.hero.cta.link}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                hero: {
                                                    ...formData.hero,
                                                    cta: { ...formData.hero.cta, link: e.target.value },
                                                },
                                            })
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-2xl"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* About Section */}
                    <section className="bg-white p-6 rounded-3xl border border-black/10">
                        <h2 className="text-xl font-bold text-foreground mb-4">About Section</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={formData.about.title}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            about: { ...formData.about, title: e.target.value },
                                        })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-2xl"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={formData.about.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            about: { ...formData.about, description: e.target.value },
                                        })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-2xl"
                                    rows={3}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Image URL
                                </label>
                                <input
                                    type="text"
                                    value={formData.about.image}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            about: { ...formData.about, image: e.target.value },
                                        })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-2xl"
                                    required
                                />
                            </div>
                        </div>
                    </section>

                    {/* Products Section */}
                    <section className="bg-white p-6 rounded-3xl border border-black/10">
                        <h2 className="text-xl font-bold text-foreground mb-4">Products Section</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={formData.products.title}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            products: { ...formData.products, title: e.target.value },
                                        })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-2xl"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={formData.products.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            products: {
                                                ...formData.products,
                                                description: e.target.value,
                                            },
                                        })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-2xl"
                                    rows={2}
                                    required
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Product Items
                                    </label>
                                    <button
                                        type="button"
                                        onClick={addProduct}
                                        className="flex items-center gap-1 text-sm text-primary hover:text-yellow-600"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Tambah Produk
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {formData.products.items.map((product, index) => (
                                        <div
                                            key={index}
                                            className="bg-gray-50 p-4 rounded-2xl space-y-3"
                                        >
                                            <div className="flex justify-between items-center">
                                                <p className="text-sm font-medium text-gray-700">
                                                    Produk #{index + 1}
                                                </p>
                                                <button
                                                    type="button"
                                                    onClick={() => removeProduct(index)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Nama Produk"
                                                value={product.name}
                                                onChange={(e) =>
                                                    updateProduct(index, "name", e.target.value)
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
                                                required
                                            />
                                            <textarea
                                                placeholder="Deskripsi"
                                                value={product.description}
                                                onChange={(e) =>
                                                    updateProduct(index, "description", e.target.value)
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
                                                rows={2}
                                                required
                                            />
                                            <input
                                                type="number"
                                                placeholder="Harga"
                                                value={product.price}
                                                onChange={(e) =>
                                                    updateProduct(
                                                        index,
                                                        "price",
                                                        Number.parseInt(e.target.value)
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
                                                required
                                            />
                                            <input
                                                type="text"
                                                placeholder="Image URL"
                                                value={product.image}
                                                onChange={(e) =>
                                                    updateProduct(index, "image", e.target.value)
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
                                                required
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Footer Section */}
                    <section className="bg-white p-6 rounded-3xl border border-black/10">
                        <h2 className="text-xl font-bold text-foreground mb-4">Footer</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={formData.footer.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            footer: { ...formData.footer, description: e.target.value },
                                        })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-2xl"
                                    rows={2}
                                    required
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Social Links
                                    </label>
                                    <button
                                        type="button"
                                        onClick={addSocialLink}
                                        className="flex items-center gap-1 text-sm text-primary hover:text-yellow-600"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Tambah Link
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {formData.footer.socialLinks.map((link, index) => (
                                        <div
                                            key={index}
                                            className="flex gap-2 items-start bg-gray-50 p-3 rounded-2xl"
                                        >
                                            <div className="flex-1 space-y-2">
                                                <input
                                                    type="text"
                                                    placeholder="Platform (e.g., Facebook)"
                                                    value={link.platform}
                                                    onChange={(e) =>
                                                        updateSocialLink(index, "platform", e.target.value)
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
                                                    required
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="URL"
                                                    value={link.url}
                                                    onChange={(e) =>
                                                        updateSocialLink(index, "url", e.target.value)
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
                                                    required
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeSocialLink(index)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Copyright
                                </label>
                                <input
                                    type="text"
                                    value={formData.footer.copyright}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            footer: { ...formData.footer, copyright: e.target.value },
                                        })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-2xl"
                                    required
                                />
                            </div>
                        </div>
                    </section>

                    {/* Submit Button */}
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Menyimpan...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    Simpan Perubahan
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push("/sistem-manajemen-website")}
                            className="px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition"
                        >
                            Batal
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
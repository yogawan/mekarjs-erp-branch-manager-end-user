// @/components/Sidebar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  MessageCircleQuestion,
  LayoutDashboard,
  Truck,
  FilePlus2,
  Users,
  ShoppingCart,
  Package,
  Warehouse,
  Boxes,
  LineChart,
  Shuffle,
  UserCog,
  ClipboardList,
  Settings,
  User,
  Menu,
  X,
} from "lucide-react";

interface MenuItem {
  label: string;
  icon: React.ElementType;
}

const menuItems: MenuItem[] = [
  { label: "Tanya AI", icon: MessageCircleQuestion },
  { label: "Dashboard Keuangan", icon: LayoutDashboard },
  { label: "Kelola Pemasok Material", icon: Truck },
  { label: "Catat Pembelian", icon: FilePlus2 },
  { label: "Kelola Pembeli Material", icon: Users },
  { label: "Catat Penjualan", icon: ShoppingCart },
  { label: "Kelola Produk", icon: Package },
  { label: "Kelola Warehouse", icon: Warehouse },
  { label: "Kelola Inventory", icon: Boxes },
  { label: "Prediksi Penjualan", icon: LineChart },
  { label: "Lacak Perpindahan Inventory", icon: Shuffle },
  { label: "Kelola Karyawan", icon: UserCog },
  { label: "Kelola Status Orderan Pembeli Material", icon: ClipboardList },
  { label: "Sistem Manajemen Website", icon: Settings },
  { label: "Profil Kepala Cabang", icon: User },
];

// fungsi untuk membuat slug otomatis dari label
const toHref = (label: string) =>
  "/" +
  label
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")    // hilangkan karakter aneh
    .replace(/\s+/g, "-");          // spasi → dash

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-white rounded-md shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay untuk mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 bottom-0 w-64 bg-background text-foreground p-4 flex flex-col z-40 overflow-y-auto scrollbar-hide
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* <h2 className="text-xl font-normal mb-6 mt-12 lg:mt-0">Menu</h2> */}

        <nav className="mt-5 flex flex-col gap-2">
          {menuItems.map((item) => {
            const href = toHref(item.label);
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`text-black/50 flex items-center gap-3 px-4 py-2 rounded-3xl transition ${
                  isActive ? "bg-primary text-white font-medium" : "hover:bg-gray-300"
                }`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

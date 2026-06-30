"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/app/admin/actions";

const tabs = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/destinations", label: "Destinations" },
  { href: "/admin/packages", label: "Packages" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-ink-950/95 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4">
          <div>
            <p className="text-saffron-400 text-xs uppercase tracking-widest">
              Spiritual Yatra
            </p>
            <h1 className="font-display text-xl text-white">Admin Dashboard</h1>
          </div>
          <nav className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const isActive = tab.exact
                ? pathname === tab.href
                : pathname.startsWith(tab.href);
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-saffron-500 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10",
                  )}
                >
                  {tab.label}
                </Link>
              );
            })}
            <form action={logoutAction}>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                Logout
              </button>
            </form>
          </nav>
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/destinations", label: "Destinations" },
    { href: "/packages", label: "Packages" },
    { href: "/about", label: "About" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-4"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className={`font-display text-xl md:text-2xl transition-colors z-10 ${
              isScrolled ? "text-ink-900" : "text-white drop-shadow-lg"
            }`}
          >
            <span className="text-saffron-500">Spiritual </span>
            <span
              className={isScrolled ? "text-maroon-600" : "text-saffron-300"}
            >
              Yatra
            </span>
          </Link>

          <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
            <div
              className={`rounded-full px-6 py-2.5 flex items-center gap-6 transition-all ${
                isScrolled
                  ? "bg-ink-50 border border-ink-200"
                  : "bg-white/15 backdrop-blur-md border border-white/20"
              }`}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isScrolled
                      ? "text-ink-700 hover:text-saffron-600"
                      : "text-white/90 hover:text-saffron-300"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:block z-10">
            <Link href="/contact">
              <Button variant="primary" size="sm">
                Contact
              </Button>
            </Link>
          </div>

          <button
            type="button"
            className={`md:hidden p-2 z-10 ${
              isScrolled ? "text-ink-800" : "text-white"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-xl p-4 border border-ink-200 shadow-lg">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-ink-700 hover:text-saffron-600 hover:bg-saffron-50 font-medium py-2.5 px-3 rounded-lg text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-ink-100 mt-2">
                <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="primary" size="sm" className="w-full">
                    Contact
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

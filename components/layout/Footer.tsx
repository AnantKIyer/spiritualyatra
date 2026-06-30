import Link from "next/link";
import { MapIcon, PlaneIcon, LocationIcon } from "@/components/ui/Icons";

export default function Footer() {
  return (
    <footer className="relative bg-primary-50 border-t border-primary-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-medium text-airbnb-black mb-4">
              Spiritual Yatra
            </h3>
            <p className="text-primary-600 leading-relaxed text-sm mb-4">
              Your trusted partner for spiritual journeys across India.
              Experience the divine with us.
            </p>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center">
                <MapIcon className="w-4 h-4 text-accent-600" />
              </div>
              <div className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center">
                <PlaneIcon className="w-4 h-4 text-secondary-600" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-airbnb-black mb-4 text-lg">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-primary-600 hover:text-accent-500 transition-colors flex items-center gap-2 group"
                >
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations"
                  className="text-primary-600 hover:text-accent-500 transition-colors flex items-center gap-2 group"
                >
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span>Destinations</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/packages"
                  className="text-primary-600 hover:text-accent-500 transition-colors flex items-center gap-2 group"
                >
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span>Packages</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-primary-600 hover:text-accent-500 transition-colors flex items-center gap-2 group"
                >
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span>About Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-medium text-airbnb-black mb-4 text-lg">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-primary-600">
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-accent-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>info@spiritualyatra.com</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-accent-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>+91 123 456 7890</span>
              </li>
              <li className="flex items-center gap-2">
                <LocationIcon className="w-4 h-4 text-accent-500" />
                <span>New Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-600">
            &copy; {new Date().getFullYear()} Spiritual Yatra. All rights
            reserved.
          </p>
          <Link
            href="/admin"
            className="text-xs text-primary-400 hover:text-primary-600 transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}

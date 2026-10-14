import Link from "next/link";
import { SquareCode } from "lucide-react";

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "Blogs", href: "/blogs" },
  { name: "Categories", href: "/categories" },
  { name: "Admin", href: "/admin" },
];

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Logo and description */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold tracking-tight text-gray-900"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <SquareCode />
              </span>
              Codersink
            </Link>

            <p className="mt-4 text-sm leading-6 text-gray-500">
              Explore ideas, discover stories, and share your thoughts. Your
              space for learning and inspiration.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Quick Links</h3>

            <ul className="mt-4 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition hover:text-indigo-600"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Account</h3>

            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/login"
                  className="text-sm text-gray-500 transition hover:text-indigo-600"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="text-sm text-gray-500 transition hover:text-indigo-600"
                >
                  Create an account
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-10 flex flex-col gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Codersink. All rights reserved.
          </p>

          <div className="flex gap-5">
            <Link
              href="/privacy"
              className="text-sm text-gray-500 transition hover:text-indigo-600"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-sm text-gray-500 transition hover:text-indigo-600"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

/**
 * WebsiteLayout - Public marketing website layout with header and footer
 * Design: Clean white, teal brand, professional marketing site
 */
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, ChevronDown, Scissors, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/website" },
  { label: "Services", href: "/website/services" },
  { label: "Salons", href: "/website/salons" },
  { label: "Freelancers", href: "/website/freelancers" },
  { label: "Shop", href: "/website/shop" },
  { label: "Blog", href: "/website/blog" },
  { label: "About", href: "/website/about" },
  { label: "Contact", href: "/website/contact" },
];

interface WebsiteLayoutProps {
  children: React.ReactNode;
}

export default function WebsiteLayout({ children }: WebsiteLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/website">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center">
                  <Scissors className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-bold text-gray-900 text-base">Stylist</span>
                  <span className="font-bold text-teal-600 text-base">Factory</span>
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    location === link.href || location.startsWith(link.href + "/")
                      ? "text-teal-600 bg-teal-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}>
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/user/home">
                <button className="text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors">
                  Book Now
                </button>
              </Link>
              <Link href="/login">
                <button className="text-sm font-medium text-teal-600 border border-teal-200 px-4 py-2 rounded-xl hover:bg-teal-50 transition-colors">
                  Owner Login
                </button>
              </Link>
              <Link href="/admin/dashboard">
                <button className="text-sm font-medium bg-teal-600 text-white px-4 py-2 rounded-xl hover:bg-teal-700 transition-colors">
                  Admin Panel
                </button>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <div
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-colors ${
                    location === link.href ? "text-teal-600 bg-teal-50" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </div>
              </Link>
            ))}
            <div className="pt-2 flex gap-2">
              <Link href="/user/home">
                <button className="flex-1 text-sm font-medium bg-teal-600 text-white px-4 py-2.5 rounded-xl hover:bg-teal-700 transition-colors">
                  Book Now
                </button>
              </Link>
              <Link href="/login">
                <button className="flex-1 text-sm font-medium border border-teal-200 text-teal-600 px-4 py-2.5 rounded-xl hover:bg-teal-50 transition-colors">
                  Owner Login
                </button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
                  <Scissors className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-bold">StylistFactory</span>
              </div>
              <p className="text-sm leading-relaxed mb-4">
                The all-in-one platform connecting customers with top salons and beauty professionals.
              </p>
              <div className="flex gap-3">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <button key={i} className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-teal-600 transition-colors">
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Quick Links</h4>
              <ul className="space-y-2">
                {["Home", "Services", "Salons", "Freelancers", "Shop", "Blog"].map((link) => (
                  <li key={link}>
                    <Link href={`/website/${link.toLowerCase()}`}>
                      <span className="text-sm hover:text-teal-400 transition-colors cursor-pointer">{link}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Business */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">For Business</h4>
              <ul className="space-y-2">
                {["Register Your Salon", "Become a Freelancer", "Owner Login", "Pricing", "FAQ", "Help Center"].map((link) => (
                  <li key={link}>
                    <span className="text-sm hover:text-teal-400 transition-colors cursor-pointer">{link}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span>hello@stylistfactory.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span>(832) 833-5383</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                  <span>363 N Sam Houston PKWY E, Suite 410, Houston, TX 77060</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs">© 2026 StylistFactory. All rights reserved.</p>
            <div className="flex gap-4 text-xs">
              <Link href="/website/privacy"><span className="hover:text-teal-400 cursor-pointer">Privacy Policy</span></Link>
              <Link href="/website/terms"><span className="hover:text-teal-400 cursor-pointer">Terms of Service</span></Link>
              <Link href="/website/cookie"><span className="hover:text-teal-400 cursor-pointer">Cookie Policy</span></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

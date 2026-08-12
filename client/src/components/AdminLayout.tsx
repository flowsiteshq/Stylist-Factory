/**
 * AdminLayout - Super admin panel layout with sidebar navigation
 * Design: Dark sidebar (#1a1f2e) with teal accents, clean white content area
 */
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard, Users, Store, Calendar, ShoppingBag, CreditCard,
  BarChart2, Bell, Settings, LogOut, ChevronDown, Menu, X,
  FileText, Tag, MapPin, MessageSquare, Star, Gift, UserCheck,
  Package, Scissors
} from "lucide-react";
import { useState } from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navGroups = [
  {
    label: "Overview",
    items: [
      { path: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { path: "/admin/analytics", icon: BarChart2, label: "Analytics" },
    ],
  },
  {
    label: "Management",
    items: [
      { path: "/admin/salons", icon: Store, label: "Salons" },
      { path: "/admin/freelancers", icon: Scissors, label: "Freelancers" },
      { path: "/admin/users", icon: Users, label: "Users" },
      { path: "/admin/appointments", icon: Calendar, label: "Appointments" },
    ],
  },
  {
    label: "Commerce",
    items: [
      { path: "/admin/orders", icon: ShoppingBag, label: "Orders" },
      { path: "/admin/products", icon: Package, label: "Products" },
      { path: "/admin/payments", icon: CreditCard, label: "Payments" },
      { path: "/admin/subscriptions", icon: Tag, label: "Subscriptions" },
    ],
  },
  {
    label: "Content",
    items: [
      { path: "/admin/categories", icon: Tag, label: "Categories" },
      { path: "/admin/banners", icon: FileText, label: "Banners" },
      { path: "/admin/blogs", icon: FileText, label: "Blogs" },
      { path: "/admin/cities", icon: MapPin, label: "Cities" },
    ],
  },
  {
    label: "Support",
    items: [
      { path: "/admin/complaints", icon: MessageSquare, label: "Complaints" },
      { path: "/admin/reviews", icon: Star, label: "Reviews" },
      { path: "/admin/referrals", icon: Gift, label: "Referrals" },
      { path: "/admin/notifications", icon: Bell, label: "Notifications" },
    ],
  },
  {
    label: "System",
    items: [
      { path: "/admin/administrators", icon: UserCheck, label: "Admins" },
      { path: "/admin/settings", icon: Settings, label: "Settings" },
    ],
  },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const isActive = (path: string) => location === path || location.startsWith(path + "/");

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">SF</span>
          </div>
          {sidebarOpen && (
            <div>
              <p className="text-white font-bold text-sm">Stylist Factory</p>
              <p className="text-gray-400 text-[10px]">Super Admin</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-5">
        {navGroups.map((group) => (
          <div key={group.label}>
            {sidebarOpen && (
              <p className="text-gray-500 text-[10px] font-semibold uppercase tracking-wider px-3 mb-1.5">
                {group.label}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map(({ path, icon: Icon, label }) => {
                const active = isActive(path);
                return (
                  <Link key={path} href={path}>
                    <div
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all ${
                        active
                          ? "bg-teal-600 text-white"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                      onClick={() => setMobileSidebarOpen(false)}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      {sidebarOpen && <span className="text-sm font-medium">{label}</span>}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom User */}
      <div className="border-t border-white/10 p-3">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
            alt="Admin"
            className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
          />
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold truncate">Super Admin</p>
              <p className="text-gray-400 text-[10px] truncate">admin@stylistfactory.com</p>
            </div>
          )}
          <button
            onClick={() => { window.location.href = "/"; }}
            className="text-gray-400 hover:text-red-400 transition-colors flex-shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-[#1a1f2e] transition-all duration-300 ${
          sidebarOpen ? "w-56" : "w-16"
        } flex-shrink-0`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-56 bg-[#1a1f2e] flex flex-col">
            <SidebarContent />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setMobileSidebarOpen(false)} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSidebarOpen(!sidebarOpen);
                setMobileSidebarOpen(!mobileSidebarOpen);
              }}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-sm font-semibold text-gray-900">Admin Panel</h1>
              <p className="text-[10px] text-gray-400">Stylist Factory Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
                alt="Admin"
                className="w-7 h-7 rounded-lg object-cover"
              />
              <span className="text-xs font-medium text-gray-700 hidden sm:block">Super Admin</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

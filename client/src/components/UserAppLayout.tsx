/**
 * UserAppLayout - Mobile-first layout for the customer-facing Stylist Factory user app
 * Design: Clean white with teal accents, bottom tab navigation (mobile app feel)
 */
import { Link, useLocation } from "wouter";
import {
  Home,
  Calendar,
  ShoppingBag,
  User,
  Search,
  Bell,
  ChevronLeft,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface UserAppLayoutProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
  showSearch?: boolean;
  showNotification?: boolean;
  cartCount?: number;
}

export default function UserAppLayout({
  children,
  title,
  showBack = false,
  showSearch = false,
  showNotification = true,
  cartCount = 2,
}: UserAppLayoutProps) {
  const [location, navigate] = useLocation();
  const [notifCount] = useState(3);

  const tabs = [
    { path: "/user/home", icon: Home, label: "Home" },
    { path: "/user/services", icon: Search, label: "Explore" },
    { path: "/user/appointments", icon: Calendar, label: "Bookings" },
    { path: "/user/cart", icon: ShoppingBag, label: "Cart" },
    { path: "/user/account", icon: User, label: "Account" },
  ];

  const isActive = (path: string) => location === path || location.startsWith(path + "/");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto relative shadow-2xl">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          {showBack ? (
            <button
              onClick={() => window.history.back()}
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">SF</span>
              </div>
              <div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin className="w-3 h-3 text-teal-600" />
                  <span>New York, NY</span>
                </div>
              </div>
            </div>
          )}
          {title && (
            <h1 className="text-base font-semibold text-gray-900">{title}</h1>
          )}
        </div>
        <div className="flex items-center gap-2">
          {showSearch && (
            <Link href="/user/search">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Search className="w-5 h-5 text-gray-600" />
              </button>
            </Link>
          )}
          {showNotification && (
            <Link href="/user/notifications">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
                <Bell className="w-5 h-5 text-gray-600" />
                {notifCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">
                    {notifCount}
                  </span>
                )}
              </button>
            </Link>
          )}
          <Link href="/user/cart">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
              <ShoppingBag className="w-5 h-5 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-teal-600 rounded-full text-white text-[10px] flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">{children}</main>

      {/* Bottom Tab Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 z-40 shadow-lg">
        <div className="flex items-center justify-around px-2 py-2">
          {tabs.map(({ path, icon: Icon, label }) => {
            const active = isActive(path);
            return (
              <Link key={path} href={path}>
                <button className="flex flex-col items-center gap-0.5 px-3 py-1 min-w-[56px]">
                  <div
                    className={`p-1.5 rounded-xl transition-all ${
                      active ? "bg-teal-50" : ""
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 transition-colors ${
                        active ? "text-teal-600" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-[10px] font-medium transition-colors ${
                      active ? "text-teal-600" : "text-gray-400"
                    }`}
                  >
                    {label}
                  </span>
                </button>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

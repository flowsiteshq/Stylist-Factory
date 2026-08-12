/*
  STYLIST FACTORY — DashboardLayout
  Design: Persistent dark sidebar (#1C2333) with teal active states
  Typography: Space Grotesk for nav labels
  Sidebar collapses to icon-only on mobile
*/

import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  CalendarDays,
  BarChart3,
  Users,
  Scissors,
  Package,
  ShoppingBag,
  Image,
  Star,
  MessageSquare,
  Clock,
  User,
  LogOut,
  Menu,
  X,
  ChevronRight,
  History,
  Home,
} from "lucide-react";
import { mockOwner } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { icon: Home, label: "Appointments", path: "/appointments", badge: 3 },
  { icon: History, label: "History", path: "/history" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: CalendarDays, label: "Calendar", path: "/calendar" },
  { icon: Scissors, label: "Services", path: "/services" },
  { icon: Users, label: "Stylists", path: "/stylists" },
  { icon: Package, label: "Packages", path: "/packages" },
  { icon: ShoppingBag, label: "Products", path: "/products" },
  { icon: Image, label: "Gallery", path: "/gallery" },
  { icon: Star, label: "Reviews", path: "/reviews", badge: 2 },
  { icon: MessageSquare, label: "Chat", path: "/chat", badge: 5 },
  { icon: Clock, label: "Slots", path: "/slots" },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [location, navigate] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    navigate("/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo / Brand */}
      <div className="px-4 py-5 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <Scissors className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-sidebar-foreground font-semibold text-sm leading-tight truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Stylist Factory
            </p>
            <p className="text-sidebar-foreground/50 text-xs truncate">Owner Portal</p>
          </div>
        </div>
      </div>

      {/* Owner Info */}
      <div className="px-4 py-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <img
            src={mockOwner.profileImage}
            alt={mockOwner.name}
            className="w-9 h-9 rounded-full object-cover flex-shrink-0 ring-2 ring-primary/30"
          />
          <div className="min-w-0">
            <p className="text-sidebar-foreground text-sm font-medium truncate">{mockOwner.name}</p>
            <p className="text-sidebar-foreground/50 text-xs truncate">{mockOwner.salonName}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path || (item.path === "/appointments" && location === "/dashboard");
          return (
            <Link key={item.path} href={item.path}>
              <a
                className={cn(
                  "nav-item group",
                  isActive
                    ? "bg-primary text-white"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="w-4.5 h-4.5 flex-shrink-0" size={18} />
                <span className="flex-1 text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {item.label}
                </span>
                {item.badge && (
                  <Badge
                    className={cn(
                      "text-xs px-1.5 py-0 h-5 min-w-5 flex items-center justify-center",
                      isActive
                        ? "bg-white/20 text-white border-0"
                        : "bg-amber-500 text-white border-0"
                    )}
                  >
                    {item.badge}
                  </Badge>
                )}
              </a>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="px-3 py-4 border-t border-sidebar-border space-y-0.5">
        <Link href="/profile">
          <a
            className={cn(
              "nav-item",
              location === "/profile"
                ? "bg-primary text-white"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            )}
            onClick={() => setSidebarOpen(false)}
          >
            <User size={18} />
            <span className="text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Profile</span>
          </a>
        </Link>
        <button
          onClick={handleLogout}
          className="nav-item w-full text-left text-sidebar-foreground/70 hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={18} />
          <span className="text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-sidebar flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative w-64 bg-sidebar flex flex-col shadow-2xl">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-sidebar-foreground/50 hover:text-sidebar-foreground"
            >
              <X size={20} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-border shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-foreground/70 hover:text-foreground"
          >
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <Scissors className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Stylist Factory
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="page-enter">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

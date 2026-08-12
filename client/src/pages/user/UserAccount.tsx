/**
 * UserAccount - Customer profile, wallet, orders, settings
 */
import UserAppLayout from "@/components/UserAppLayout";
import { Link } from "wouter";
import {
  User, Wallet, ShoppingBag, Heart, MapPin, Bell, HelpCircle,
  LogOut, ChevronRight, Star, Gift, Settings
} from "lucide-react";

const menuItems = [
  { icon: Wallet, label: "My Wallet", sublabel: "$45.00 balance", href: "/user/wallet", color: "text-teal-600 bg-teal-50" },
  { icon: ShoppingBag, label: "My Orders", sublabel: "3 active orders", href: "/user/orders", color: "text-blue-600 bg-blue-50" },
  { icon: Heart, label: "Saved Salons", sublabel: "5 favorites", href: "/user/favorites", color: "text-pink-600 bg-pink-50" },
  { icon: MapPin, label: "My Addresses", sublabel: "2 saved", href: "/user/addresses", color: "text-orange-600 bg-orange-50" },
  { icon: Star, label: "My Reviews", sublabel: "12 reviews given", href: "/user/reviews", color: "text-amber-600 bg-amber-50" },
  { icon: Gift, label: "Referrals & Rewards", sublabel: "Earn $10 per referral", href: "/user/referrals", color: "text-purple-600 bg-purple-50" },
  { icon: Bell, label: "Notifications", sublabel: "Manage preferences", href: "/user/notifications", color: "text-indigo-600 bg-indigo-50" },
  { icon: Settings, label: "Settings", sublabel: "Account & privacy", href: "/user/settings", color: "text-gray-600 bg-gray-100" },
  { icon: HelpCircle, label: "Help & Support", sublabel: "FAQs, contact us", href: "/user/help", color: "text-green-600 bg-green-50" },
];

export default function UserAccount() {
  return (
    <UserAppLayout title="My Account">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-teal-600 to-teal-800 px-4 pt-5 pb-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
              alt="Profile"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white/30"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-teal-700" />
          </div>
          <div>
            <h2 className="text-white font-bold text-base">Alex Johnson</h2>
            <p className="text-teal-200 text-xs mt-0.5">alex.johnson@email.com</p>
            <p className="text-teal-200 text-xs">+1 (555) 123-4567</p>
          </div>
          <Link href="/user/edit-profile">
            <button className="ml-auto bg-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-white/30 transition-colors">
              Edit
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div className="flex gap-3 mt-5">
          {[
            { label: "Bookings", value: "24" },
            { label: "Reviews", value: "12" },
            { label: "Points", value: "850" },
          ].map((stat) => (
            <div key={stat.label} className="flex-1 bg-white/10 rounded-xl py-2.5 text-center">
              <p className="text-white font-bold text-base">{stat.value}</p>
              <p className="text-teal-200 text-[10px] mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 -mt-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <div className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-gray-50 transition-colors ${idx !== menuItems.length - 1 ? "border-b border-gray-50" : ""}`}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800">{item.label}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{item.sublabel}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Logout */}
        <button
          onClick={() => window.location.href = "/"}
          className="w-full mt-4 mb-6 flex items-center justify-center gap-2 py-3 rounded-xl border border-red-200 text-red-500 text-sm font-medium hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </UserAppLayout>
  );
}

/**
 * AdminDashboard - Super admin overview with KPIs, charts, recent activity
 */
import AdminLayout from "@/components/AdminLayout";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Store, Users, Calendar, DollarSign, ShoppingBag, Star, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const revenueData = [
  { month: "Jan", revenue: 42000, bookings: 380 },
  { month: "Feb", revenue: 38000, bookings: 320 },
  { month: "Mar", revenue: 55000, bookings: 490 },
  { month: "Apr", revenue: 61000, bookings: 540 },
  { month: "May", revenue: 58000, bookings: 510 },
  { month: "Jun", revenue: 72000, bookings: 620 },
  { month: "Jul", revenue: 68000, bookings: 590 },
];

const categoryData = [
  { name: "Hair", value: 38, color: "#0d9488" },
  { name: "Skin", value: 24, color: "#6366f1" },
  { name: "Nails", value: 18, color: "#f59e0b" },
  { name: "Makeup", value: 12, color: "#ec4899" },
  { name: "Spa", value: 8, color: "#10b981" },
];

const recentSalons = [
  { id: 1, name: "Luxe Hair Studio", city: "New York", status: "active", revenue: "$12,400", rating: 4.9, image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=100&q=80" },
  { id: 2, name: "Glow Beauty Lounge", city: "Los Angeles", status: "active", revenue: "$9,800", rating: 4.8, image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=100&q=80" },
  { id: 3, name: "The Style Bar", city: "Chicago", status: "pending", revenue: "$6,200", rating: 4.7, image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=100&q=80" },
  { id: 4, name: "Zen Wellness Spa", city: "Miami", status: "active", revenue: "$8,100", rating: 4.9, image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=100&q=80" },
];

const kpis = [
  { label: "Total Revenue", value: "$394,000", change: "+18.2%", up: true, icon: DollarSign, color: "text-teal-600 bg-teal-50" },
  { label: "Active Salons", value: "248", change: "+12 this month", up: true, icon: Store, color: "text-blue-600 bg-blue-50" },
  { label: "Total Users", value: "18,420", change: "+5.4%", up: true, icon: Users, color: "text-purple-600 bg-purple-50" },
  { label: "Appointments", value: "3,450", change: "-2.1%", up: false, icon: Calendar, color: "text-amber-600 bg-amber-50" },
  { label: "Orders", value: "1,284", change: "+9.7%", up: true, icon: ShoppingBag, color: "text-green-600 bg-green-50" },
  { label: "Avg. Rating", value: "4.82", change: "+0.1 pts", up: true, icon: Star, color: "text-rose-600 bg-rose-50" },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Platform overview — May 2026</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${kpi.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <p className="text-lg font-bold text-gray-900">{kpi.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{kpi.label}</p>
                <div className={`flex items-center gap-1 mt-1.5 text-xs font-medium ${kpi.up ? "text-green-600" : "text-red-500"}`}>
                  {kpi.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {kpi.change}
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Revenue & Bookings</h3>
                <p className="text-xs text-gray-400 mt-0.5">Last 7 months</p>
              </div>
              <select className="text-xs border border-gray-200 rounded-lg px-2 py-1 text-gray-600 outline-none">
                <option>2026</option>
                <option>2025</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]} />
                <Area type="monotone" dataKey="revenue" stroke="#0d9488" strokeWidth={2} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Category Pie */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Bookings by Category</h3>
            <p className="text-xs text-gray-400 mb-4">This month</p>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" paddingAngle={3}>
                  {categoryData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => [`${v}%`, ""]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2">
              {categoryData.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-xs text-gray-600">{cat.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-gray-700">{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Salons */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <h3 className="text-sm font-semibold text-gray-900">Top Performing Salons</h3>
            <Link href="/admin/salons">
              <span className="text-xs text-teal-600 font-medium flex items-center gap-1 hover:underline">
                View all <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentSalons.map((salon) => (
              <div key={salon.id} className="flex items-center gap-3 px-5 py-3">
                <img src={salon.image} alt={salon.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{salon.name}</p>
                  <p className="text-xs text-gray-400">{salon.city}</p>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span className="text-xs font-semibold text-gray-700">{salon.rating}</span>
                </div>
                <span className="text-sm font-semibold text-teal-600 w-20 text-right">{salon.revenue}</span>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  salon.status === "active" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
                }`}>
                  {salon.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

/*
  STYLIST FACTORY — Analytics Page
  Design: KPI cards + revenue chart + pie chart + top services table
  Uses recharts for data visualization
*/

import { TrendingUp, TrendingDown, IndianRupee, CalendarDays, Users, Star } from "lucide-react";
import { mockAnalyticsData } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { cn } from "@/lib/utils";

const COLORS = ["#0F766E", "#F59E0B", "#6366F1", "#EF4444"];

const kpis = [
  {
    label: "Total Revenue",
    value: `₹${(mockAnalyticsData.totalRevenue / 1000).toFixed(0)}K`,
    change: mockAnalyticsData.revenueGrowth,
    icon: IndianRupee,
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    label: "Total Appointments",
    value: mockAnalyticsData.totalAppointments.toLocaleString("en-IN"),
    change: mockAnalyticsData.appointmentsGrowth,
    icon: CalendarDays,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    label: "Total Customers",
    value: mockAnalyticsData.totalCustomers.toLocaleString("en-IN"),
    change: mockAnalyticsData.customersGrowth,
    icon: Users,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    label: "Average Rating",
    value: mockAnalyticsData.avgRating.toFixed(1),
    change: mockAnalyticsData.ratingChange,
    icon: Star,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
];

export default function Analytics() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Analytics
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">Business performance overview</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          const isPositive = kpi.change >= 0;
          return (
            <Card key={kpi.label} className="stat-card border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", kpi.bg)}>
                    <Icon className={cn("w-4.5 h-4.5", kpi.color)} size={18} />
                  </div>
                  <span className={cn("flex items-center gap-0.5 text-xs font-medium", isPositive ? "text-green-600" : "text-red-600")}>
                    {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {Math.abs(kpi.change)}%
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {kpi.value}
                </p>
                <p className="text-muted-foreground text-xs mt-0.5">{kpi.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Monthly Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={mockAnalyticsData.monthlyRevenue} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F766E" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#0F766E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}K`} />
                <Tooltip
                  formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`, "Revenue"]}
                  contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px" }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#0F766E" strokeWidth={2.5} fill="url(#revenueGrad)" dot={{ fill: "#0F766E", r: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Appointment Status Pie */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Appointment Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={mockAnalyticsData.appointmentsByStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="count"
                >
                  {mockAnalyticsData.appointmentsByStatus.map((entry, index) => (
                    <Cell key={entry.status} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number, name: string) => [value, name]}
                  contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2">
              {mockAnalyticsData.appointmentsByStatus.map((item, i) => (
                <div key={item.status} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-muted-foreground">{item.status}</span>
                  </div>
                  <span className="font-semibold text-foreground">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Appointments + Top Services */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Bar Chart */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Weekly Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={mockAnalyticsData.weeklyAppointments} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(value: number) => [value, "Appointments"]}
                  contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px" }}
                />
                <Bar dataKey="appointments" fill="#0F766E" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Services Table */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Top Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAnalyticsData.topServices.map((svc, i) => (
                <div key={svc.name} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground flex-shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-foreground truncate">{svc.name}</p>
                      <p className="text-xs text-muted-foreground flex-shrink-0 ml-2">{svc.bookings} bookings</p>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(svc.bookings / 203) * 100}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-primary flex-shrink-0">
                    ₹{(svc.revenue / 1000).toFixed(0)}K
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

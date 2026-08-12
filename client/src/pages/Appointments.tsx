/*
  STYLIST FACTORY — Appointments Page
  Design: Stats row + tabbed appointment list with status filters
  Colors: Teal primary, amber for pending, green for confirmed
*/

import { useState } from "react";
import { Calendar, Clock, User, Phone, CheckCircle, XCircle, AlertCircle, Search, Filter, Plus } from "lucide-react";
import { mockAppointments } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const statusConfig = {
  confirmed: { label: "Confirmed", color: "bg-teal-100 text-teal-800", icon: CheckCircle, iconColor: "text-teal-600" },
  pending: { label: "Pending", color: "bg-amber-100 text-amber-800", icon: AlertCircle, iconColor: "text-amber-600" },
  completed: { label: "Completed", color: "bg-green-100 text-green-800", icon: CheckCircle, iconColor: "text-green-600" },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800", icon: XCircle, iconColor: "text-red-600" },
};

const tabs = ["All", "Today", "Pending", "Confirmed", "Completed", "Cancelled"];

export default function Appointments() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const filtered = mockAppointments.filter((apt) => {
    const matchSearch =
      apt.customerName.toLowerCase().includes(search.toLowerCase()) ||
      apt.service.toLowerCase().includes(search.toLowerCase()) ||
      apt.stylist.toLowerCase().includes(search.toLowerCase());

    const matchTab =
      activeTab === "All" ||
      (activeTab === "Today" && apt.date === today) ||
      apt.status === activeTab.toLowerCase();

    return matchSearch && matchTab;
  });

  const stats = [
    { label: "Today's Appointments", value: mockAppointments.filter((a) => a.date === today).length, color: "text-primary", bg: "bg-teal-50" },
    { label: "Pending", value: mockAppointments.filter((a) => a.status === "pending").length, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Confirmed", value: mockAppointments.filter((a) => a.status === "confirmed").length, color: "text-teal-600", bg: "bg-teal-50" },
    { label: "Completed Today", value: mockAppointments.filter((a) => a.status === "completed" && a.date === today).length, color: "text-green-600", bg: "bg-green-50" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Appointments
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 text-white gap-2"
          onClick={() => toast.info("Add appointment feature coming soon")}
        >
          <Plus size={16} />
          New Appointment
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="stat-card border-0 shadow-sm">
            <CardContent className="p-4">
              <p className="text-muted-foreground text-xs font-medium mb-1">{stat.label}</p>
              <p className={cn("text-3xl font-bold", stat.color)} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {stat.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by customer, service, or stylist..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter size={16} />
          Filter
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted/50 p-1 rounded-lg w-fit overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap",
              activeTab === tab
                ? "bg-white text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Appointments List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No appointments found</p>
            <p className="text-sm">Try adjusting your search or filter</p>
          </div>
        ) : (
          filtered.map((apt) => {
            const status = statusConfig[apt.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;
            return (
              <Card key={apt.id} className="border border-border/60 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Customer Avatar */}
                    <img
                      src={apt.customerImage}
                      alt={apt.customerName}
                      className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                    />

                    {/* Main Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-foreground text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {apt.customerName}
                          </h3>
                          <p className="text-muted-foreground text-xs flex items-center gap-1 mt-0.5">
                            <Phone size={11} />
                            {apt.customerPhone}
                          </p>
                        </div>
                        <span className={cn("badge-pill flex-shrink-0", status.color)}>
                          {status.label}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(apt.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {apt.time} ({apt.duration} min)
                        </span>
                        <span className="flex items-center gap-1">
                          <User size={12} />
                          {apt.stylist}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-sm font-medium text-foreground">{apt.service}</p>
                        <p className="text-sm font-bold text-primary">₹{apt.amount.toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons for pending */}
                  {apt.status === "pending" && (
                    <div className="flex gap-2 mt-3 pt-3 border-t border-border/50">
                      <Button
                        size="sm"
                        className="flex-1 bg-primary hover:bg-primary/90 text-white text-xs h-8"
                        onClick={() => toast.success(`Appointment confirmed for ${apt.customerName}`)}
                      >
                        <CheckCircle size={13} className="mr-1" />
                        Confirm
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-red-600 border-red-200 hover:bg-red-50 text-xs h-8"
                        onClick={() => toast.error(`Appointment cancelled for ${apt.customerName}`)}
                      >
                        <XCircle size={13} className="mr-1" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}

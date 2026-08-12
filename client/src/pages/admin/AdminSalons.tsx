/**
 * AdminSalons - Manage all registered salons
 */
import AdminLayout from "@/components/AdminLayout";
import { Search, Plus, Star, MapPin, MoreVertical, CheckCircle, Clock, XCircle, Filter } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const salons = [
  { id: 1, name: "Luxe Hair Studio", owner: "Emma Wilson", city: "New York, NY", status: "active", revenue: "$12,400", rating: 4.9, bookings: 312, joined: "Jan 2025", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=100&q=80" },
  { id: 2, name: "Glow Beauty Lounge", owner: "Sophia Chen", city: "Los Angeles, CA", status: "active", revenue: "$9,800", rating: 4.8, bookings: 198, joined: "Mar 2025", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=100&q=80" },
  { id: 3, name: "The Style Bar", owner: "Marcus Johnson", city: "Chicago, IL", status: "pending", revenue: "$6,200", rating: 4.7, bookings: 145, joined: "Apr 2025", image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=100&q=80" },
  { id: 4, name: "Zen Wellness Spa", owner: "Priya Patel", city: "Miami, FL", status: "active", revenue: "$8,100", rating: 4.9, bookings: 220, joined: "Feb 2025", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=100&q=80" },
  { id: 5, name: "Urban Cuts", owner: "David Kim", city: "Seattle, WA", status: "suspended", revenue: "$3,400", rating: 3.8, bookings: 87, joined: "Jun 2025", image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=100&q=80" },
  { id: 6, name: "The Beauty Lab", owner: "Rachel Torres", city: "Austin, TX", status: "active", revenue: "$7,600", rating: 4.6, bookings: 178, joined: "May 2025", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=100&q=80" },
];

const statusConfig = {
  active: { label: "Active", icon: CheckCircle, color: "text-green-600 bg-green-50" },
  pending: { label: "Pending", icon: Clock, color: "text-amber-600 bg-amber-50" },
  suspended: { label: "Suspended", icon: XCircle, color: "text-red-500 bg-red-50" },
};

export default function AdminSalons() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = salons.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.city.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Salons</h1>
            <p className="text-sm text-gray-500 mt-0.5">{salons.length} registered salons</p>
          </div>
          <button
            onClick={() => toast.info("Add salon form coming soon")}
            className="flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-teal-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Salon
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2.5 shadow-sm">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search salons, cities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            {["all", "active", "pending", "suspended"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-2 rounded-xl text-xs font-medium capitalize transition-all ${
                  statusFilter === s ? "bg-teal-600 text-white" : "bg-white border border-gray-200 text-gray-600"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/50">
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Salon</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 hidden md:table-cell">Owner</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 hidden lg:table-cell">Location</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 hidden md:table-cell">Revenue</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 hidden lg:table-cell">Rating</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((salon) => {
                  const status = statusConfig[salon.status as keyof typeof statusConfig];
                  const StatusIcon = status.icon;
                  return (
                    <tr key={salon.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={salon.image} alt={salon.name} className="w-9 h-9 rounded-xl object-cover flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-gray-800">{salon.name}</p>
                            <p className="text-xs text-gray-400">{salon.bookings} bookings</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <p className="text-sm text-gray-700">{salon.owner}</p>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <div className="flex items-center gap-1 text-gray-500">
                          <MapPin className="w-3 h-3" />
                          <span className="text-xs">{salon.city}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-full w-fit ${status.color}`}>
                          <StatusIcon className="w-2.5 h-2.5" />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-sm font-semibold text-teal-600">{salon.revenue}</span>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className="text-sm font-semibold text-gray-700">{salon.rating}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toast.info(`Managing ${salon.name}`)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

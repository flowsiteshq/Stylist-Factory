/**
 * AdminUsers - Manage all platform users
 */
import AdminLayout from "@/components/AdminLayout";
import { Search, Plus, MoreVertical, CheckCircle, XCircle, Filter, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const users = [
  { id: 1, name: "Alex Johnson", email: "alex.j@email.com", phone: "+1 555-0101", status: "active", bookings: 24, spent: "$840", joined: "Jan 2025", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" },
  { id: 2, name: "Michael Chen", email: "m.chen@email.com", phone: "+1 555-0102", status: "active", bookings: 18, spent: "$620", joined: "Feb 2025", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" },
  { id: 3, name: "Sarah Williams", email: "s.williams@email.com", phone: "+1 555-0103", status: "active", bookings: 31, spent: "$1,240", joined: "Dec 2024", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" },
  { id: 4, name: "James Brown", email: "j.brown@email.com", phone: "+1 555-0104", status: "suspended", bookings: 5, spent: "$180", joined: "Mar 2025", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" },
  { id: 5, name: "Emily Davis", email: "e.davis@email.com", phone: "+1 555-0105", status: "active", bookings: 42, spent: "$1,680", joined: "Nov 2024", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80" },
  { id: 6, name: "Robert Wilson", email: "r.wilson@email.com", phone: "+1 555-0106", status: "active", bookings: 9, spent: "$320", joined: "Apr 2025", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80" },
];

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || u.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Users</h1>
            <p className="text-sm text-gray-500 mt-0.5">{users.length.toLocaleString()} registered users</p>
          </div>
          <button
            onClick={() => toast.info("Export users feature coming soon")}
            className="flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-teal-700 transition-colors"
          >
            Export CSV
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2.5 shadow-sm">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            {["all", "active", "suspended"].map((s) => (
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

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/50">
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">User</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 hidden md:table-cell">Contact</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 hidden md:table-cell">Bookings</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 hidden lg:table-cell">Total Spent</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 hidden lg:table-cell">Joined</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={user.image} alt={user.name} className="w-9 h-9 rounded-xl object-cover flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-800">{user.name}</p>
                          <p className="text-xs text-gray-400 md:hidden">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1 text-gray-500">
                          <Mail className="w-3 h-3" />
                          <span className="text-xs">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Phone className="w-3 h-3" />
                          <span className="text-xs">{user.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-full w-fit ${
                        user.status === "active" ? "text-green-600 bg-green-50" : "text-red-500 bg-red-50"
                      }`}>
                        {user.status === "active" ? <CheckCircle className="w-2.5 h-2.5" /> : <XCircle className="w-2.5 h-2.5" />}
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-sm text-gray-700">{user.bookings}</span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-sm font-semibold text-teal-600">{user.spent}</span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-xs text-gray-500">{user.joined}</span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toast.info(`Managing ${user.name}`)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

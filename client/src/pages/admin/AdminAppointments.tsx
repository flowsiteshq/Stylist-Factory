/**
 * AdminAppointments - View and manage all platform appointments
 */
import AdminLayout from "@/components/AdminLayout";
import { Search, Calendar, Clock, MoreVertical, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const appointments = [
  { id: "APT-001", user: "Alex Johnson", salon: "Luxe Hair Studio", service: "Haircut & Styling", stylist: "Sarah M.", date: "May 15, 2026", time: "10:00 AM", status: "confirmed", amount: "$35", userImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=80" },
  { id: "APT-002", user: "Emily Davis", salon: "Glow Beauty Lounge", service: "Full Facial", stylist: "Jessica L.", date: "May 15, 2026", time: "2:00 PM", status: "pending", amount: "$65", userImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&q=80" },
  { id: "APT-003", user: "Michael Chen", salon: "The Style Bar", service: "Manicure", stylist: "Priya K.", date: "May 14, 2026", time: "11:00 AM", status: "completed", amount: "$50", userImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80" },
  { id: "APT-004", user: "Sarah Williams", salon: "Zen Wellness Spa", service: "Massage", stylist: "Maria R.", date: "May 14, 2026", time: "3:00 PM", status: "cancelled", amount: "$80", userImg: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&q=80" },
  { id: "APT-005", user: "Robert Wilson", salon: "Luxe Hair Studio", service: "Hair Color", stylist: "Sarah M.", date: "May 13, 2026", time: "1:00 PM", status: "completed", amount: "$120", userImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=80" },
];

const statusConfig = {
  confirmed: { color: "text-blue-600 bg-blue-50", icon: AlertCircle },
  pending: { color: "text-amber-600 bg-amber-50", icon: Clock },
  completed: { color: "text-green-600 bg-green-50", icon: CheckCircle },
  cancelled: { color: "text-red-500 bg-red-50", icon: XCircle },
};

export default function AdminAppointments() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = appointments.filter((a) => {
    const matchSearch = a.user.toLowerCase().includes(search.toLowerCase()) || a.salon.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Appointments</h1>
            <p className="text-sm text-gray-500 mt-0.5">{appointments.length} total appointments</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2.5 shadow-sm">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search appointments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["all", "confirmed", "pending", "completed", "cancelled"].map((s) => (
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
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">ID</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Customer</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 hidden md:table-cell">Salon & Service</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 hidden lg:table-cell">Date & Time</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Amount</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((appt) => {
                  const status = statusConfig[appt.status as keyof typeof statusConfig];
                  const StatusIcon = status.icon;
                  return (
                    <tr key={appt.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <span className="text-xs font-mono text-gray-500">{appt.id}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <img src={appt.userImg} alt={appt.user} className="w-8 h-8 rounded-lg object-cover" />
                          <span className="text-sm font-medium text-gray-800">{appt.user}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <p className="text-sm text-gray-700">{appt.salon}</p>
                        <p className="text-xs text-gray-400">{appt.service} • {appt.stylist}</p>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Calendar className="w-3 h-3" />
                          <span className="text-xs">{appt.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400 mt-0.5">
                          <Clock className="w-3 h-3" />
                          <span className="text-xs">{appt.time}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-full w-fit ${status.color}`}>
                          <StatusIcon className="w-2.5 h-2.5" />
                          {appt.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-semibold text-teal-600">{appt.amount}</span>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => toast.info(`Viewing ${appt.id}`)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
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

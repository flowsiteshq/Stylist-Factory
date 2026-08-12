/**
 * UserAppointments - Customer's booking history and upcoming appointments
 */
import UserAppLayout from "@/components/UserAppLayout";
import { Link } from "wouter";
import { Calendar, Clock, MapPin, Star, ChevronRight, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

const appointments = [
  {
    id: 1,
    service: "Haircut & Styling",
    salon: "Luxe Hair Studio",
    stylist: "Sarah Mitchell",
    date: "May 15, 2026",
    time: "10:00 AM",
    status: "upcoming",
    price: 35,
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=200&q=80",
  },
  {
    id: 2,
    service: "Full Facial Treatment",
    salon: "Glow Beauty Lounge",
    stylist: "Jessica Lee",
    date: "May 10, 2026",
    time: "2:00 PM",
    status: "completed",
    price: 65,
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=200&q=80",
  },
  {
    id: 3,
    service: "Manicure & Pedicure",
    salon: "The Style Bar",
    stylist: "Priya Kumar",
    date: "May 5, 2026",
    time: "11:00 AM",
    status: "cancelled",
    price: 50,
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&q=80",
  },
];

const statusConfig = {
  upcoming: { label: "Upcoming", icon: AlertCircle, color: "text-blue-600 bg-blue-50" },
  completed: { label: "Completed", icon: CheckCircle, color: "text-green-600 bg-green-50" },
  cancelled: { label: "Cancelled", icon: XCircle, color: "text-red-500 bg-red-50" },
};

const tabs = ["All", "Upcoming", "Completed", "Cancelled"];

export default function UserAppointments() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = appointments.filter(
    (a) => activeTab === "All" || a.status === activeTab.toLowerCase()
  );

  return (
    <UserAppLayout title="My Bookings">
      {/* Tabs */}
      <div className="flex gap-2 px-4 pt-4 pb-3 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeTab === tab
                ? "bg-teal-600 text-white"
                : "bg-white text-gray-600 border border-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Appointment Cards */}
      <div className="px-4 flex flex-col gap-3 pb-4">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-sm text-gray-400">No appointments found</p>
          </div>
        ) : (
          filtered.map((appt) => {
            const status = statusConfig[appt.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;
            return (
              <Link key={appt.id} href={`/user/appointment/${appt.id}`}>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 p-3">
                    <img src={appt.image} alt={appt.service} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-sm font-semibold text-gray-900 truncate">{appt.service}</h4>
                        <span className={`flex items-center gap-0.5 text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${status.color}`}>
                          <StatusIcon className="w-2.5 h-2.5" />
                          {status.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{appt.salon}</p>
                      <p className="text-xs text-gray-400 mt-0.5">with {appt.stylist}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1 text-gray-400">
                          <Calendar className="w-3 h-3" />
                          <span className="text-[10px]">{appt.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400">
                          <Clock className="w-3 h-3" />
                          <span className="text-[10px]">{appt.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-50 px-3 py-2 flex items-center justify-between">
                    <span className="text-xs font-semibold text-teal-600">${appt.price}.00</span>
                    {appt.status === "upcoming" && (
                      <div className="flex gap-2">
                        <button className="text-[10px] text-red-500 border border-red-200 px-2.5 py-1 rounded-full font-medium hover:bg-red-50 transition-colors">
                          Cancel
                        </button>
                        <button className="text-[10px] text-teal-600 border border-teal-200 px-2.5 py-1 rounded-full font-medium hover:bg-teal-50 transition-colors">
                          Reschedule
                        </button>
                      </div>
                    )}
                    {appt.status === "completed" && (
                      <button className="flex items-center gap-1 text-[10px] text-amber-500 border border-amber-200 px-2.5 py-1 rounded-full font-medium hover:bg-amber-50 transition-colors">
                        <Star className="w-2.5 h-2.5" />
                        Rate
                      </button>
                    )}
                    {appt.status === "cancelled" && (
                      <button className="text-[10px] text-teal-600 border border-teal-200 px-2.5 py-1 rounded-full font-medium hover:bg-teal-50 transition-colors">
                        Rebook
                      </button>
                    )}
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </UserAppLayout>
  );
}

/**
 * UserServices - Browse and search services/salons
 * Design: Mobile-first, search + filter + card grid
 */
import UserAppLayout from "@/components/UserAppLayout";
import { Link } from "wouter";
import { Search, SlidersHorizontal, Star, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const services = [
  { id: 1, name: "Haircut & Styling", category: "Hair", price: 35, duration: "45 min", rating: 4.8, salon: "Luxe Hair Studio", image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&q=80" },
  { id: 2, name: "Full Facial Treatment", category: "Skin", price: 65, duration: "60 min", rating: 4.9, salon: "Glow Beauty Lounge", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80" },
  { id: 3, name: "Manicure & Pedicure", category: "Nails", price: 50, duration: "75 min", rating: 4.7, salon: "The Style Bar", image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80" },
  { id: 4, name: "Hair Color & Highlights", category: "Hair", price: 120, duration: "120 min", rating: 4.8, salon: "Luxe Hair Studio", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80" },
  { id: 5, name: "Bridal Makeup", category: "Makeup", price: 200, duration: "90 min", rating: 5.0, salon: "Glow Beauty Lounge", image: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=400&q=80" },
  { id: 6, name: "Deep Tissue Massage", category: "Spa", price: 80, duration: "60 min", rating: 4.9, salon: "Zen Wellness Spa", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80" },
];

const filters = ["All", "Hair", "Skin", "Nails", "Makeup", "Spa"];

export default function UserServices() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = services.filter((s) => {
    const matchesFilter = activeFilter === "All" || s.category === activeFilter;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.salon.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <UserAppLayout title="Explore Services" showBack>
      {/* Search Bar */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2.5">
            <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search services, salons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
            />
          </div>
          <button className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeFilter === f
                ? "bg-teal-600 text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="px-4 grid grid-cols-2 gap-3 pb-4">
        {filtered.map((service) => (
          <Link key={service.id} href={`/user/service/${service.id}`}>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow">
              <div className="relative h-28">
                <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-1.5 py-0.5 flex items-center gap-0.5">
                  <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                  <span className="text-[10px] font-bold text-gray-700">{service.rating}</span>
                </div>
              </div>
              <div className="p-2.5">
                <h4 className="text-xs font-semibold text-gray-900 leading-tight line-clamp-2">{service.name}</h4>
                <p className="text-[10px] text-gray-500 mt-0.5 truncate">{service.salon}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-0.5 text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span className="text-[10px]">{service.duration}</span>
                  </div>
                  <span className="text-xs font-bold text-teal-600">${service.price}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </UserAppLayout>
  );
}

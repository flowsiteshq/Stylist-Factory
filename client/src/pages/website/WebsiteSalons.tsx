import WebsiteLayout from "@/components/WebsiteLayout";
import { Star, MapPin, Clock, Search, Filter } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

const salons = [
  { id: 1, name: "Luxe Hair Studio", city: "New York, NY", rating: 4.9, reviews: 312, services: ["Hair", "Color", "Styling"], price: "$$", hours: "9am–8pm", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80", badge: "Top Rated" },
  { id: 2, name: "Glow Beauty Lounge", city: "Los Angeles, CA", rating: 4.8, reviews: 198, services: ["Facial", "Waxing", "Makeup"], price: "$$$", hours: "10am–7pm", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80", badge: "Popular" },
  { id: 3, name: "The Style Bar", city: "Chicago, IL", rating: 4.7, reviews: 145, services: ["Nails", "Pedicure", "Gel"], price: "$$", hours: "9am–6pm", image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80", badge: null },
  { id: 4, name: "Zen Wellness Spa", city: "Miami, FL", rating: 4.9, reviews: 220, services: ["Massage", "Spa", "Facial"], price: "$$$", hours: "8am–9pm", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80", badge: "New" },
  { id: 5, name: "Urban Cuts", city: "Seattle, WA", rating: 4.6, reviews: 87, services: ["Barber", "Beard", "Fades"], price: "$", hours: "10am–7pm", image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80", badge: null },
  { id: 6, name: "The Beauty Lab", city: "Austin, TX", rating: 4.8, reviews: 178, services: ["Skincare", "Lashes", "Brows"], price: "$$", hours: "9am–7pm", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80", badge: "Featured" },
];

export default function WebsiteSalons() {
  const [search, setSearch] = useState("");

  const filtered = salons.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <WebsiteLayout>
      <section className="bg-gradient-to-br from-teal-800 to-teal-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-3">Find a Salon Near You</h1>
          <p className="text-teal-100 mb-8">Browse top-rated salons in your city</p>
          <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-3 shadow-lg max-w-lg mx-auto">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by salon name or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm text-gray-700 outline-none placeholder-gray-400"
            />
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((salon) => (
              <div key={salon.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <img src={salon.image} alt={salon.name} className="w-full h-48 object-cover" />
                  {salon.badge && (
                    <span className="absolute top-3 left-3 bg-teal-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {salon.badge}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900">{salon.name}</h3>
                      <div className="flex items-center gap-1 text-gray-400 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        <span className="text-xs">{salon.city}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-bold text-gray-800">{salon.rating}</span>
                    </div>
                  </div>
                  <div className="flex gap-1.5 flex-wrap mt-3">
                    {salon.services.map((s) => (
                      <span key={s} className="text-[10px] font-medium bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full">{s}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1 text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span className="text-xs">{salon.hours}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{salon.price}</span>
                  </div>
                  <Link href="/user/home">
                    <button className="w-full mt-4 bg-teal-600 text-white font-semibold py-2.5 rounded-xl hover:bg-teal-700 transition-colors text-sm">
                      Book Now
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </WebsiteLayout>
  );
}

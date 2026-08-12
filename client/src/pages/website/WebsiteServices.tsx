import WebsiteLayout from "@/components/WebsiteLayout";
import { Link } from "wouter";
import { Star, Clock, ArrowRight } from "lucide-react";

const serviceCategories = [
  {
    name: "Hair Care",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80",
    services: [
      { name: "Haircut & Styling", duration: "45 min", price: "$25–$60", rating: 4.8 },
      { name: "Hair Coloring", duration: "90 min", price: "$60–$150", rating: 4.9 },
      { name: "Balayage", duration: "120 min", price: "$100–$200", rating: 4.9 },
      { name: "Keratin Treatment", duration: "120 min", price: "$150–$300", rating: 4.7 },
    ],
  },
  {
    name: "Skin & Facial",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80",
    services: [
      { name: "Classic Facial", duration: "60 min", price: "$45–$80", rating: 4.8 },
      { name: "Chemical Peel", duration: "45 min", price: "$60–$120", rating: 4.7 },
      { name: "Microdermabrasion", duration: "60 min", price: "$80–$150", rating: 4.8 },
      { name: "LED Light Therapy", duration: "30 min", price: "$40–$70", rating: 4.6 },
    ],
  },
  {
    name: "Nails",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80",
    services: [
      { name: "Classic Manicure", duration: "30 min", price: "$20–$35", rating: 4.7 },
      { name: "Gel Manicure", duration: "45 min", price: "$35–$55", rating: 4.8 },
      { name: "Pedicure", duration: "45 min", price: "$30–$50", rating: 4.7 },
      { name: "Nail Art", duration: "60 min", price: "$40–$80", rating: 4.9 },
    ],
  },
  {
    name: "Spa & Wellness",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80",
    services: [
      { name: "Swedish Massage", duration: "60 min", price: "$60–$100", rating: 4.9 },
      { name: "Deep Tissue Massage", duration: "60 min", price: "$70–$120", rating: 4.8 },
      { name: "Hot Stone Massage", duration: "75 min", price: "$80–$130", rating: 4.9 },
      { name: "Aromatherapy", duration: "60 min", price: "$65–$110", rating: 4.8 },
    ],
  },
];

export default function WebsiteServices() {
  return (
    <WebsiteLayout>
      <section className="bg-gradient-to-br from-teal-800 to-teal-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-3">Our Services</h1>
          <p className="text-teal-100">Explore hundreds of beauty and wellness services from top professionals</p>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {serviceCategories.map((cat) => (
            <div key={cat.name}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-gray-900">{cat.name}</h2>
                <Link href="/user/home">
                  <span className="text-sm text-teal-600 font-medium flex items-center gap-1 hover:underline cursor-pointer">
                    Book Now <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {cat.services.map((service) => (
                  <div key={service.name} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-900 text-sm">{service.name}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1 text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs">{service.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-semibold text-gray-700">{service.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-teal-600 mt-3">{service.price}</p>
                    <Link href="/user/home">
                      <button className="w-full mt-3 bg-teal-50 text-teal-700 font-semibold py-2 rounded-xl hover:bg-teal-100 transition-colors text-xs">
                        Book This Service
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </WebsiteLayout>
  );
}

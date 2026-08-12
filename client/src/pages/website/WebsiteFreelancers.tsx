import WebsiteLayout from "@/components/WebsiteLayout";
import { Star, MapPin, Scissors, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const freelancers = [
  { id: 1, name: "Maria Rodriguez", specialty: "Hair Colorist", city: "New York, NY", rating: 4.9, reviews: 128, price: "$60/hr", image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=300&q=80", tags: ["Balayage", "Color", "Highlights"] },
  { id: 2, name: "David Kim", specialty: "Master Barber", city: "Los Angeles, CA", rating: 4.8, reviews: 95, price: "$45/hr", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80", tags: ["Fades", "Beard", "Classic Cuts"] },
  { id: 3, name: "Priya Sharma", specialty: "Makeup Artist", city: "Chicago, IL", rating: 5.0, reviews: 212, price: "$80/hr", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&q=80", tags: ["Bridal", "Editorial", "Glam"] },
  { id: 4, name: "James Carter", specialty: "Nail Technician", city: "Miami, FL", rating: 4.7, reviews: 76, price: "$40/hr", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80", tags: ["Gel", "Acrylics", "Nail Art"] },
  { id: 5, name: "Sophie Laurent", specialty: "Esthetician", city: "Seattle, WA", rating: 4.9, reviews: 143, price: "$70/hr", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80", tags: ["Facials", "Waxing", "Skincare"] },
  { id: 6, name: "Marcus Webb", specialty: "Hair Stylist", city: "Austin, TX", rating: 4.8, reviews: 89, price: "$55/hr", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80", tags: ["Cuts", "Blowouts", "Styling"] },
];

const perks = [
  "Set your own schedule and rates",
  "Access to thousands of clients",
  "Secure, on-time payments",
  "Profile and portfolio showcase",
  "Booking management tools",
  "24/7 support",
];

export default function WebsiteFreelancers() {
  return (
    <WebsiteLayout>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-teal-900 to-teal-700 py-20">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1600&q=80" alt="Freelancers" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Find Top Freelance Stylists</h1>
            <p className="text-teal-100 text-lg mb-8">Book independent beauty professionals for home visits, events, and more.</p>
            <div className="flex gap-3">
              <Link href="/user/home">
                <button className="bg-white text-teal-700 font-semibold px-6 py-3 rounded-xl hover:bg-teal-50 transition-colors">
                  Book a Freelancer
                </button>
              </Link>
              <Link href="/login">
                <button className="bg-white/10 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors border border-white/30">
                  Join as Freelancer
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Freelancer Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Freelancers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {freelancers.map((f) => (
              <div key={f.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <img src={f.image} alt={f.name} className="w-full h-48 object-cover" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-xl px-2.5 py-1 flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-gray-800">{f.rating}</span>
                    <span className="text-xs text-gray-400">({f.reviews})</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900">{f.name}</h3>
                  <p className="text-sm text-teal-600 font-medium mt-0.5">{f.specialty}</p>
                  <div className="flex items-center gap-1 text-gray-400 mt-1.5">
                    <MapPin className="w-3 h-3" />
                    <span className="text-xs">{f.city}</span>
                  </div>
                  <div className="flex gap-1.5 flex-wrap mt-3">
                    {f.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm font-bold text-gray-900">{f.price}</span>
                    <Link href="/user/home">
                      <button className="text-xs font-semibold bg-teal-600 text-white px-4 py-2 rounded-xl hover:bg-teal-700 transition-colors">
                        Book Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join as Freelancer CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-3xl p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">Become a Freelance Stylist</h2>
              <p className="text-teal-100 mb-6">Join our network of independent beauty professionals and grow your client base.</p>
              <ul className="space-y-2 mb-8">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-2 text-teal-100 text-sm">
                    <CheckCircle className="w-4 h-4 text-teal-300 flex-shrink-0" />
                    {perk}
                  </li>
                ))}
              </ul>
              <Link href="/login">
                <button className="flex items-center gap-2 bg-white text-teal-700 font-semibold px-6 py-3 rounded-xl hover:bg-teal-50 transition-colors">
                  Apply Now <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80" alt="Freelancer" className="rounded-2xl w-full h-64 object-cover shadow-lg" />
            </div>
          </div>
        </div>
      </section>
    </WebsiteLayout>
  );
}

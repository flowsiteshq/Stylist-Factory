/**
 * UserHome - Customer-facing home page
 * Design: Mobile-first, teal + white, card-based layout
 */
import UserAppLayout from "@/components/UserAppLayout";
import { Link } from "wouter";
import { Star, ChevronRight, Scissors, Sparkles, Wind, Brush, Droplets, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const categories = [
  { id: 1, name: "Hair Cut", icon: Scissors, color: "bg-teal-50 text-teal-600" },
  { id: 2, name: "Facial", icon: Sparkles, color: "bg-purple-50 text-purple-600" },
  { id: 3, name: "Blow Dry", icon: Wind, color: "bg-blue-50 text-blue-600" },
  { id: 4, name: "Makeup", icon: Brush, color: "bg-pink-50 text-pink-600" },
  { id: 5, name: "Spa", icon: Droplets, color: "bg-green-50 text-green-600" },
  { id: 6, name: "Nails", icon: Heart, color: "bg-rose-50 text-rose-600" },
];

const topSalons = [
  {
    id: 1,
    name: "Luxe Hair Studio",
    rating: 4.9,
    reviews: 312,
    distance: "0.4 mi",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80",
    tag: "Top Rated",
    price: "From $25",
  },
  {
    id: 2,
    name: "Glow Beauty Lounge",
    rating: 4.8,
    reviews: 198,
    distance: "0.8 mi",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80",
    tag: "Trending",
    price: "From $30",
  },
  {
    id: 3,
    name: "The Style Bar",
    rating: 4.7,
    reviews: 145,
    distance: "1.2 mi",
    image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&q=80",
    tag: "New",
    price: "From $20",
  },
];

const topOffers = [
  {
    id: 1,
    title: "20% off Hair Color",
    salon: "Luxe Hair Studio",
    expires: "Today only",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&q=80",
    discount: "20%",
  },
  {
    id: 2,
    title: "Free Conditioning",
    salon: "Glow Beauty Lounge",
    expires: "2 days left",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80",
    discount: "FREE",
  },
];

const topFreelancers = [
  {
    id: 1,
    name: "Sarah M.",
    specialty: "Hair Stylist",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=200&q=80",
  },
  {
    id: 2,
    name: "Jessica L.",
    specialty: "Makeup Artist",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=80",
  },
  {
    id: 3,
    name: "Priya K.",
    specialty: "Nail Technician",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80",
  },
  {
    id: 4,
    name: "Maria R.",
    specialty: "Esthetician",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
  },
];

export default function UserHome() {
  return (
    <UserAppLayout showSearch showNotification>
      {/* Hero Banner */}
      <div className="relative mx-4 mt-4 rounded-2xl overflow-hidden h-36">
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80"
          alt="Salon"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 to-transparent flex flex-col justify-center px-5">
          <p className="text-teal-200 text-xs font-medium mb-1">Welcome back, Alex!</p>
          <h2 className="text-white text-lg font-bold leading-tight">
            Book your next<br />beauty session
          </h2>
          <Link href="/user/services">
            <button className="mt-2 bg-white text-teal-700 text-xs font-semibold px-4 py-1.5 rounded-full w-fit hover:bg-teal-50 transition-colors">
              Explore Now
            </button>
          </Link>
        </div>
      </div>

      {/* Categories */}
      <section className="px-4 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Categories</h3>
          <Link href="/user/categories">
            <span className="text-xs text-teal-600 font-medium flex items-center gap-0.5">
              See all <ChevronRight className="w-3 h-3" />
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link key={cat.id} href={`/user/category/${cat.id}`}>
                <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
                  <div className={`w-11 h-11 rounded-2xl ${cat.color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] text-gray-600 font-medium text-center leading-tight">{cat.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Top Offers */}
      <section className="mt-5">
        <div className="flex items-center justify-between px-4 mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Top Offers</h3>
          <Link href="/user/offers">
            <span className="text-xs text-teal-600 font-medium flex items-center gap-0.5">
              See all <ChevronRight className="w-3 h-3" />
            </span>
          </Link>
        </div>
        <div className="flex gap-3 px-4 overflow-x-auto pb-1 scrollbar-hide">
          {topOffers.map((offer) => (
            <Link key={offer.id} href={`/user/offer/${offer.id}`}>
              <div className="min-w-[200px] rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white cursor-pointer hover:shadow-md transition-shadow">
                <div className="relative h-24">
                  <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {offer.discount} OFF
                  </div>
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-semibold text-gray-900">{offer.title}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{offer.salon}</p>
                  <p className="text-[10px] text-red-500 font-medium mt-1">{offer.expires}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Salons Near You */}
      <section className="mt-5">
        <div className="flex items-center justify-between px-4 mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Salons Near You</h3>
          <Link href="/user/salons">
            <span className="text-xs text-teal-600 font-medium flex items-center gap-0.5">
              See all <ChevronRight className="w-3 h-3" />
            </span>
          </Link>
        </div>
        <div className="px-4 flex flex-col gap-3">
          {topSalons.map((salon) => (
            <Link key={salon.id} href={`/user/salon/${salon.id}`}>
              <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex cursor-pointer hover:shadow-md transition-shadow">
                <img src={salon.image} alt={salon.name} className="w-24 h-24 object-cover flex-shrink-0" />
                <div className="p-3 flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="text-sm font-semibold text-gray-900 truncate">{salon.name}</h4>
                    <Badge variant="secondary" className="text-[9px] px-1.5 py-0 bg-teal-50 text-teal-700 flex-shrink-0">
                      {salon.tag}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-semibold text-gray-700">{salon.rating}</span>
                    <span className="text-[10px] text-gray-400">({salon.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-gray-500">{salon.distance} away</span>
                    <span className="text-xs font-semibold text-teal-600">{salon.price}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Freelancers */}
      <section className="mt-5 mb-4">
        <div className="flex items-center justify-between px-4 mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Top Specialists</h3>
          <Link href="/user/freelancers">
            <span className="text-xs text-teal-600 font-medium flex items-center gap-0.5">
              See all <ChevronRight className="w-3 h-3" />
            </span>
          </Link>
        </div>
        <div className="flex gap-3 px-4 overflow-x-auto pb-1 scrollbar-hide">
          {topFreelancers.map((fl) => (
            <Link key={fl.id} href={`/user/specialist/${fl.id}`}>
              <div className="min-w-[80px] flex flex-col items-center gap-1.5 cursor-pointer">
                <div className="relative">
                  <img
                    src={fl.image}
                    alt={fl.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-amber-400 rounded-full px-1 py-0.5 flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 text-white fill-white" />
                    <span className="text-[9px] text-white font-bold">{fl.rating}</span>
                  </div>
                </div>
                <p className="text-[10px] font-semibold text-gray-800 text-center">{fl.name}</p>
                <p className="text-[9px] text-gray-500 text-center leading-tight">{fl.specialty}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </UserAppLayout>
  );
}

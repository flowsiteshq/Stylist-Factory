/**
 * WebsiteHome - Marketing website landing page
 * Design: Bold hero, feature sections, testimonials, CTA
 */
import WebsiteLayout from "@/components/WebsiteLayout";
import { Link } from "wouter";
import { Star, ArrowRight, CheckCircle, Smartphone, BarChart2, Calendar, Shield, Scissors, Sparkles, Wind } from "lucide-react";

const stats = [
  { value: "10,000+", label: "Happy Customers" },
  { value: "500+", label: "Partner Salons" },
  { value: "50+", label: "Cities" },
  { value: "4.9★", label: "App Rating" },
];

const features = [
  { icon: Calendar, title: "Easy Booking", desc: "Book appointments at your favorite salons in seconds. Real-time availability, instant confirmation.", color: "text-teal-600 bg-teal-50" },
  { icon: Smartphone, title: "Mobile App", desc: "Manage everything from our beautiful mobile app. Available on iOS and Android.", color: "text-blue-600 bg-blue-50" },
  { icon: BarChart2, title: "Analytics Dashboard", desc: "Salon owners get powerful insights into revenue, bookings, and customer trends.", color: "text-purple-600 bg-purple-50" },
  { icon: Shield, title: "Secure Payments", desc: "All transactions are encrypted and secure. Multiple payment methods supported.", color: "text-green-600 bg-green-50" },
];

const categories = [
  { name: "Hair Care", icon: Scissors, count: "1,200+ services", image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&q=80" },
  { name: "Skin & Facial", icon: Sparkles, count: "800+ services", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80" },
  { name: "Nails", icon: Sparkles, count: "600+ services", image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80" },
  { name: "Spa & Wellness", icon: Wind, count: "400+ services", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80" },
];

const testimonials = [
  { name: "Sarah M.", role: "Regular Customer", text: "StylistFactory completely changed how I book my salon appointments. So easy and reliable!", rating: 5, image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=100&q=80" },
  { name: "Emma Wilson", role: "Salon Owner", text: "Since joining StylistFactory, my bookings have increased by 40%. The dashboard is incredibly powerful.", rating: 5, image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&q=80" },
  { name: "James K.", role: "Freelance Stylist", text: "As a freelance stylist, this platform helped me build a solid client base. Highly recommend!", rating: 5, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" },
];

export default function WebsiteHome() {
  return (
    <WebsiteLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-900 via-teal-800 to-teal-700 min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80"
            alt="Salon"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-teal-200 text-sm font-medium px-4 py-2 rounded-full mb-6 border border-white/20">
              <Sparkles className="w-4 h-4" />
              #1 Beauty Booking Platform
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Book Your Perfect<br />
              <span className="text-teal-300">Beauty Experience</span>
            </h1>
            <p className="text-lg text-teal-100 mt-5 leading-relaxed max-w-xl">
              Discover top-rated salons, book appointments instantly, and manage your beauty routine — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link href="/user/home">
                <button className="flex items-center justify-center gap-2 bg-white text-teal-700 font-semibold px-6 py-3.5 rounded-xl hover:bg-teal-50 transition-colors shadow-lg">
                  Book an Appointment
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/login">
                <button className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/20 transition-colors border border-white/30">
                  List Your Salon
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mt-12">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-teal-300 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Browse by Category</h2>
            <p className="text-gray-500 mt-2">Find the perfect service for every beauty need</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link key={cat.name} href="/website/services">
                <div className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-shadow">
                  <img src={cat.image} alt={cat.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                    <h3 className="text-white font-semibold">{cat.name}</h3>
                    <p className="text-gray-300 text-xs mt-0.5">{cat.count}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose StylistFactory?</h2>
            <p className="text-gray-500 mt-2">Everything you need to manage your beauty business or bookings</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div key={feat.title} className="p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feat.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">What Our Community Says</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.image} alt={t.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Ready to Transform Your Beauty Business?</h2>
          <p className="text-teal-100 mb-8">Join thousands of salons and stylists already growing with StylistFactory</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/login">
              <button className="bg-white text-teal-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-teal-50 transition-colors shadow-lg">
                Register Your Salon
              </button>
            </Link>
            <Link href="/user/home">
              <button className="bg-teal-700 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-teal-800 transition-colors border border-teal-500">
                Book as Customer
              </button>
            </Link>
          </div>
        </div>
      </section>
    </WebsiteLayout>
  );
}

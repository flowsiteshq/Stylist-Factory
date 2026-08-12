import WebsiteLayout from "@/components/WebsiteLayout";
import { Users, Target, Award, Heart } from "lucide-react";

const team = [
  { name: "Jessica Chen", role: "CEO & Co-Founder", image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=200&q=80" },
  { name: "Marcus Johnson", role: "CTO & Co-Founder", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80" },
  { name: "Priya Patel", role: "Head of Design", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80" },
  { name: "David Kim", role: "Head of Growth", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
];

const values = [
  { icon: Users, title: "Community First", desc: "We build for the community of stylists and customers who trust us every day.", color: "text-teal-600 bg-teal-50" },
  { icon: Target, title: "Innovation", desc: "Constantly improving our platform to deliver the best booking experience.", color: "text-blue-600 bg-blue-50" },
  { icon: Award, title: "Excellence", desc: "We hold ourselves to the highest standards in everything we do.", color: "text-purple-600 bg-purple-50" },
  { icon: Heart, title: "Passion", desc: "We're passionate about beauty, technology, and helping businesses grow.", color: "text-pink-600 bg-pink-50" },
];

export default function WebsiteAbout() {
  return (
    <WebsiteLayout>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-teal-800 to-teal-600 py-20">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1600&q=80" alt="About" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Story</h1>
          <p className="text-teal-100 text-lg leading-relaxed max-w-2xl mx-auto">
            StylistFactory was born from a simple idea: make beauty services accessible, transparent, and delightful for everyone.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We're on a mission to empower beauty professionals and delight customers by creating the most seamless salon booking experience in the world.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Founded in 2023, StylistFactory has grown to serve over 10,000 customers and 500 salons across 50 cities. We believe that great hair days, glowing skin, and beautiful nails should be accessible to everyone.
              </p>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80" alt="Mission" className="rounded-2xl shadow-lg w-full h-72 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${v.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-500">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Meet the Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <img src={member.image} alt={member.name} className="w-24 h-24 rounded-2xl object-cover mx-auto mb-3 shadow-md" />
                <h3 className="font-semibold text-gray-900 text-sm">{member.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </WebsiteLayout>
  );
}

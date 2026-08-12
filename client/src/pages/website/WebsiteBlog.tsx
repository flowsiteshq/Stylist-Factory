import WebsiteLayout from "@/components/WebsiteLayout";
import { Link } from "wouter";
import { Clock, User, ArrowRight } from "lucide-react";

const posts = [
  { id: 1, title: "Top 10 Hair Trends for Summer 2026", category: "Hair", date: "May 5, 2026", readTime: "5 min", author: "Sarah M.", image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80", excerpt: "Discover the hottest hair trends that will dominate salons this summer, from bold colors to effortless waves." },
  { id: 2, title: "How to Choose the Right Facial for Your Skin Type", category: "Skin", date: "Apr 28, 2026", readTime: "7 min", author: "Dr. Priya K.", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80", excerpt: "Not all facials are created equal. Learn which treatment is best suited for your unique skin concerns." },
  { id: 3, title: "The Art of Nail Care: A Complete Guide", category: "Nails", date: "Apr 20, 2026", readTime: "6 min", author: "Jessica L.", image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80", excerpt: "From basic manicures to intricate nail art, here's everything you need to know about nail care." },
  { id: 4, title: "Growing Your Salon Business with Digital Tools", category: "Business", date: "Apr 15, 2026", readTime: "8 min", author: "Marcus J.", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80", excerpt: "How modern salon owners are using technology to streamline operations and boost revenue." },
  { id: 5, title: "Bridal Beauty: Your Complete Wedding Day Checklist", category: "Makeup", date: "Apr 8, 2026", readTime: "10 min", author: "Maria R.", image: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=600&q=80", excerpt: "Everything you need to plan the perfect bridal beauty experience from trial to the big day." },
  { id: 6, title: "The Benefits of Regular Spa Treatments", category: "Spa", date: "Apr 1, 2026", readTime: "5 min", author: "Emma W.", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80", excerpt: "Regular spa visits aren't just a luxury — they're an investment in your health and wellbeing." },
];

const categories = ["All", "Hair", "Skin", "Nails", "Makeup", "Spa", "Business"];

export default function WebsiteBlog() {
  return (
    <WebsiteLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-800 to-teal-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-3">Beauty & Business Blog</h1>
          <p className="text-teal-100">Tips, trends, and insights from the beauty industry</p>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap mb-8">
            {categories.map((cat) => (
              <button key={cat} className="px-4 py-2 rounded-xl text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:border-teal-400 hover:text-teal-600 transition-colors first:bg-teal-600 first:text-white first:border-teal-600">
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <img src={posts[0].image} alt={posts[0].title} className="w-full h-64 lg:h-full object-cover" />
              <div className="p-8 flex flex-col justify-center">
                <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full w-fit mb-3">{posts[0].category}</span>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{posts[0].title}</h2>
                <p className="text-gray-500 leading-relaxed mb-5">{posts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-5">
                  <span className="flex items-center gap-1"><User className="w-3 h-3" />{posts[0].author}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{posts[0].readTime} read</span>
                  <span>{posts[0].date}</span>
                </div>
                <button className="flex items-center gap-2 text-teal-600 font-semibold text-sm hover:gap-3 transition-all">
                  Read Article <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Post Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map((post) => (
              <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                <img src={post.image} alt={post.title} className="w-full h-44 object-cover" />
                <div className="p-5">
                  <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full">{post.category}</span>
                  <h3 className="font-semibold text-gray-900 mt-3 mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1"><User className="w-3 h-3" />{post.author}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </WebsiteLayout>
  );
}

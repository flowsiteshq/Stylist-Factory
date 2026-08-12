import WebsiteLayout from "@/components/WebsiteLayout";
import { Star, ShoppingCart, Search, Filter } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const products = [
  { id: 1, name: "Argan Oil Hair Serum", brand: "OGX", price: 14.99, rating: 4.7, reviews: 234, category: "Hair", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80", badge: "Bestseller" },
  { id: 2, name: "Vitamin C Brightening Serum", brand: "TruSkin", price: 24.99, rating: 4.8, reviews: 512, category: "Skin", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80", badge: "Top Rated" },
  { id: 3, name: "Gel Nail Polish Set", brand: "OPI", price: 39.99, rating: 4.6, reviews: 178, category: "Nails", image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&q=80", badge: null },
  { id: 4, name: "Hydrating Face Mask", brand: "Cetaphil", price: 18.99, rating: 4.9, reviews: 389, category: "Skin", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80", badge: "New" },
  { id: 5, name: "Professional Hair Dryer", brand: "Dyson", price: 199.99, rating: 4.9, reviews: 1024, category: "Tools", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80", badge: "Premium" },
  { id: 6, name: "Lavender Body Scrub", brand: "Tree Hut", price: 9.99, rating: 4.5, reviews: 267, category: "Spa", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80", badge: null },
  { id: 7, name: "Curl Defining Cream", brand: "SheaMoisture", price: 12.99, rating: 4.7, reviews: 198, category: "Hair", image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&q=80", badge: null },
  { id: 8, name: "Eyebrow Styling Kit", brand: "Anastasia", price: 29.99, rating: 4.8, reviews: 445, category: "Makeup", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80", badge: "Popular" },
];

const categories = ["All", "Hair", "Skin", "Nails", "Makeup", "Spa", "Tools"];

export default function WebsiteShop() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <WebsiteLayout>
      <section className="bg-gradient-to-br from-teal-800 to-teal-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-3">Beauty Shop</h1>
          <p className="text-teal-100 mb-8">Professional beauty products delivered to your door</p>
          <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-3 shadow-lg max-w-lg mx-auto">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm text-gray-700 outline-none placeholder-gray-400"
            />
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat ? "bg-teal-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-teal-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-44 object-cover" />
                  {product.badge && (
                    <span className="absolute top-2 left-2 bg-teal-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-[10px] text-gray-400 font-medium">{product.brand}</p>
                  <h3 className="text-sm font-semibold text-gray-900 mt-0.5 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-1 mt-1.5">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
                    <span className="text-xs text-gray-400">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-base font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <button
                      onClick={() => toast.success(`${product.name} added to cart!`)}
                      className="p-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
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

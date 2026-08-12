/*
  STYLIST FACTORY — Gallery Page
  Design: Masonry-style photo grid with category filter
*/

import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { mockGallery } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const categories = ["All", "Hair", "Makeup", "Men", "Nails"];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filtered = mockGallery.filter((g) =>
    activeCategory === "All" || g.category === activeCategory
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Gallery</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{mockGallery.length} photos</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white gap-2" onClick={() => toast.info("Upload photo feature coming soon")}>
          <Plus size={16} />Upload Photo
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
              activeCategory === cat
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map((photo) => (
          <div
            key={photo.id}
            className="relative group rounded-xl overflow-hidden aspect-square cursor-pointer"
            onClick={() => setSelectedImage(photo.url)}
          >
            <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
              <div className="p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 w-full">
                <p className="text-white text-xs font-medium">{photo.caption}</p>
                <p className="text-white/70 text-xs">{photo.category}</p>
              </div>
            </div>
            <button
              className="absolute top-2 right-2 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => { e.stopPropagation(); toast.error("Delete feature coming soon"); }}
            >
              <Trash2 size={12} className="text-white" />
            </button>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-4 right-4 text-white/70 hover:text-white">
            <X size={28} />
          </button>
          <img
            src={selectedImage}
            alt="Gallery"
            className="max-w-full max-h-full rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

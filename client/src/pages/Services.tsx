/*
  STYLIST FACTORY — Services Page
  Design: Service cards with image, price, toggle active/inactive
*/

import { useState } from "react";
import { Plus, Search, Clock, Tag, ToggleLeft, ToggleRight, Pencil, Trash2 } from "lucide-react";
import { mockServices } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function Services() {
  const [search, setSearch] = useState("");
  const [services, setServices] = useState(mockServices);

  const filtered = services.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  const toggleActive = (id: string) => {
    setServices((prev) =>
      prev.map((s) => s.id === id ? { ...s, isActive: !s.isActive } : s)
    );
    const svc = services.find((s) => s.id === id);
    toast.success(`${svc?.name} ${svc?.isActive ? "deactivated" : "activated"}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Services</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{services.filter(s => s.isActive).length} active services</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white gap-2" onClick={() => toast.info("Add service feature coming soon")}>
          <Plus size={16} />Add Service
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search services..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((svc) => (
          <Card key={svc.id} className={cn("border border-border/60 shadow-sm overflow-hidden transition-all", !svc.isActive && "opacity-60")}>
            <div className="h-36 overflow-hidden relative">
              <img src={svc.image} alt={svc.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2">
                <Badge className={cn("text-xs border-0", svc.isActive ? "bg-green-500 text-white" : "bg-gray-400 text-white")}>
                  {svc.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div className="absolute top-2 left-2">
                <Badge className="bg-white/90 text-foreground text-xs border-0">{svc.category}</Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground text-sm mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{svc.name}</h3>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{svc.description}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1"><Clock size={11} />{svc.duration} min</span>
                <span className="flex items-center gap-1"><Tag size={11} />{svc.bookingsCount} bookings</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-base font-bold text-primary">₹{svc.price.toLocaleString("en-IN")}</p>
                  {svc.discountPrice && (
                    <p className="text-xs text-muted-foreground line-through">₹{svc.discountPrice.toLocaleString("en-IN")}</p>
                  )}
                </div>
                <button onClick={() => toggleActive(svc.id)} className="text-muted-foreground hover:text-primary transition-colors">
                  {svc.isActive ? <ToggleRight size={24} className="text-primary" /> : <ToggleLeft size={24} />}
                </button>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 h-8 text-xs gap-1" onClick={() => toast.info("Edit feature coming soon")}>
                  <Pencil size={12} />Edit
                </Button>
                <Button size="sm" variant="outline" className="h-8 text-xs text-red-600 border-red-200 hover:bg-red-50" onClick={() => toast.error("Delete feature coming soon")}>
                  <Trash2 size={12} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

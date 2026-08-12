/*
  STYLIST FACTORY — Stylists Page
  Design: Stylist cards with avatar, rating, availability toggle
*/

import { useState } from "react";
import { Plus, Search, Star, Phone, Scissors, ToggleLeft, ToggleRight } from "lucide-react";
import { mockStylists } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function Stylists() {
  const [search, setSearch] = useState("");
  const [stylists, setStylists] = useState(mockStylists);

  const filtered = stylists.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.specialization.toLowerCase().includes(search.toLowerCase())
  );

  const toggleAvailability = (id: string) => {
    setStylists((prev) => prev.map((s) => s.id === id ? { ...s, isAvailable: !s.isAvailable } : s));
    const stylist = stylists.find((s) => s.id === id);
    toast.success(`${stylist?.name} marked as ${stylist?.isAvailable ? "unavailable" : "available"}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Stylists</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{stylists.filter(s => s.isAvailable).length} available stylists</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white gap-2" onClick={() => toast.info("Add stylist feature coming soon")}>
          <Plus size={16} />Add Stylist
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search stylists..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {filtered.map((stylist) => (
          <Card key={stylist.id} className="border border-border/60 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex flex-col items-center text-center mb-4">
                <div className="relative mb-3">
                  <img src={stylist.image} alt={stylist.name} className="w-20 h-20 rounded-full object-cover ring-2 ring-border" />
                  <span className={cn(
                    "absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white",
                    stylist.isAvailable ? "bg-green-500" : "bg-gray-400"
                  )} />
                </div>
                <h3 className="font-semibold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{stylist.fullName}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{stylist.specialization}</p>
                <div className="flex items-center gap-1 mt-1.5">
                  <Star size={12} className="text-amber-500 fill-amber-500" />
                  <span className="text-sm font-semibold text-foreground">{stylist.rating}</span>
                  <span className="text-xs text-muted-foreground">({stylist.totalAppointments})</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <Scissors size={11} />
                  <span>{stylist.experience} experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={11} />
                  <span>{stylist.phone}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {stylist.services.slice(0, 2).map((svc) => (
                  <Badge key={svc} variant="secondary" className="text-xs px-2 py-0.5">{svc}</Badge>
                ))}
                {stylist.services.length > 2 && (
                  <Badge variant="secondary" className="text-xs px-2 py-0.5">+{stylist.services.length - 2}</Badge>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className={cn("text-xs font-medium", stylist.isAvailable ? "text-green-600" : "text-gray-500")}>
                  {stylist.isAvailable ? "Available" : "Unavailable"}
                </span>
                <button onClick={() => toggleAvailability(stylist.id)} className="text-muted-foreground hover:text-primary transition-colors">
                  {stylist.isAvailable ? <ToggleRight size={22} className="text-primary" /> : <ToggleLeft size={22} />}
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

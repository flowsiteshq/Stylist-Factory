/*
  STYLIST FACTORY — Packages Page
  Design: Package cards with included services, savings badge
*/

import { useState } from "react";
import { Plus, Clock, Tag, Pencil, Trash2, CheckCircle } from "lucide-react";
import { mockPackages } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function Packages() {
  const [packages] = useState(mockPackages);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Packages</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{packages.filter(p => p.isActive).length} active packages</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white gap-2" onClick={() => toast.info("Add package feature coming soon")}>
          <Plus size={16} />Add Package
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {packages.map((pkg) => {
          const savings = pkg.originalPrice - pkg.packagePrice;
          const savingsPct = Math.round((savings / pkg.originalPrice) * 100);
          return (
            <Card key={pkg.id} className={cn("border border-border/60 shadow-sm overflow-hidden hover:shadow-md transition-shadow", !pkg.isActive && "opacity-60")}>
              <div className="h-40 overflow-hidden relative">
                <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-amber-500 text-white border-0 text-xs font-bold">
                    Save {savingsPct}%
                  </Badge>
                </div>
                <div className="absolute bottom-2 left-3 right-3">
                  <h3 className="font-bold text-white text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{pkg.name}</h3>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground mb-3">{pkg.description}</p>

                <div className="space-y-1.5 mb-4">
                  {pkg.services.map((svc) => (
                    <div key={svc} className="flex items-center gap-2 text-xs text-foreground">
                      <CheckCircle size={12} className="text-primary flex-shrink-0" />
                      {svc}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Clock size={11} />{pkg.duration} min</span>
                  <span className="flex items-center gap-1"><Tag size={11} />{pkg.bookingsCount} bookings</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-lg font-bold text-primary">₹{pkg.packagePrice.toLocaleString("en-IN")}</p>
                    <p className="text-xs text-muted-foreground line-through">₹{pkg.originalPrice.toLocaleString("en-IN")}</p>
                  </div>
                  <Badge className={cn("border-0 text-xs", pkg.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600")}>
                    {pkg.isActive ? "Active" : "Inactive"}
                  </Badge>
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
          );
        })}
      </div>
    </div>
  );
}

/*
  STYLIST FACTORY — Products Page
  Design: Product grid with stock indicator, sold count
*/

import { useState } from "react";
import { Plus, Search, ShoppingBag, AlertTriangle, Pencil } from "lucide-react";
import { mockProducts } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function Products() {
  const [search, setSearch] = useState("");
  const [products] = useState(mockProducts);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Products</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{products.filter(p => p.isActive).length} active products</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white gap-2" onClick={() => toast.info("Add product feature coming soon")}>
          <Plus size={16} />Add Product
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((product) => (
          <Card key={product.id} className={cn("border border-border/60 shadow-sm hover:shadow-md transition-shadow overflow-hidden", !product.isActive && "opacity-60")}>
            <div className="h-40 overflow-hidden bg-muted/30 flex items-center justify-center">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-semibold text-foreground text-sm leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{product.name}</h3>
                {product.stock === 0 && (
                  <AlertTriangle size={14} className="text-red-500 flex-shrink-0 mt-0.5" />
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
              <Badge variant="secondary" className="text-xs mb-3">{product.category}</Badge>

              <div className="flex items-center justify-between mb-3">
                <p className="text-base font-bold text-primary">₹{product.price.toLocaleString("en-IN")}</p>
                <div className="text-right">
                  <p className={cn("text-xs font-medium", product.stock === 0 ? "text-red-500" : product.stock < 10 ? "text-amber-600" : "text-green-600")}>
                    {product.stock === 0 ? "Out of stock" : `${product.stock} in stock`}
                  </p>
                  <p className="text-xs text-muted-foreground">{product.sold} sold</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 h-8 text-xs gap-1" onClick={() => toast.info("Edit feature coming soon")}>
                  <Pencil size={12} />Edit
                </Button>
                <Button size="sm" className="flex-1 h-8 text-xs bg-primary hover:bg-primary/90 text-white gap-1" onClick={() => toast.success("Stock updated!")}>
                  <ShoppingBag size={12} />Restock
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

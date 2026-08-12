/*
  STYLIST FACTORY — Slots / Timing Page
  Design: Time slot grid with booked/blocked/available states
*/

import { useState } from "react";
import { Clock, Lock, CheckCircle, Circle } from "lucide-react";
import { mockSlots } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function Slots() {
  const [slots, setSlots] = useState(mockSlots);

  const toggleBlock = (id: string) => {
    setSlots((prev) => prev.map((s) => {
      if (s.id === id && !s.isBooked) {
        toast.success(s.isBlocked ? "Slot unblocked" : "Slot blocked");
        return { ...s, isBlocked: !s.isBlocked };
      }
      return s;
    }));
  };

  const available = slots.filter((s) => !s.isBooked && !s.isBlocked).length;
  const booked = slots.filter((s) => s.isBooked).length;
  const blocked = slots.filter((s) => s.isBlocked && !s.isBooked).length;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Slots & Timing</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Manage your available time slots</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Available", value: available, color: "text-teal-600", bg: "bg-teal-50" },
          { label: "Booked", value: booked, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Blocked", value: blocked, color: "text-red-500", bg: "bg-red-50" },
        ].map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <p className={cn("text-2xl font-bold", stat.color)} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><Circle size={10} className="text-teal-500 fill-teal-500" />Available (click to block)</span>
        <span className="flex items-center gap-1.5"><CheckCircle size={10} className="text-amber-500 fill-amber-500" />Booked</span>
        <span className="flex items-center gap-1.5"><Lock size={10} className="text-red-400" />Blocked (click to unblock)</span>
      </div>

      {/* Slot Grid */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Today's Slots
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5">
            {slots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => toggleBlock(slot.id)}
                disabled={slot.isBooked}
                className={cn(
                  "flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all",
                  slot.isBooked
                    ? "bg-amber-50 border-amber-200 text-amber-700 cursor-not-allowed"
                    : slot.isBlocked
                    ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                    : "bg-teal-50 border-teal-200 text-teal-700 hover:bg-teal-100"
                )}
              >
                {slot.isBooked ? (
                  <CheckCircle size={14} className="text-amber-500 flex-shrink-0" />
                ) : slot.isBlocked ? (
                  <Lock size={14} className="text-red-400 flex-shrink-0" />
                ) : (
                  <Clock size={14} className="text-teal-500 flex-shrink-0" />
                )}
                <span style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{slot.time}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => toast.info("Add slot feature coming soon")}>
          Add Slot
        </Button>
        <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => toast.info("Block all feature coming soon")}>
          Block All Remaining
        </Button>
      </div>
    </div>
  );
}

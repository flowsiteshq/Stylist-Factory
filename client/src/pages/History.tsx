/*
  STYLIST FACTORY — History Page
  Design: Completed/cancelled appointment history with revenue summary
*/

import { Calendar, Clock, User, IndianRupee, TrendingUp } from "lucide-react";
import { mockAppointments } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const pastAppointments = mockAppointments.filter((a) => a.status === "completed" || a.status === "cancelled");

export default function History() {
  const totalRevenue = pastAppointments.filter(a => a.status === "completed").reduce((sum, a) => sum + a.amount, 0);
  const completedCount = pastAppointments.filter(a => a.status === "completed").length;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>History</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Past appointments and revenue</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="stat-card border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-teal-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-teal-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              ₹{totalRevenue.toLocaleString("en-IN")}
            </p>
            <p className="text-muted-foreground text-xs mt-0.5">Total Revenue Earned</p>
          </CardContent>
        </Card>
        <Card className="stat-card border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-green-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {completedCount}
            </p>
            <p className="text-muted-foreground text-xs mt-0.5">Completed Appointments</p>
          </CardContent>
        </Card>
        <Card className="stat-card border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-red-500" />
              </div>
            </div>
            <p className="text-2xl font-bold text-red-500" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {pastAppointments.filter(a => a.status === "cancelled").length}
            </p>
            <p className="text-muted-foreground text-xs mt-0.5">Cancelled Appointments</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Appointment History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pastAppointments.map((apt) => (
              <div key={apt.id} className="flex items-start gap-3 p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                <img src={apt.customerImage} alt={apt.customerName} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <p className="font-semibold text-sm text-foreground">{apt.customerName}</p>
                    <span className={cn("badge-pill flex-shrink-0",
                      apt.status === "completed" ? "status-completed" : "status-cancelled"
                    )}>
                      {apt.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{apt.service}</p>
                  <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar size={11} />{new Date(apt.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                    <span className="flex items-center gap-1"><Clock size={11} />{apt.time}</span>
                    <span className="flex items-center gap-1"><User size={11} />{apt.stylist}</span>
                    {apt.status === "completed" && (
                      <span className="flex items-center gap-1 text-primary font-semibold">
                        <IndianRupee size={11} />₹{apt.amount.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

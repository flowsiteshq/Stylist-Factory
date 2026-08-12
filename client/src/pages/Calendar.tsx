/*
  STYLIST FACTORY — Calendar Page
  Design: Month calendar view + appointment list for selected day
*/

import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, User } from "lucide-react";
import { mockAppointments } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function Calendar() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(today.toISOString().split("T")[0]);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  const getAppointmentsForDate = (dateStr: string) =>
    mockAppointments.filter((a) => a.date === dateStr);

  const hasAppointments = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return mockAppointments.some((a) => a.date === dateStr);
  };

  const selectedAppointments = getAppointmentsForDate(selectedDate);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Calendar</h1>
        <p className="text-muted-foreground text-sm mt-0.5">View and manage appointments by date</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {MONTHS[currentMonth]} {currentYear}
              </CardTitle>
              <div className="flex gap-1">
                <button onClick={prevMonth} className="p-1.5 rounded-md hover:bg-muted transition-colors">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={nextMonth} className="p-1.5 rounded-md hover:bg-muted transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 mb-2">
              {DAYS.map((d) => (
                <div key={d} className="text-center text-xs font-medium text-muted-foreground py-1">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const isToday = dateStr === today.toISOString().split("T")[0];
                const isSelected = dateStr === selectedDate;
                const hasApts = hasAppointments(day);
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(dateStr)}
                    className={cn(
                      "relative h-9 w-full rounded-lg text-sm font-medium transition-all",
                      isSelected ? "bg-primary text-white" : isToday ? "bg-primary/10 text-primary" : "hover:bg-muted text-foreground"
                    )}
                  >
                    {day}
                    {hasApts && !isSelected && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Appointments for selected day */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedAppointments.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p className="font-medium">No appointments</p>
                <p className="text-sm">Select a date with appointments</p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedAppointments.map((apt) => (
                  <div key={apt.id} className="flex gap-3 p-3 bg-muted/30 rounded-lg">
                    <img src={apt.customerImage} alt={apt.customerName} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground">{apt.customerName}</p>
                      <p className="text-xs text-muted-foreground">{apt.service}</p>
                      <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock size={11} />{apt.time}</span>
                        <span className="flex items-center gap-1"><User size={11} />{apt.stylist}</span>
                      </div>
                    </div>
                    <span className={cn("badge-pill self-start",
                      apt.status === "confirmed" ? "status-confirmed" :
                      apt.status === "pending" ? "status-pending" :
                      apt.status === "completed" ? "status-completed" : "status-cancelled"
                    )}>
                      {apt.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/**
 * UserBooking - Service booking flow: select stylist, date, slot, confirm
 */
import UserAppLayout from "@/components/UserAppLayout";
import { Link } from "wouter";
import { Star, Clock, ChevronRight, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const stylists = [
  { id: 1, name: "Sarah Mitchell", specialty: "Hair Stylist", rating: 4.9, image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=200&q=80" },
  { id: 2, name: "Jessica Lee", specialty: "Color Specialist", rating: 4.8, image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=80" },
  { id: 3, name: "Any Available", specialty: "Best match", rating: null, image: "" },
];

const timeSlots = [
  { id: 1, time: "9:00 AM", available: true },
  { id: 2, time: "10:00 AM", available: true },
  { id: 3, time: "11:00 AM", available: false },
  { id: 4, time: "12:00 PM", available: true },
  { id: 5, time: "1:00 PM", available: false },
  { id: 6, time: "2:00 PM", available: true },
  { id: 7, time: "3:00 PM", available: true },
  { id: 8, time: "4:00 PM", available: true },
  { id: 9, time: "5:00 PM", available: false },
];

const days = [
  { day: "Mon", date: "12" },
  { day: "Tue", date: "13" },
  { day: "Wed", date: "14" },
  { day: "Thu", date: "15" },
  { day: "Fri", date: "16" },
  { day: "Sat", date: "17" },
  { day: "Sun", date: "18" },
];

export default function UserBooking() {
  const [selectedStylist, setSelectedStylist] = useState(0);
  const [selectedDay, setSelectedDay] = useState(2);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const handleBook = () => {
    if (!selectedSlot) {
      toast.error("Please select a time slot");
      return;
    }
    toast.success("Booking confirmed! Check your appointments.");
  };

  return (
    <UserAppLayout title="Book Appointment" showBack>
      {/* Service Summary */}
      <div className="mx-4 mt-4 bg-teal-50 rounded-xl p-3 flex items-center gap-3">
        <img
          src="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=200&q=80"
          alt="Service"
          className="w-14 h-14 rounded-lg object-cover"
        />
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Haircut & Styling</h3>
          <p className="text-xs text-gray-500">Luxe Hair Studio</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-teal-700 font-semibold">$35</span>
            <div className="flex items-center gap-1 text-gray-400">
              <Clock className="w-3 h-3" />
              <span className="text-xs">45 min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Select Stylist */}
      <section className="px-4 mt-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Choose Stylist</h3>
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
          {stylists.map((stylist, idx) => (
            <button
              key={stylist.id}
              onClick={() => setSelectedStylist(idx)}
              className={`flex-shrink-0 flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 transition-all min-w-[80px] ${
                selectedStylist === idx
                  ? "border-teal-500 bg-teal-50"
                  : "border-gray-100 bg-white"
              }`}
            >
              {stylist.image ? (
                <img src={stylist.image} alt={stylist.name} className="w-12 h-12 rounded-xl object-cover" />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 text-lg">?</div>
              )}
              <p className="text-[10px] font-semibold text-gray-800 text-center leading-tight">{stylist.name.split(" ")[0]}</p>
              {stylist.rating && (
                <div className="flex items-center gap-0.5">
                  <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                  <span className="text-[9px] text-gray-600">{stylist.rating}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Select Date */}
      <section className="px-4 mt-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Select Date</h3>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {days.map((d, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedDay(idx)}
              className={`flex-shrink-0 flex flex-col items-center gap-1 px-3 py-2.5 rounded-xl transition-all ${
                selectedDay === idx
                  ? "bg-teal-600 text-white"
                  : "bg-white border border-gray-200 text-gray-600"
              }`}
            >
              <span className="text-[10px] font-medium">{d.day}</span>
              <span className="text-sm font-bold">{d.date}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Select Time Slot */}
      <section className="px-4 mt-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Select Time</h3>
        <div className="grid grid-cols-3 gap-2">
          {timeSlots.map((slot) => (
            <button
              key={slot.id}
              disabled={!slot.available}
              onClick={() => slot.available && setSelectedSlot(slot.id)}
              className={`py-2 rounded-xl text-xs font-medium transition-all ${
                !slot.available
                  ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                  : selectedSlot === slot.id
                  ? "bg-teal-600 text-white"
                  : "bg-white border border-gray-200 text-gray-700 hover:border-teal-300"
              }`}
            >
              {slot.time}
            </button>
          ))}
        </div>
      </section>

      {/* Add-ons */}
      <section className="px-4 mt-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">Add-ons</h3>
          <Link href="/user/addons">
            <span className="text-xs text-teal-600 font-medium flex items-center gap-0.5">
              Add <ChevronRight className="w-3 h-3" />
            </span>
          </Link>
        </div>
        <p className="text-xs text-gray-400 mt-1">No add-ons selected</p>
      </section>

      {/* Price Summary */}
      <div className="mx-4 mt-5 bg-gray-50 rounded-xl p-3 space-y-2">
        <div className="flex justify-between text-xs text-gray-600">
          <span>Haircut & Styling</span>
          <span>$35.00</span>
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          <span>Service fee</span>
          <span>$2.50</span>
        </div>
        <div className="border-t border-gray-200 pt-2 flex justify-between text-sm font-semibold text-gray-900">
          <span>Total</span>
          <span>$37.50</span>
        </div>
      </div>

      {/* Book Button */}
      <div className="px-4 mt-5 mb-6">
        <button
          onClick={handleBook}
          className="w-full bg-teal-600 text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-teal-700 transition-colors"
        >
          Confirm Booking
        </button>
      </div>
    </UserAppLayout>
  );
}

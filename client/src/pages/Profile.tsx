/*
  STYLIST FACTORY — Profile Page
  Design: Owner profile with salon info, edit form, settings
*/

import { useState } from "react";
import { Camera, MapPin, Phone, Mail, Star, CheckCircle, Edit3, Save, X } from "lucide-react";
import { mockOwner } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [owner, setOwner] = useState(mockOwner);
  const [form, setForm] = useState(mockOwner);

  const handleSave = () => {
    setOwner(form);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setForm(owner);
    setIsEditing(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Profile</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Manage your salon and account details</p>
        </div>
        {!isEditing ? (
          <Button variant="outline" className="gap-2" onClick={() => setIsEditing(true)}>
            <Edit3 size={15} />Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button className="bg-primary hover:bg-primary/90 text-white gap-2" onClick={handleSave}>
              <Save size={15} />Save
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              <X size={15} />
            </Button>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start gap-5">
            <div className="relative flex-shrink-0">
              <img
                src={owner.profileImage}
                alt={owner.name}
                className="w-20 h-20 rounded-2xl object-cover ring-2 ring-border"
              />
              <button
                className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-md"
                onClick={() => toast.info("Photo upload coming soon")}
              >
                <Camera size={13} className="text-white" />
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {owner.name}
                </h2>
                {owner.isVerified && (
                  <Badge className="bg-teal-100 text-teal-800 border-0 gap-1 text-xs">
                    <CheckCircle size={11} />Verified
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground text-sm mt-0.5">{owner.salonName}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1"><MapPin size={13} />{owner.city}</span>
                <span className="flex items-center gap-1"><Star size={13} className="text-amber-500 fill-amber-500" />{owner.rating} ({owner.totalReviews} reviews)</span>
                <span className="text-xs">Member since {new Date(owner.joinedDate).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Salon Information */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Salon Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Owner Name</Label>
              {isEditing ? (
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              ) : (
                <p className="text-sm text-foreground py-2">{owner.name}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Salon Name</Label>
              {isEditing ? (
                <Input value={form.salonName} onChange={(e) => setForm({ ...form, salonName: e.target.value })} />
              ) : (
                <p className="text-sm text-foreground py-2">{owner.salonName}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium flex items-center gap-1.5"><Phone size={13} />Phone Number</Label>
              {isEditing ? (
                <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              ) : (
                <p className="text-sm text-foreground py-2">{owner.phone}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium flex items-center gap-1.5"><Mail size={13} />Email</Label>
              {isEditing ? (
                <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              ) : (
                <p className="text-sm text-foreground py-2">{owner.email}</p>
              )}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium flex items-center gap-1.5"><MapPin size={13} />Address</Label>
            {isEditing ? (
              <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            ) : (
              <p className="text-sm text-foreground py-2">{owner.address}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: "Push Notifications", desc: "Receive alerts for new appointments" },
            { label: "Email Notifications", desc: "Get daily summary via email" },
            { label: "SMS Alerts", desc: "SMS for appointment reminders" },
            { label: "Auto-confirm Appointments", desc: "Automatically confirm new bookings" },
          ].map((setting) => (
            <div key={setting.label} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
              <div>
                <p className="text-sm font-medium text-foreground">{setting.label}</p>
                <p className="text-xs text-muted-foreground">{setting.desc}</p>
              </div>
              <button
                className="w-10 h-5 rounded-full bg-primary relative transition-colors"
                onClick={() => toast.info("Settings feature coming soon")}
              >
                <span className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
              </button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border border-red-100 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-red-600" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Change Password</p>
              <p className="text-xs text-muted-foreground">Update your account password</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => toast.info("Change password feature coming soon")}>Change</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Delete Account</p>
              <p className="text-xs text-muted-foreground">Permanently delete your salon account</p>
            </div>
            <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => toast.error("Please contact support to delete your account")}>Delete</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

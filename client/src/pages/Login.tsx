/*
  STYLIST FACTORY — Login Page
  Design: Split-screen layout, salon hero image on left, login form on right
  Colors: Teal primary, white form area
*/

import { useState } from "react";
import { useLocation } from "wouter";
import { Scissors, Eye, EyeOff, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031545745/kEq3fEERX94fKEfXVmN4QL/salon_hero-bZycj5iiUQfcXRzJFGX59c.webp";

export default function Login() {
  const [, navigate] = useLocation();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"login" | "otp">("login");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !password) {
      toast.error("Please enter your phone number and password");
      return;
    }
    setIsLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
    toast.success("Login successful!");
    navigate("/appointments");
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Stylist Factory Salon"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/80 via-teal-800/60 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Scissors className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Stylist Factory
              </h1>
              <p className="text-white/70 text-sm">Owner Management Portal</p>
            </div>
          </div>
          <h2 className="text-4xl font-bold leading-tight mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Manage your salon<br />with confidence
          </h2>
          <p className="text-white/80 text-lg max-w-sm">
            Track appointments, manage stylists, analyze revenue, and grow your business — all in one place.
          </p>
          <div className="flex gap-6 mt-8">
            {[
              { value: "1,847+", label: "Appointments" },
              { value: "634+", label: "Customers" },
              { value: "4.8★", label: "Avg Rating" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{stat.value}</p>
                <p className="text-white/60 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-sm">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Scissors className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Stylist Factory
              </h1>
              <p className="text-muted-foreground text-xs">Owner Portal</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {mode === "login" ? "Welcome back" : "Verify OTP"}
            </h2>
            <p className="text-muted-foreground text-sm">
              {mode === "login"
                ? "Sign in to your owner account"
                : `Enter the 6-digit code sent to ${phone}`}
            </p>
          </div>

          {mode === "login" ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                  <input type="checkbox" className="rounded border-border" />
                  Remember me
                </label>
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                  onClick={() => {
                    if (phone) setMode("otp");
                    else toast.error("Enter your phone number first");
                  }}
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs text-muted-foreground">
                  <span className="bg-white px-2">or</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => {
                  if (phone) setMode("otp");
                  else toast.error("Enter your phone number first");
                }}
              >
                Login with OTP
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="text-primary hover:underline font-medium"
                  onClick={() => toast.info("Contact support to register your salon")}
                >
                  Register Salon
                </button>
              </p>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex gap-2 justify-center">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    className="w-11 h-12 text-center text-lg font-bold border-2 border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
                  />
                ))}
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
                onClick={() => {
                  if (otp.join("").length === 6) {
                    toast.success("OTP verified!");
                    navigate("/appointments");
                  } else {
                    toast.error("Please enter the complete OTP");
                  }
                }}
              >
                Verify OTP
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Didn't receive code?{" "}
                <button className="text-primary hover:underline font-medium">
                  Resend OTP
                </button>
              </p>

              <button
                className="w-full text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setMode("login")}
              >
                ← Back to login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

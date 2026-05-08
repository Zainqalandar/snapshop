"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import api from "@/utils/axiosInstance";
import { useNotification } from "@/context/notification-context";

export default function SignUpPage() {
  const { success, error } = useNotification();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    terms: true,
  });
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { name, email, password } = form;
      await api.post("/auth/register", { name, email, password });
      // use notification context to show success message
      console.log('Form Data:', form); // Debugging line to check form state
      success("Account created successfully! Please check your email to verify your account.");

      setForm({ name: "", email: "", password: "", terms: false });
    } catch (err: Error | any) {
      console.error("Signup error:", err.response.data.message); // Log the full error response for debugging
      // use notification context to show error message
      error(err.response.data.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-pink-50 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg">
              <ShoppingBag className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-extrabold text-2xl">
              Luxe<span className="text-rose-500">Mart</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Account Banayein</h1>
          <p className="text-gray-500 mt-1 text-sm">Abhi join karein aur shopping shuru karein!</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Poora Naam</Label>
              <Input
                id="name"
                type="text"
                placeholder="Ali Raza"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-xl h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="aap@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="rounded-xl h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPass ? "text" : "password"}
                  placeholder="Kam az kam 8 characters"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="rounded-xl h-11 pr-10"
                  minLength={8}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Password strength indicator */}
              {form.password && (
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        form.password.length >= i * 3
                          ? i <= 1
                            ? "bg-red-400"
                            : i === 2
                            ? "bg-orange-400"
                            : i === 3
                            ? "bg-yellow-400"
                            : "bg-green-500"
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={form.terms}
                onCheckedChange={(v) => setForm({ ...form, terms: v as boolean })}
                className="mt-0.5"
              />
              <Label htmlFor="terms" className="text-sm text-gray-600 font-normal cursor-pointer leading-relaxed">
                Main{" "}
                <Link href="/terms" className="text-rose-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                aur{" "}
                <Link href="/privacy" className="text-rose-600 hover:underline">
                  Privacy Policy
                </Link>{" "}
                se raazi hoon
              </Label>
            </div>

            <Button
              type="submit"
              disabled={loading || !form.terms}
              className="w-full h-11 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-semibold shadow-md shadow-rose-100 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Account ban raha hai...
                </>
              ) : (
                "Account Banayein"
              )}
            </Button>
          </form>
          <div className="mt-6">
            <Separator className="my-4" />
            <p className="text-center text-sm text-gray-500">
              Pehle se account hai?{" "}
              <Link href="/signin" className="text-rose-600 font-semibold hover:underline">
                Sign In Karein
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
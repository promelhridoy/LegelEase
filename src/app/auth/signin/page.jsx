"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client"; // তোমার ফিক্সড করা authClient
import { toast } from "sonner";

// HeroUI Imports
import {
  Button,
  Form,
  Input,
  Label,
  TextField,
  FieldError,
  Spinner,
} from "@heroui/react";

import { FcGoogle } from "react-icons/fc";
import { FaGavel, FaEye, FaEyeSlash } from "react-icons/fa";

const SignInPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ইমেইল ও পাসওয়ার্ড দিয়ে লগইন হ্যান্ডলার
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const user = Object.fromEntries(formData.entries());

      const { data, error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
        callbackURL: "/", // লগইন সফল হলে যেখানে রিডাইরেক্ট হবে
      });

      if (error) {
        toast.error(error.message || "Invalid email or password!");
        setLoading(false);
        return;
      }

      if (data) {
        toast.success("Logged in successfully!");
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (err) {
      toast.error("Failed to sign in!");
    } finally {
      setLoading(false);
    }
  };

  // গুগল সোশ্যাল লগইন হ্যান্ডলার
  const handleGoogleSignin = async () => {
    setGoogleLoading(true);
    const id = toast.loading("Redirecting to Google...");

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
      toast.success("Redirecting...", { id });
    } catch (error) {
      toast.error("Google Sign In Failed!", { id });
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white flex items-center justify-center lg:p-0 relative overflow-hidden">
      
      {/* Background Soft Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none hidden lg:block" />

      {/* Main Split Container */}
      <div className="w-full min-h-screen lg:min-h-[90vh] lg:max-w-6xl lg:border lg:border-white/10 lg:rounded-3xl lg:m-6 grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-white/[0.01] backdrop-blur-xl shadow-2xl relative z-10">
        
        {/* ---------------- LEFT SIDE: PREMIUM IMAGE PANEL ---------------- */}
        <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-between p-12 overflow-hidden border-r border-white/10">
          <Image
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"
            alt="Legal Counsel Background"
            fill
            priority
            unoptimized
            className="object-cover object-center absolute inset-0 -z-20"
          />
          {/* Image Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A]/70 via-[#0B0F1A]/80 to-[#0B0F1A]/95 -z-10" />

          {/* Top Brand Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-tr from-emerald-400 to-purple-500 rounded-lg flex items-center justify-center shadow-md">
              <FaGavel className="text-black text-sm" />
            </div>
            <span className="font-bold text-lg tracking-wider bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">LegalEase</span>
          </div>

          {/* Bottom Text */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-3"
          >
            <h3 className="text-2xl font-bold leading-tight text-white">
              Welcome Back to <br /> Your Legal Hub.
            </h3>
            <p className="text-xs text-white/50 leading-relaxed max-w-sm">
              Sign in to manage your consultations, track active cases, and securely communicate with your verified legal experts.
            </p>
          </motion.div>
        </div>

        {/* ---------------- RIGHT SIDE: HEROUI FORM ---------------- */}
        <div className="col-span-1 lg:col-span-7 flex items-center justify-center p-8 sm:p-12 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md space-y-7"
          >
            {/* Header */}
            <div className="text-center lg:text-left">
              <div className="w-12 h-12 bg-gradient-to-tr from-emerald-400 to-purple-500 rounded-xl flex items-center justify-center mx-auto lg:mx-0 mb-4 shadow-lg shadow-emerald-500/10 lg:hidden">
                <FaGavel className="text-black text-xl" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white">
                Welcome Back
              </h1>
              <p className="text-xs text-white/40 mt-1.5">
                Sign in to continue your journey
              </p>
            </div>

            {/* HeroUI Form */}
            <Form onSubmit={onSubmit} className="space-y-4">
              
              <TextField isRequired name="email" type="email" className="w-full">
                <Label className="text-xs text-white/60 font-medium mb-1.5 block">Email Address</Label>
                <Input placeholder="you@example.com" className="text-white" />
                <FieldError className="text-xs text-rose-400 mt-1" />
              </TextField>

              <TextField isRequired name="password" type={showPassword ? "text" : "password"} className="w-full">
                <div className="flex justify-between items-center mb-1.5">
                  <Label className="text-xs text-white/60 font-medium block">Password</Label>
                  <Link href="/forgot-password" className="text-[11px] text-purple-400 hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative w-full">
                  <Input placeholder="••••••••" className="text-white w-full" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-white/30 hover:text-white/60 transition text-sm z-20"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <FieldError className="text-xs text-rose-400 mt-1" />
              </TextField>

              <Button
                type="submit"
                disabled={loading}
                className="w-full py-6 mt-2 rounded-xl bg-gradient-to-r from-emerald-400 to-purple-500 text-black font-bold text-sm transition-all shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20"
              >
                {loading ? (
                  <div className="flex items-center gap-2 justify-center">
                    <Spinner size="sm" color="current" />
                    <span>Signing In...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </Form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="h-px bg-white/10 w-full" />
              <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold">
                OR
              </span>
              <div className="h-px bg-white/10 w-full" />
            </div>

            {/* Google Login Button */}
            <Button
              onClick={handleGoogleSignin}
              disabled={googleLoading}
              className="w-full bg-white border border-gray-200 text-black font-semibold py-6 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition duration-200"
            >
              <FcGoogle size={20} />
              {googleLoading ? "Redirecting..." : "Continue with Google"}
            </Button>

            {/* Switch to SignUp */}
            <p className="text-center lg:text-left text-xs text-white/40 mt-6">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-emerald-400 hover:underline font-medium">
                Create Account
              </Link>
            </p>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default SignInPage;
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

// HeroUI Imports
import {
  Button,
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Spinner,
  Description,
} from "@heroui/react";

import { FcGoogle } from "react-icons/fc";
import { FaBalanceScale, FaCloudUploadAlt } from "react-icons/fa";
import Logo from "@/components/shared/Logo";

const SignUpPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [role, setRole] = useState("user");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const user = Object.fromEntries(formData.entries());
      
      let imageUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"; 

      if (selectedFile) {
        const imgFormData = new FormData();
        imgFormData.append("image", selectedFile);

        const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY; 
        
        const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
          method: "POST",
          body: imgFormData,
        });

        const imgbbData = await imgbbResponse.json();

        if (imgbbData.success) {
          imageUrl = imgbbData.data.display_url; 
        } else {
          toast.error("Failed to host profile image. Using default.");
        }
      }

      const { data, error } = await authClient.signUp.email({
        email: user.email,
        password: user.password,
        name: user.name,
        image: imageUrl,
        role: role,
        autoSignIn: false,
      });

      if (error) {
        toast.error(error.message || "Something went wrong!");
        setLoading(false);
        return;
      }

      if (data) {
        toast.success("Account created successfully!");
        setTimeout(() => {
          router.push("/auth/signin");
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create account!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    setGoogleLoading(true);
    const id = toast.loading("Redirecting to Google...");

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard", 
        newUserOptions: {
          data: {
            role: role, 
          }
        }
      });

      toast.success("Redirecting...", { id });
    } catch (error) {
      console.error(error);
      toast.error("Google Sign In Failed!", { id });
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white flex items-center justify-center lg:p-0 relative overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none hidden lg:block" />

      {/* Main Split Container */}
      <div className="w-full min-h-screen lg:min-h-[90vh] lg:max-w-6xl lg:border lg:border-white/10 lg:rounded-3xl lg:m-6 grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-white/[0.01] backdrop-blur-xl shadow-2xl relative z-10">
        {/* LEFT SIDE: PREMIUM IMAGE PANEL */}
        <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-between p-12 overflow-hidden border-r border-white/10">
          <Image
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"
            alt="Legal Counsel Background"
            fill
            priority
            unoptimized
            className="object-cover object-center absolute inset-0 -z-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A]/70 via-[#0B0F1A]/80 to-[#0B0F1A]/95 -z-10" />
          <Logo />
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-3"
          >
            <h3 className="text-2xl font-bold leading-tight text-white">
              Your Gateway to Trusted <br /> Legal Counsel.
            </h3>
            <p className="text-xs text-white/50 leading-relaxed max-w-sm">
              Join thousands of citizens and businesses securing top-tier, token-verified contracts with elite legal experts.
            </p>
          </motion.div>
        </div>

        {/* RIGHT SIDE: HEROUI FORM */}
        <div className="col-span-1 lg:col-span-7 flex items-center justify-center p-8 sm:p-12 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md space-y-7"
          >
            <div className="text-center lg:text-left">
              <div className="w-12 h-12 bg-gradient-to-tr from-emerald-400 to-purple-500 rounded-xl flex items-center justify-center mx-auto lg:mx-0 mb-4 shadow-lg shadow-emerald-500/10 lg:hidden">
                <FaBalanceScale className="text-black text-xl" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white">
                Create Account
              </h1>
            </div>

            {/* Form */}
            <Form onSubmit={onSubmit} className="space-y-4">
              <TextField isRequired name="name" className="w-full">
                <Label className="text-xs text-white/60 font-medium mb-1.5 block">
                  Name
                </Label>
                <Input placeholder="Enter your name" className="text-white" />
                <FieldError className="text-xs text-rose-400 mt-1" />
              </TextField>

              {/* 🆕 MODERN DRAG & DROP FILE UPLOADER */}
              <div className="w-full">
                <Label className="text-xs text-white/60 font-medium mb-1.5 block">
                  Profile Image
                </Label>
                <label className="flex flex-col items-center justify-center w-full h-24 border border-dashed border-white/20 rounded-xl cursor-pointer bg-white/[0.02] hover:bg-white/[0.05] hover:border-emerald-500/50 transition-all group">
                  <div className="flex flex-col items-center justify-center pt-3 pb-3">
                    <FaCloudUploadAlt className="text-xl text-white/40 group-hover:text-emerald-400 transition-colors mb-1" />
                    <p className="text-xs text-white/70 font-medium truncate max-w-[280px]">
                      {selectedFile ? selectedFile.name : "Click to upload image"}
                    </p>
                    <p className="text-[10px] text-white/30 mt-0.5">PNG, JPG or WEBP</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              <TextField isRequired name="email" type="email" className="w-full">
                <Label className="text-xs text-white/60 font-medium mb-1.5 block">
                  Email
                </Label>
                <Input placeholder="you@example.com" className="text-white" />
                <FieldError className="text-xs text-rose-400 mt-1" />
              </TextField>

              <TextField
                isRequired
                name="password"
                type="password"
                className="w-full"
                validate={(value) => {
                  if (value.length < 8) return "Min 8 characters required";
                  if (!/[A-Z]/.test(value)) return "Must include uppercase letter";
                  if (!/[0-9]/.test(value)) return "Must include number";
                  return null;
                }}
              >
                <Label className="text-xs text-white/60 font-medium mb-1.5 block">
                  Password
                </Label>
                <Input placeholder="••••••••" className="text-white" />
                <Description className="text-[11px] text-white/30 mt-1 block">
                  8+ chars, 1 uppercase, 1 number
                </Description>
                <FieldError className="text-xs text-rose-400 mt-1" />
              </TextField>

              {/* Role Picker */}
              <div className="flex flex-col gap-2 w-full pt-1">
                <Label className="text-xs text-white/60 font-medium block">
                  Join As
                </Label>
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  <label className={`flex items-center gap-3 cursor-pointer rounded-xl border px-4 py-3 transition-all ${role === "user" ? "border-emerald-400 bg-emerald-400/10" : "border-white/10 bg-white/5"}`}>
                    <input
                      type="radio"
                      name="role"
                      value="user"
                      checked={role === "user"}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-4 h-4 accent-emerald-400"
                    />
                    <span className="text-sm text-white">Client / General User</span>
                  </label>

                  <label className={`flex items-center gap-3 cursor-pointer rounded-xl border px-4 py-3 transition-all ${role === "lawyer" ? "border-purple-500 bg-purple-500/10" : "border-white/10 bg-white/5"}`}>
                    <input
                      type="radio"
                      name="role"
                      value="lawyer"
                      checked={role === "lawyer"}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-4 h-4 accent-purple-500"
                    />
                    <span className="text-sm text-white">Professional Lawyer</span>
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full py-6 mt-4 rounded-xl bg-gradient-to-r from-emerald-400 to-purple-500 text-black font-bold text-sm transition-all shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20"
              >
                {loading ? (
                  <div className="flex items-center gap-2 justify-center">
                    <Spinner size="sm" color="current" />
                    <span>Uploading & Registering...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </Form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="h-px bg-white/10 w-full" />
              <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold">OR</span>
              <div className="h-px bg-white/10 w-full" />
            </div>

            {/* Google */}
            <Button
              onClick={handleGoogleSignin}
              disabled={googleLoading}
              className="w-full bg-white border border-gray-200 text-black font-semibold py-6 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition duration-200"
            >
              <FcGoogle size={20} />
              {googleLoading ? "Redirecting..." : "Continue with Google"}
            </Button>

            <p className="text-center lg:text-left text-xs text-white/40 mt-6">
              Already have an account?{" "}
              
              <Link href="/auth/signin" className="text-emerald-400 hover:underline font-medium">
                Log In
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
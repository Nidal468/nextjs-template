"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

// Validation schema
const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (values: SignUpFormValues) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Account created! Redirecting...");
        setTimeout(() => {
          signIn("credentials", { email: values.email, password: values.password });
        }, 1500);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-6 pt-[80px]">
      <div className="bg-black/5 backdrop-blur-lg border border-black/20 rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <div className="flex justify-center mb-4">
          <Image
            src="/next.svg"
            width={48}
            height={48}
            alt="Logo"
            className="rounded-full"
          />
        </div>

        <h1 className="text-3xl font-extrabold mb-2">
          Create your <span className="text-black">Account</span>
        </h1>
        <p className="text-gray-700 text-sm mb-6">
          Join and explore premium features.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
          {/* Name */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="name" className="text-gray-800">Full Name</Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="bg-black/5 border border-black/20 text-black placeholder:text-gray-400 focus:ring-black focus:outline-none"
                />
              )}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="email" className="text-gray-800">Email</Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="bg-black/5 border border-black/20 text-black placeholder:text-gray-400 focus:ring-black focus:outline-none"
                />
              )}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="password" className="text-gray-800">Password</Label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-black/5 border border-black/20 text-black placeholder:text-gray-400 focus:ring-black focus:outline-none"
                />
              )}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-black text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-200"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="/auth/signin" className="text-black hover:underline">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

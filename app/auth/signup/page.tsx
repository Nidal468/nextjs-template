"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { FaBookOpen, FaGoogle, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

// Validation schema
const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] p-4">
      <motion.div 
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="w-full max-w-md"
      >
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
        >
          <div className="bg-[#3a506b] p-6 flex items-center justify-center space-x-3">
            <FaBookOpen className="text-white text-3xl" />
            <h2 className="text-2xl font-bold text-white font-[Playfair Display]">FreeChapters</h2>
          </div>

          <div className="p-8 space-y-6">
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold text-gray-800 text-center font-[Playfair Display]">Create Your Account</h2>
              <p className="text-gray-600 text-center text-sm mt-1 font-[Open Sans]">Join our community of book lovers</p>
            </motion.div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <motion.div variants={itemVariants} className="space-y-1">
                <Label htmlFor="name" className="text-gray-700 font-[Open Sans] font-medium">Full Name</Label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="border-gray-300 focus:border-[#5bc0be] focus:ring-[#5bc0be]"
                    />
                  )}
                />
                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-1">
                <Label htmlFor="email" className="text-gray-700 font-[Open Sans] font-medium">Email</Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="border-gray-300 focus:border-[#5bc0be] focus:ring-[#5bc0be]"
                    />
                  )}
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-1">
                <Label htmlFor="password" className="text-gray-700 font-[Open Sans] font-medium">Password</Label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="border-gray-300 focus:border-[#5bc0be] focus:ring-[#5bc0be]"
                    />
                  )}
                />
                {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#3a506b] hover:bg-[#2c3e50] text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                >
                  {loading ? "Creating Account..." : "Sign Up"}
                </Button>
              </motion.div>
            </form>

            <motion.div variants={itemVariants} className="relative flex items-center py-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-500 text-sm font-[Open Sans]">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col space-y-3">
              <Button variant="outline" className="w-full flex items-center justify-center space-x-2 border-gray-300 hover:bg-gray-50">
                <FaGoogle className="text-red-500" />
                <span className="font-[Open Sans]">Sign up with Google</span>
              </Button>
              <Button variant="outline" className="w-full flex items-center justify-center space-x-2 border-gray-300 hover:bg-gray-50">
                <FaGithub className="text-gray-800" />
                <span className="font-[Open Sans]">Sign up with GitHub</span>
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center text-sm text-gray-600 font-[Open Sans]">
              Already have an account?{' '}
              <a href="/auth/signin" className="text-[#5bc0be] hover:underline font-medium">
                Sign in
              </a>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
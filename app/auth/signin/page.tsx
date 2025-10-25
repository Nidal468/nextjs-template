"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FiBook, FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        
        try {
            const result = await signIn("credentials", {
                email: email,
                password: password,
            });
            
            if (result?.error) {
                setError("Invalid email or password");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8f9fa] p-6">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md border border-[#e9ecef]"
            >
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-[#3a506b] p-3 rounded-full mb-4">
                        <FiBook className="text-white text-2xl" />
                    </div>
                    <h1 className="text-xl font-bold text-[#333333] font-serif mb-2">Welcome to FreeChapters</h1>
                    <p className="text-[#6c757d] text-sm">Sign in to explore your next great read</p>
                </div>

                {error && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md"
                    >
                        {error}
                    </motion.div>
                )}

                <form className="space-y-5" onSubmit={handleEmailSignIn}>
                    <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Label htmlFor="email" className="text-[#495057] mb-2 block">
                            Email Address
                        </Label>
                        <div className="relative">
                            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6c757d]" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10 bg-[#f8f9fa] border-[#e9ecef] focus:border-[#3a506b] focus:ring-[#3a506b]"
                                required
                            />
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Label htmlFor="password" className="text-[#495057] mb-2 block">
                            Password
                        </Label>
                        <div className="relative">
                            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6c757d]" />
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10 bg-[#f8f9fa] border-[#e9ecef] focus:border-[#3a506b] focus:ring-[#3a506b]"
                                required
                            />
                        </div>
                    </motion.div>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" id="remember" className="rounded text-[#3a506b] focus:ring-[#3a506b]" />
                            <Label htmlFor="remember" className="text-sm text-[#6c757d]">
                                Remember me
                            </Label>
                        </div>
                        <a href="/auth/forgotpassword" className="text-sm text-[#5bc0be] hover:underline">
                            Forgot password?
                        </a>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Button
                            type="submit"
                            className="w-full bg-[#3a506b] hover:bg-[#2d3e56] text-white font-medium py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                        >
                            <span>Sign In</span>
                            <FiArrowRight className="text-lg" />
                        </Button>
                    </motion.div>
                </form>

                <div className="mt-6 text-center text-sm text-[#6c757d]">
                    Don't have an account?{' '}
                    <a href="/auth/signup" className="text-[#5bc0be] font-medium hover:underline">
                        Sign Up
                    </a>
                </div>
            </motion.div>
        </div>
    );
}
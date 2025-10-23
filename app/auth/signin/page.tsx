"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Here you’d call your credentials provider
        signIn("credentials", {
            email: email,
            password: password,
        })
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-6 pt-[80px]">
            <div className="bg-black/10 backdrop-blur-lg border border-black/20 rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
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
                    Welcome to <span className="text-black">NEXTJS</span>
                </h1>
                <p className="text-gray-700 text-sm mb-6">
                    Sign in to access your dashboard and manage your projects.
                </p>

                {/* Email & Password Form */}
                <form className="space-y-4 text-left" onSubmit={handleEmailSignIn}>
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="email" className="text-gray-800">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-black/5 border border-black/20 text-black placeholder:text-gray-400 focus:ring-black focus:outline-none"
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="password" className="text-gray-800">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-black/5 border border-black/20 text-black placeholder:text-gray-400 focus:ring-black focus:outline-none"
                        />
                    </div>

                    <div className="flex justify-between items-center text-sm mt-2">
                        <a href="/auth/forgotpassword" className="text-black/70 hover:underline">
                            Forgot password?
                        </a>
                        <a href="/auth/signup" className="text-black/70 hover:underline">
                            Sign up
                        </a>
                    </div>

                    <Button
                        type="submit"
                        className="w-full mt-4 bg-black text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-200"
                    >
                        Sign in
                    </Button>
                </form>
                <p className="mt-6 text-sm text-black/60">
                    By signing in, you agree to our{" "}
                    <a href="/terms" className="text-black hover:underline">
                        Terms of Service
                    </a>.
                </p>
            </div>
        </div>
    );
}

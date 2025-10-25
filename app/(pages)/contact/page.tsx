"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function Contact() {
    const [form, setForm] = useState({
        subject: "",
        email: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/mail/send", {
                method: "POST",
                body: JSON.stringify({ email: form.email, message: form.message, subject: form.subject }),
                headers: { "Content-Type": "application/json" },
                cache: "no-store",
            });

            if (res.ok) {
                setForm({
                    subject: "",
                    email: "",
                    message: "",
                });
                toast.success("Your message has been sent successfully!");
            } else {
                toast.error("Failed to send message. Please try again.");
            }
        } catch (err) {
            console.error(err);
            toast.error("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] p-6 md:p-12 flex flex-col items-center"
        >
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[#3a506b] font-playfair">
                Contact Us
            </h1>
            <p className="text-[#555] text-center mb-8 max-w-xl">
                Have questions, suggestions, or just want to say hi? Fill out the form below and we'll get back to you.
            </p>

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 md:p-10 flex flex-col gap-4"
            >
                <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <Input
                    name="subject"
                    placeholder="Mail subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                />
                <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                />
                <Button
                    type="submit"
                    className="bg-[#5bc0be] hover:bg-[#5bc0be]/80 text-white font-medium mt-2"
                >
                    Send Message
                </Button>
            </form>

            <div className="mt-10 text-center text-[#555] space-y-2">
                <p>Email: support@freechapters.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Address: 123 Novel St, Booktown, USA</p>
            </div>
        </motion.div>
    );
}

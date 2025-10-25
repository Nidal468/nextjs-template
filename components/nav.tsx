"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { getUser } from "@/hooks/use-user";
import { IUser } from "@/model/user";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  // Base nav links for all users
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse", href: "/browse" },
    { name: "Contact", href: "/contact" },

  ];

  // Auth links only for guests
  const authLinks = [
    { name: "Sign In", href: "/auth/signin" },
    { name: "Sign Up", href: "/auth/signup" },

  ];

  const logLinks = [
    { name: "Account", href: "/account" },
    { name: "Dashboard", href: "/dashboard" },
  ]

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const get = async () => {
      const res = await getUser();
      setUser(res);
    };
    get();
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-opacity-20 backdrop-blur-md bg-[#f8f9fa]/80">
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-[#3a506b] font-playfair">
            FreeChapters
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-[#333333] hover:text-[#3a506b] transition-colors font-medium"
            >
              {link.name}
            </Link>
          ))}
          {logLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-[#333333] hover:text-[#3a506b] transition-colors font-medium"
            >
              {link.name}
            </Link>
          ))}
          {/* Auth / User */}
          {user ? (
            <div className="flex items-center gap-3">

              {user.image && (
                <img
                  src={user.image}
                  alt={user.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
              )}
              <span className="text-[#3a506b] font-medium">{user.name}</span>
              <Button className="bg-[#5bc0be] hover:bg-[#5bc0be]/80 text-white font-medium" onClick={() => signOut()}>Sign out</Button>
            </div>
          ) : (
            authLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-[#333333] hover:text-[#3a506b] transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden z-60">
          <button onClick={toggleMenu}>
            {isOpen ? <X className="h-6 w-6 text-[#3a506b]" /> : <Menu className="h-6 w-6 text-[#3a506b]" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Side Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-screen w-64 bg-white rounded-l-xl shadow-2xl z-50 flex flex-col p-6"
            >
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
                  },
                }}
                className="flex flex-col mt-10 gap-2"
              >
                {navLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 rounded-lg text-[#333333] hover:text-white hover:bg-[#3a506b] transition-all font-medium"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                {user && logLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 rounded-lg text-[#333333] hover:text-white hover:bg-[#3a506b] transition-all font-medium"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                {/* Auth / User for mobile */}
                {user ? (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mt-6 flex flex-col items-start justify-start gap-4 bg-white p-4 rounded-xl shadow-md border border-[#3a506b]/10"
                  >
                    {/* User info */}
                    <div className="flex items-center gap-3">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name}
                          className="h-10 w-10 rounded-full object-cover border border-[#3a506b]/20"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-[#3a506b]/20 flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="text-[#3a506b] font-semibold">{user.name}</span>
                    </div>

                    {/* Sign out button */}
                    <button className="w-full py-2 bg-[#5bc0be] hover:bg-[#5bc0be]/80 text-white font-medium rounded-lg transition-colors" onClick={() => signOut()}>
                      Sign Out
                    </button>
                  </motion.div>
                ) : (
                  authLinks.map((link, index) => (
                    <motion.div
                      key={index}
                      variants={{
                        hidden: { opacity: 0, x: 20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      className="mb-4 mt-6"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 rounded-lg text-[#333333] hover:text-white hover:bg-[#3a506b] transition-all font-medium"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

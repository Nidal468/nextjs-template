"use client";

import { useEffect, useState } from "react";
import { IUser } from "@/model/user";
import { INovel } from "@/model/novel";
import { getUser } from "@/hooks/use-user";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Account() {
  const [user, setUser] = useState<IUser | null>(null);
  const [novels, setNovels] = useState<INovel[]>([]);
  const [history, setHistory] = useState<INovel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const u = await getUser();
      if (!u) return;
      setUser(u);
    };

    fetchData();
  }, []);

  if (!user) {
    return <p className="p-6 text-center text-[#555]">Loading...</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] p-6 md:p-12"
    >
      {/* User Details */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white p-6 rounded-xl shadow-lg">
        {user.image && (
          <img
            src={user.image}
            alt={user.name}
            className="h-24 w-24 rounded-full object-cover border border-[#3a506b]/20"
          />
        )}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-[#3a506b]">{user.name}</h1>
          <p className="text-[#555]">{user.email}</p>
          <Button className="bg-[#5bc0be] hover:bg-[#5bc0be]/80 text-white mt-2 w-32">Edit Profile</Button>
        </div>
      </div>

      {/* Novels Created */}
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-4 text-[#3a506b]">Your Novels</h2>
        {novels.length === 0 ? (
          <p className="text-[#555]">You haven't created any novels yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {novels.map(novel => (
              <motion.div
                key={novel.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card className="overflow-hidden">
                  <img src={novel.cover} alt={novel.title} className="w-full h-48 object-cover" />
                  <CardContent>
                    <h3 className="text-lg font-semibold">{novel.title}</h3>
                    <p className="text-sm text-muted-foreground">{novel.genre}</p>
                  </CardContent>
                  <CardFooter className="text-xs text-muted-foreground">
                    {novel.author}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Reading History */}
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-4 text-[#3a506b]">Reading History</h2>
        {history.length === 0 ? (
          <p className="text-[#555]">You haven't read any novels yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {history.map(novel => (
              <motion.div
                key={novel.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card className="overflow-hidden">
                  <img src={novel.cover} alt={novel.title} className="w-full h-48 object-cover" />
                  <CardContent>
                    <h3 className="text-lg font-semibold">{novel.title}</h3>
                    <p className="text-sm text-muted-foreground">{novel.genre}</p>
                  </CardContent>
                  <CardFooter className="text-xs text-muted-foreground">
                    {novel.author}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </motion.div>
  );
}

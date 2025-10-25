"use client";

import { useEffect, useState } from "react";
import { IUser } from "@/model/user";
import { INovel } from "@/model/novel";
import { getUser } from "@/hooks/use-user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import CreateNovelModal from "@/components/modal/CreateNovelModal";
import { getUserNovels } from "@/hooks/getUserNovels";
import Novel from "@/components/novel";

export default function Dashboard() {
  const [user, setUser] = useState<IUser | null>(null);
  const [novels, setNovels] = useState<INovel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const u = await getUser();
      const n = await getUserNovels()
      if (!u) return;
      setUser(u);
      setNovels(n);
    };
    fetchData();
  }, []);

  if (!user) return <p className="p-6 text-center text-[#555]">Loading...</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] p-6 md:p-12"
    >
      {/* Welcome / Summary */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 rounded-xl shadow-lg">
        {user.image && (
          <img
            src={user.image}
            alt={user.name}
            className="h-24 w-24 rounded-full object-cover border border-[#3a506b]/20"
          />
        )}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-[#3a506b]">Welcome back, {user.name}!</h1>
          <p className="text-[#555]">Here's a summary of your activity on FreeChapters.</p>
          <div className="flex gap-4 mt-4">
            <CreateNovelModal />
            <Button className="bg-[#3a506b] hover:bg-[#3a506b]/80 text-white font-medium">View Profile</Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10">
        <Card className="bg-white shadow-md rounded-xl">
          <CardContent>
            <CardTitle className="text-[#3a506b] font-bold">Novels Written</CardTitle>
            <p className="text-2xl font-semibold text-[#5bc0be]">{user.novels.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-md rounded-xl">
          <CardContent>
            <CardTitle className="text-[#3a506b] font-bold">Views Generated</CardTitle>
            <p className="text-2xl font-semibold text-[#5bc0be]">{user.history.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Novels */}
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-4 text-[#3a506b]">Your Novels</h2>
        {novels.length === 0 ? (
          <p className="text-[#555]">You haven't created any novels yet.</p>
        ) : (
          <div className="w-full flex items-start justify-start flex-wrap gap-6">
            {novels.slice(0, 6).map((novel, i) => (
              <Novel key={i} novel={novel} />
            ))}
          </div>
        )}
      </section>
    </motion.div>
  );
}

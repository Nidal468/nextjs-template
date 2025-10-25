"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import genres from "@/lib/genre";

const novelSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  author: z.string().min(2, "Author name is required."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  genre: z.string().min(1, "Genre is required."),
  tags: z.string().optional(), // comma separated
  cover: z.any().optional(),
});

type NovelForm = z.infer<typeof novelSchema>;

export default function CreateNovelModal({
  onCreated,
}: {
  onCreated?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<NovelForm>({
    resolver: zodResolver(novelSchema),
  });

  // watch file input for preview
  const coverFile = watch("cover");
  if (coverFile && coverFile[0] && !preview) {
    const file = coverFile[0];
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  const onSubmit = async (data: NovelForm) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("author", data.author);
      formData.append("description", data.description);
      formData.append("genre", data.genre);
      formData.append("publishedDate", new Date().toISOString());
      formData.append("views", "0");
      formData.append("likes", "0");

      if (data.tags) {
        data.tags
          .split(",")
          .map((t) => t.trim())
          .forEach((t) => formData.append("tags[]", t));
      }

      if (data.cover && data.cover[0]) {
        formData.append("cover", data.cover[0]);
      }

      const res = await fetch("/api/novels/create", {
        method: "POST",
        body: formData,
        cache: 'no-store'
      });

      if (res.ok) {
        toast.success("Novel created successfully!");
        reset();
        setPreview(null);
        setOpen(false);
        onCreated?.();
      } else {
        toast.error("Failed to create novel.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#5bc0be] hover:bg-[#5bc0be]/80 text-white font-medium">
          Create Novel
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md bg-white rounded-xl shadow-xl border border-[#3a506b]/10">
        <DialogHeader>
          <DialogTitle className="text-[#3a506b] text-xl font-bold">
            Create a New Novel
          </DialogTitle>
        </DialogHeader>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 mt-4"
          encType="multipart/form-data"
        >
          {/* Title */}
          <div className="space-y-3">
            <Label>Title</Label>
            <Input {...register("title")} placeholder="Novel title" />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Author */}
          <div className="space-y-3">
            <Label>Author</Label>
            <Input {...register("author")} placeholder="Author name" />
            {errors.author && (
              <p className="text-red-500 text-sm">{errors.author.message}</p>
            )}
          </div>

          {/* Cover Upload */}
          <div className="space-y-3">
            <Label>Cover Image</Label>
            <Input
              type="file"
              accept="image/*"
              {...register("cover")}
              className="cursor-pointer border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5bc0be]"
            />
            {preview && (
              <div className="mt-2 flex justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-40 object-cover rounded-md shadow-md border border-gray-200"
                />
              </div>
            )}
          </div>

          {/* Genre Dropdown */}
          <div className="space-y-3">
            <Label>Genre</Label>
            <select
              {...register("genre")}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5bc0be] text-gray-700"
              defaultValue=""
            >
              <option value="" disabled>
                Select a genre
              </option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            {errors.genre && (
              <p className="text-red-500 text-sm">{errors.genre.message}</p>
            )}
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <Label>Tags (comma separated)</Label>
            <Input {...register("tags")} placeholder="adventure, magic, hero" />
          </div>

          {/* Description */}
          <div className="space-y-3">
            <Label>Description</Label>
            <Textarea
              {...register("description")}
              placeholder="Brief description..."
              rows={4}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#3a506b] hover:bg-[#3a506b]/80 text-white font-medium"
            >
              {isSubmitting ? "Creating..." : "Create Novel"}
            </Button>
          </div>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
}

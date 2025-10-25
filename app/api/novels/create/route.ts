import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/db/mongoose";
import { Novel } from "@/model/novel";
import { User } from "@/model/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/auth-options";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    await connectMongo();

    const session: any = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const author = formData.get("author") as string;
    const description = formData.get("description") as string;
    const genre = formData.get("genre") as string;
    const publishedDate = formData.get("publishedDate") as string;
    const tags = formData.getAll("tags[]") as string[];

    const coverFile = formData.get("cover") as File | null;

    if (!title || !author) {
      return NextResponse.json(
        { error: "Title and author are required." },
        { status: 400 }
      );
    }

    let coverPath = "";

    if (coverFile) {
      const buffer = Buffer.from(await coverFile.arrayBuffer());
      const fileName = `${Date.now()}-${coverFile.name}`;
      const uploadDir = path.join(process.cwd(), "public/images/covers");
      await fs.mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, fileName);
      await fs.writeFile(filePath, buffer);
      coverPath = `/images/covers/${fileName}`;
    }

    const newNovel = await Novel.create({
      title,
      author,
      cover: coverPath,
      description,
      genre,
      tags,
      publishedDate: publishedDate ? new Date(publishedDate) : new Date(),
      views: 0,
      likes: 0,
    });

    // Attach novel to the user
    await User.findByIdAndUpdate(
      session.user.id,
      { $push: { novels: { id: newNovel._id.toString() } } },
      { new: true, runValidators: true }
    );

    return NextResponse.json(
      { message: "Novel created successfully.", novel: newNovel },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating novel:", error);
    return NextResponse.json(
      { error: "Failed to create novel.", details: error.message },
      { status: 500 }
    );
  }
}

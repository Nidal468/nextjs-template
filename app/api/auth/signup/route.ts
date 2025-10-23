import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectMongo from "@/db/mongoose";
import { User } from "@/model/user";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    if (!email || !password || !name) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    await connectMongo();
    const existing = await User.findOne({ email });
    if (existing)
      return NextResponse.json({ message: "Email already in use" }, { status: 400 });

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      stripeCustomerId: "",
      name,
      email,
      image: "",
      provider: "credentials",
      crates: [],
      password: hashed,
    });

    await user.save();

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

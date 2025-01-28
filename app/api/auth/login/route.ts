import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Use a secure secret in .env

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return new NextResponse("Email and password are required.", {
        status: 400,
      });
    }

    // Find the user by email
    const user = await prismadb.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new NextResponse("Invalid email or password.", { status: 401 });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new NextResponse("Invalid email or password.", { status: 401 });
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "30d" }
    );

    return NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );
  } catch (error) {
    console.error("[USER_LOGIN]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

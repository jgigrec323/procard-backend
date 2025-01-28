import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Use a secure secret in .env

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, password } = body;

    if (!name || !email || !password) {
      return new NextResponse("Name, email, and password are required.", {
        status: 400,
      });
    }

    // Check if the user already exists
    const existingUser = await prismadb.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new NextResponse("User already exists.", { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await prismadb.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
      },
    });

    // Generate a JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "20d" } // Token expires in 20 days
    );

    return NextResponse.json(
      { message: "Registration successful", token },
      { status: 201 }
    );
  } catch (error) {
    console.error("[USER_REGISTER]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

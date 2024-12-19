import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function GET() {
  try {
    // Fetch users along with their associated cards
    const users = await prismadb.user.findMany({
      include: {
        cards: true, // Include associated cards
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.log("[USERS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth(); // Ensure the user is authenticated
    const body = await req.json();

    const { name, email, password, phone, role, cardId } = body;

    // Validate required fields
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    if (!password) {
      return new NextResponse("Password is required", { status: 400 });
    }

    // Check if the email already exists
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return new NextResponse("Email already in use", { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds = 10

    // Create a new user
    const newUser = await prismadb.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        role: role || "user",
        cards: cardId
          ? {
              connect: { id: cardId },
            }
          : undefined,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.log("[USERS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

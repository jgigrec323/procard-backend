import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    if (!userId) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    const user = await prismadb.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        cards: true, // Include related cards
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId: authUserId } = await auth();
    const { userId } = params;

    if (!authUserId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!userId) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    const body = await req.json();
    const { name, email, phone, role } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    const user = await prismadb.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        email,
        phone,
        role,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId: authUserId } = await auth();
    const { userId } = params;

    if (!authUserId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!userId) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    await prismadb.user.delete({
      where: {
        id: userId,
      },
    });

    return new NextResponse("User deleted successfully", { status: 200 });
  } catch (error) {
    console.log("[USER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

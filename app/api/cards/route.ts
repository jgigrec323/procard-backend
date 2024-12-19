import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const isActivated = searchParams.get("isActivated");

    const cards = await prismadb.card.findMany({
      where: {
        isActivated: isActivated ? true : undefined,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(cards);
  } catch (error) {
    console.log("[CARDS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    const { type, status, isActivated, linkedUserId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!type) {
      return new NextResponse("Type is required", { status: 400 });
    }

    if (!status) {
      return new NextResponse("Status is required", { status: 400 });
    }

    if (!linkedUserId) {
      return new NextResponse("Linked User ID is required", { status: 400 });
    }

    // Validate linked user
    const linkedUser = await prismadb.user.findUnique({
      where: { id: linkedUserId },
    });

    if (!linkedUser) {
      return new NextResponse("Linked user not found", { status: 404 });
    }

    // Create the card without uniqueURL
    const card = await prismadb.card.create({
      data: {
        type,
        status,
        isActivated: isActivated || false,
        uniqueURL: "",
        linkedUser: {
          connect: { id: linkedUserId },
        },
      },
    });

    // Update the card to add the uniqueURL based on the card id
    const updatedCard = await prismadb.card.update({
      where: { id: card.id },
      data: {
        uniqueURL: `/card/${card.id}`,
      },
    });

    return NextResponse.json(updatedCard);
  } catch (error) {
    console.log("[CARDS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

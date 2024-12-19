import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// GET: Fetch a specific card by ID
export async function GET(
  req: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    if (!params.cardId) {
      return new NextResponse("Card id is required", { status: 400 });
    }

    const card = await prismadb.card.findUnique({
      where: {
        id: params.cardId,
      },
    });

    if (!card) {
      return new NextResponse("Card not found", { status: 404 });
    }

    return NextResponse.json(card);
  } catch (error) {
    console.log("[CARD_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// PATCH: Update a specific card
export async function PATCH(
  req: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const { userId } = await auth();

    const body = await req.json();

    const { type, status, isActivated } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.cardId) {
      return new NextResponse("Card id is required", { status: 400 });
    }

    const card = await prismadb.card.update({
      where: {
        id: params.cardId,
      },
      data: {
        type,
        status,
        isActivated,
      },
    });

    return NextResponse.json(card);
  } catch (error) {
    console.log("[CARD_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// DELETE: Delete a specific card
export async function DELETE(
  req: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.cardId) {
      return new NextResponse("Card id is required", { status: 400 });
    }

    const card = await prismadb.card.delete({
      where: {
        id: params.cardId,
      },
    });

    return NextResponse.json(card);
  } catch (error) {
    console.log("[CARD_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

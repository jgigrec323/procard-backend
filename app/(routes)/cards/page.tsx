import prismadb from "@/lib/prismadb";
import CardClient from "./components/client";
import { format } from "date-fns";
import { CardColumn } from "./components/columns";

const CardsPage = async () => {
  const cards = await prismadb.card.findMany({
    include: {
      linkedUser: true, // Include linked user details
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCards: CardColumn[] = cards.map((card) => ({
    id: card.id,
    type: card.type,
    status: card.status,
    isActivated: card.isActivated || false, // Default to false if not set
    activationDate: card.activationDate
      ? format(new Date(card.activationDate), "MMMM do, yyyy")
      : "Not activated", // Format activation date or display default
    linkedUser: card.linkedUser ? card.linkedUser.name : "Unassigned", // Handle linked user
    uniqueURL: card.uniqueURL,
    createdAt: format(card.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CardClient data={formattedCards}></CardClient>
      </div>
    </div>
  );
};

export default CardsPage;

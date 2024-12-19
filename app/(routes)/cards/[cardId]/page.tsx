import prismadb from "@/lib/prismadb";

const CardPage = async ({ params }: { params: { cardId: string } }) => {
  const { cardId } = await params;

  const card = await prismadb.card.findUnique({
    where: {
      id: cardId,
    },
    include: {
      linkedUser: true, // Include the linked user for additional details
    },
  });

  const formattedCard = card
    ? {
        ...card,
        activationDate: card.activationDate
          ? new Date(card.activationDate).toISOString() // Ensure correct formatting
          : null,
        isActivated: card.isActivated || false, // Default to false if not set
      }
    : null;

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8">
        <CardForm initialData={formattedCard}></CardForm>
      </div>
    </div>
  );
};

export default CardPage;

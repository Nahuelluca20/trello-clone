import prisma from "~/db/prisma.server";

export async function createBoard(userId: string, name: string, label: string) {
  return prisma.board.create({
    data: {
      name,
      label,
      Account: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

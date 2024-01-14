import prisma from "~/db/prisma.server";

export async function getBoards(userId: string) {
  return prisma.board.findMany({
    where: {
      accountId: userId,
    },
  });
}

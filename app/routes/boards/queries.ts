import prisma from "~/db/prisma.server";

export async function getBoards(userId: string) {
  return prisma.board.findMany({
    where: {
      accountId: userId,
    },
  });
}

export async function deleteBoard(boardId: number, accountId: string) {
  return prisma.board.delete({
    where: { id: boardId, accountId },
  });
}

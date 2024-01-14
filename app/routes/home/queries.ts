import prisma from "~/db/prisma.server";

export async function deleteBoard(boardId: number, accountId: string) {
  return prisma.board.delete({
    where: { id: boardId, accountId },
  });
}

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

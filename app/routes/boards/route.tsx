import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { requireAuthCookie } from "~/auth/auth.server";
import { deleteBoard, getBoards } from "./queries";
import { useLoaderData } from "@remix-run/react";
import Board from "./board";
import { badRequest } from "~/http/bad-request";

export async function action({ request }: ActionFunctionArgs) {
  let accountId = await requireAuthCookie(request);
  let formData = await request.formData();

  let boardId = formData.get("boardId");
  if (!boardId) throw badRequest("Missing boardId");
  await deleteBoard(Number(boardId), accountId);
  return { ok: true };
}

export async function loader({ request }: LoaderFunctionArgs) {
  let userId = await requireAuthCookie(request);
  let boards = await getBoards(userId);

  return { boards };
}

export default function Boards() {
  const { boards } = useLoaderData<typeof loader>();

  return (
    <section className="space-y-6">
      <h2 className="text-2xl">Boards</h2>
      <div className="flex gap-5 flex-wrap">
        {boards.map((board) => (
          <Board
            key={board.id}
            id={board.id}
            name={board.name}
            label={board.label}
          />
        ))}
      </div>
    </section>
  );
}

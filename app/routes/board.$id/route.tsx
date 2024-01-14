import { LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import invariant from "tiny-invariant";
import { requireAuthCookie } from "~/auth/auth.server";
import { getBoardData } from "./queries";
import { notFound } from "~/http/bad-request";
import Board from "./board";

export async function loader({ request, params }: LoaderFunctionArgs) {
  let accountId = await requireAuthCookie(request);

  invariant(params.id, "Missing board ID");
  let id = Number(params.id);

  let board = await getBoardData(id, accountId);
  if (!board) throw notFound();

  return { board };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: `${data ? data.board.name : "Board"} | Trellify` }];
};

export { Board as default };

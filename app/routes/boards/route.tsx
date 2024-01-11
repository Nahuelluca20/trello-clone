import { LoaderFunctionArgs } from "@remix-run/node";
import {
  redirectIfLoggedInLoader,
  requireAuthCookie,
} from "~/auth/auth.server";
import { getHomeData } from "../home/queries";

export async function loader({ request }: LoaderFunctionArgs) {
  let userId = await requireAuthCookie(request);
  let boards = await getHomeData(userId);
  return { boards };
}

export default function Boards() {
  return <div>Boards</div>;
}

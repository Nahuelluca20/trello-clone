import { redirectWithClearedCookie } from "~/auth/auth.server";

export function action() {
  return redirectWithClearedCookie();
}

import { Button } from "react-aria-components";
import { LogOut, LogIn } from "lucide-react";
import { Link } from "@remix-run/react";

export default function Header({ isLogged }: { isLogged: null | string }) {
  return (
    <nav className="w-full border-white  border-b-3 flex py-4 ">
      <div className="max-w-[1400px] mx-auto w-full px-5 flex items-center justify-between">
        <Link to={isLogged ? "/home" : "/"} className="grid gap-0">
          <h2 className="text-xl m-0 font-bold">Trellify</h2>
          <span className="hidden sm:block text-sm m-0 text-waikawa-gray-400">
            Trello clone with remix
          </span>
        </Link>

        <ul className="flex gap-4 items-center">
          <li>
            <Link to="/boards">Boards</Link>
          </li>
          <li>
            <Link to="/info">Info</Link>
          </li>

          <li>
            {isLogged ? (
              <form method="post" action="/logout">
                <Button data-outline style={{ padding: "5px 10px" }}>
                  <LogOut width={15} />
                  Logout
                </Button>
              </form>
            ) : (
              <Link to="/login">
                <Button data-outline style={{ padding: "5px 10px" }}>
                  <LogIn width={15} />
                  Login
                </Button>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

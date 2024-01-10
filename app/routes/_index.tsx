import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Button } from "react-aria-components";

export const meta: MetaFunction = () => {
  return [{ title: "Trello Clone" }];
};

export default function Index() {
  return (
    <div className="h-full flex flex-col items-center pt-10 ">
      <img src="/remix-logo@dark.png" width="402" height="149" />
      <div className="space-y-4 max-w-md text-lg text-slate-300">
        <p>
          It is a recreation of the popular drag-and-drop interface of{" "}
          <a href="https://trello.com" className="underline">
            Trello
          </a>{" "}
          and other similar applications used for task management.
        </p>
        <p>If you want to try it, click sign up!</p>
      </div>
      <div className="flex w-full justify-center gap-5 max-w-md mt-8 rounded-3xl p-10">
        <Link to="/signup">
          <Button
            style={{
              fontSize: "18px",
            }}
          >
            Sign up
          </Button>
        </Link>
        <Link to="/login">
          <Button
            style={{
              fontSize: "18px",
            }}
            data-outline
          >
            Login
          </Button>
        </Link>
      </div>
      <Link
        to="/home"
        className="text-xl mt-20 font-medium text-brand-aqua underline"
      >
        home
      </Link>
    </div>
  );
}

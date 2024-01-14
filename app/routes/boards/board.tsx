import { Link, useFetcher } from "@remix-run/react";
import { Trash } from "lucide-react";

export default function Board({
  name,
  id,
  label,
}: {
  name: string;
  id: number;
  label: string;
}) {
  let fetcher = useFetcher();
  let isDeleting = fetcher.state !== "idle";
  return isDeleting ? null : (
    <Link
      to={`/board/${id}`}
      className="w-60 h-40 p-4 flex flex-col justify-between border-b-8 shadow rounded hover:shadow-lg bg-waikawa-gray-950 border border-waikawa-gray-600 relative"
    >
      <div className="font-bold break-all w-full overflow-ellipsis max-w-[180px]">
        <h1>{name}</h1>
      </div>
      <fetcher.Form method="post" action="/boards">
        <input type="hidden" name="boardId" value={id} />
        <button
          aria-label="Delete board"
          className="absolute top-4 right-4 hover:text-brand-red"
          type="submit"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <Trash />
        </button>
      </fetcher.Form>
      <span className="rounded-full bg-waikawa-gray-800 text-waikawa-gray-100 w-fit px-3 py-[2px] font-semibold">
        {label}
      </span>
    </Link>
  );
}

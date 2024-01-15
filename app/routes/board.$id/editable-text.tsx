import { useFetcher } from "@remix-run/react";
import { useState, useRef } from "react";
import { flushSync } from "react-dom";

export function EditableText({
  children,
  fieldName,
  value,
  inputClassName,
  inputLabel,
  buttonClassName,
  buttonLabel,
}: {
  children: React.ReactNode;
  fieldName: string;
  value: string;
  inputClassName: string;
  inputLabel: string;
  buttonClassName: string;
  buttonLabel: string;
}) {
  let fetcher = useFetcher();
  let [edit, setEdit] = useState(false);
  let inputRef = useRef<HTMLInputElement>(null);
  let buttonRef = useRef<HTMLButtonElement>(null);

  // optimistic update
  if (fetcher.formData?.has(fieldName)) {
    value = String(fetcher.formData.get("name"));
  }

  return edit ? (
    <fetcher.Form
      method="post"
      onSubmit={() => {
        flushSync(() => {
          setEdit(false);
        });
        buttonRef.current?.focus();
      }}
    >
      {children}
      <input
        required
        ref={inputRef}
        type="text"
        aria-label={inputLabel}
        name={fieldName}
        defaultValue={value}
        className={inputClassName + "text-black"}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            flushSync(() => {
              setEdit(false);
            });
            buttonRef.current?.focus();
          }
        }}
        onBlur={(event) => {
          if (
            inputRef.current?.value !== value &&
            inputRef.current?.value.trim() !== ""
          ) {
            fetcher.submit(event.currentTarget);
          }
          setEdit(false);
        }}
      />
    </fetcher.Form>
  ) : (
    <button
      aria-label={buttonLabel}
      type="button"
      ref={buttonRef}
      onClick={() => {
        flushSync(() => {
          setEdit(true);
        });
        inputRef.current?.select();
      }}
      className={buttonClassName}
    >
      {value || <span className="text-slate-400 italic">Edit</span>}
    </button>
  );
}

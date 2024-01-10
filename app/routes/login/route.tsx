import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, json, useActionData } from "@remix-run/react";
import { Button, Input, Label, Text, TextField } from "react-aria-components";
import { loginSchema } from "./validate";
import { redirectIfLoggedInLoader, setAuthOnResponse } from "~/auth/auth";
import { login } from "./queries";

export const loader = redirectIfLoggedInLoader;

export async function action({ request }: ActionFunctionArgs) {
  const formPayload = Object.fromEntries(await request.formData());

  const parsed = loginSchema.safeParse(formPayload);

  if (!parsed.success) {
    return json({ error: parsed.error.format() });
  }

  console.log(parsed.data.email, parsed.data.password);

  let email = String(parsed.data.email) || "";
  let password = parsed.data.password || "";

  let userId = await login(email, password);
  if (userId === false) {
    return json(
      { ok: false, errors: { password: "Invalid credentials" } },
      400
    );
  }

  let response = redirect("/home");
  return setAuthOnResponse(response, userId);
}

export default function Login() {
  const data = useActionData<typeof action>();

  return (
    <div className="flex min-h-full flex-1 flex-col mt-20 sm:px-6 lg:px-8">
      <h2 className="text-center font-semibold text-2xl">Log In</h2>
      <Form className="space-y-6" method="post">
        <TextField type="email">
          <Label>Email</Label>
          <Input placeholder="Email" name="email" />
          <Text className="text-red-400 ml-2" slot="description">
            {data && data.error?.email && data.error.email?._errors[0]}
          </Text>
        </TextField>
        <TextField type="password">
          <Label>Password</Label>
          <Input placeholder="Password" name="password" />
          {data && data.error?.password && (
            <Text className="text-red-400 ml-2" slot="description">
              {data.error?.password?._errors[0]}
            </Text>
          )}
        </TextField>
        {data && data.errors?.password && (
          <Text className="text-red-400 ml-2" slot="description">
            {data.errors?.password}
          </Text>
        )}
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}

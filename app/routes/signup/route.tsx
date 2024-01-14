import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import {
  Form,
  TextField,
  Label,
  Input,
  Button,
  Text,
} from "react-aria-components";
import {
  redirectIfLoggedInLoader,
  setAuthOnResponse,
} from "~/auth/auth.server";
import { validate } from "./validate";
import { createAccount } from "./queries";
import { useActionData } from "@remix-run/react";

export const loader = redirectIfLoggedInLoader;

export const meta = () => {
  return [{ title: "Trellify Signup" }];
};

export async function action({ request }: ActionFunctionArgs) {
  let formData = await request.formData();

  let email = String(formData.get("email") || "");
  let password = String(formData.get("password") || "");

  let errors = await validate(email, password);
  if (errors) {
    return json({ ok: false, errors }, 400);
  }

  let user = await createAccount(email, password);
  return setAuthOnResponse(redirect("/home"), user.id);
}

export default function Signup() {
  const data = useActionData<typeof action>();

  return (
    <div className="flex min-h-full flex-1 flex-col mt-20 sm:px-6 lg:px-8">
      <div className="space-y-6 mx-auto border-2 rounded-lg p-10 md:min-w-[600px]">
        <h2 className="text-center font-semibold text-2xl">Sign Up</h2>
        <Form className="space-y-6 " method="post">
          <TextField type="email" className="space-y-2 grid">
            <Label>Email</Label>
            <Input placeholder="Email" name="email" />
            <Text className="text-red-400 ml-2" slot="description">
              {data && data.errors?.email && data.errors.email}
            </Text>
          </TextField>
          <TextField type="password" className="space-y-2 grid">
            <Label>Password</Label>
            <Input placeholder="Password" name="password" />
            {data && data.errors?.password && (
              <Text className="text-red-400 ml-2" slot="description">
                {data.errors?.password}
              </Text>
            )}
          </TextField>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </div>
  );
}

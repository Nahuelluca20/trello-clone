import { z } from "zod";
import { accountExists } from "./queries";
import { json } from "@remix-run/node";

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Invalid password uses at least 6 characters " }),
});

export async function validate(request: Request) {
  const formPayload = Object.fromEntries(await request.formData());

  const parsed = signUpSchema.safeParse(formPayload);

  if (!parsed.success) {
    return json({ error: parsed.error.format() });
  }
  let email = parsed.data.email;
  let password = parsed.data.password;

  let errors: { email?: string; password?: string } = {
    email: parsed.data.email,
    password: parsed.data.password,
  };

  if (!email) {
    errors.email = "Email is required.";
  } else if (!email.includes("@")) {
    errors.email = "Please enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  }

  if (!errors.email && (await accountExists(email))) {
    errors.email = "An account with this email already exists.";
  }

  return Object.keys(errors).length ? errors : null;
}

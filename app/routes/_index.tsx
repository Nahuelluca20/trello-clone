import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import {
  Button,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
  TextField,
  Text,
} from "react-aria-components";
import { z } from "zod";

export default function Index() {
  const data = useActionData<typeof action>();
  console.log(data);
  return (
    <main>
      <h1>Welcome to Remix</h1>
      <Form method="post" className="space-y-2">
        <TextField className="grid max-w-80 space-y-1">
          <Label>Name</Label>
          <Input placeholder="Board name" name="name" />
          {data && data.error.name && (
            <Text className="text-red-400 ml-2" slot="description">
              {data.error.name._errors[0]}
            </Text>
          )}
        </TextField>
        <Select
          name="label"
          className="space-y-2"
          placeholder="Select label for board"
        >
          <Label>Select label</Label>
          <Button data-outline>
            <SelectValue />
            <span aria-hidden="true">▼</span>
          </Button>

          <Popover>
            <ListBox className="min-w-52 text-waikawa-gray-950 font-semibold space-y-2 bg-waikawa-gray-300 py-2 rounded-lg">
              <ListBoxItem id="personal">Personal</ListBoxItem>
              <ListBoxItem id="work">Work</ListBoxItem>
              <ListBoxItem id="study">Study</ListBoxItem>
            </ListBox>
          </Popover>
          {data && data.error.label && (
            <Text className="text-red-400 ml-2 pt-10" slot="description">
              {data.error.label._errors[0]}
            </Text>
          )}
        </Select>
        {/* {error && error?.error && <p>{error?.error}</p>} */}
        <Button
          type="submit"
          style={{
            marginTop: "20px",
          }}
        >
          Create
        </Button>
      </Form>
    </main>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formPayload = Object.fromEntries(await request.formData());
  const boardSchema = z.object({
    name: z.string().min(2, { message: "Board name is required" }),
    label: z.string().min(2, { message: "Select one label" }),
  });

  const parsed = boardSchema.safeParse(formPayload);
  if (!parsed.success) {
    // return json({ error: parsed.error.errors[0].message });
    return json({ error: parsed.error.format() });
  }

  return null;
}

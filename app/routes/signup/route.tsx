import { Form, TextField, Label, Input, Button } from "react-aria-components";

export default function Signup() {
  return (
    <div className="flex min-h-full flex-1 flex-col mt-20 sm:px-6 lg:px-8">
      <div className="space-y-6 mx-auto border-2 rounded-lg p-10 md:min-w-[600px]">
        <h2 className="text-center font-semibold text-2xl">Sign Up</h2>
        <Form className="space-y-6 " method="post">
          <TextField type="email" className="space-y-2 grid">
            <Label>Email</Label>
            <Input placeholder="Email" name="email" />
            {/* <Text className="text-red-400 ml-2" slot="description">
          {data && data.error?.email && data.error.email?._errors[0]}
        </Text> */}
          </TextField>
          <TextField type="password" className="space-y-2 grid">
            <Label>Password</Label>
            <Input placeholder="Password" name="password" />
            {/* {data && data.error?.password && (
          <Text className="text-red-400 ml-2" slot="description">
            {data.error?.password?._errors[0]}
          </Text>
        )} */}
          </TextField>
          {/* {data && data.errors?.password && (
        <Text className="text-red-400 ml-2" slot="description">
          {data.errors?.password}
        </Text>
      )} */}
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </div>
  );
}

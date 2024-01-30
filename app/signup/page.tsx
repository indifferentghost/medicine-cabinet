'use client'
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Output, email, minLength, object, string, toTrimmed } from "valibot";

// TODO:TD-30-01-24 this should be moved
export const credentialsSchema = object({
  email: string([toTrimmed(), minLength(1), email()]),
  password: string([toTrimmed(), minLength(1)]),
});

export default function SignIn() {
  const form = useForm<Output<typeof credentialsSchema>>({
    resolver: valibotResolver(credentialsSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: Output<typeof credentialsSchema>) {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    console.log(response)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type="email" {...field} />
              </FormControl>
              <FormDescription>
                This is the email associated with your account
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input placeholder="" type="password" {...field} />
              </FormControl>
              <FormDescription>
                This is your secret password.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

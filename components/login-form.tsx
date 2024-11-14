"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { signIn } from "next-auth/react";

const formSchema = z.object({
  usernameOrEmail: z
    .string()
    .min(3, { message: "Please provide a valid username or email" }),
  password: z.string().min(6, { message: "Minimum of 6 characters" }),
});

const LoginForm = ({
  darkBg,
  callbackUrl,
}: {
  darkBg?: Boolean;
  callbackUrl: string;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // signIn("credentials", {
    //   callbackUrl: callbackUrl,
    //   ...values,
    // });
  };

  return (
    <div className="w-full bg-black/5 p-10 rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            name="usernameOrEmail"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={darkBg ? "text-white" : ""}>
                  Username or Email
                </FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={darkBg ? "text-white" : ""}>
                  Password
                </FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="text-right">
            <Button type="submit">Login</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;

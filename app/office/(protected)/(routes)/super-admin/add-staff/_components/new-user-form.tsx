"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import FormInput from "@/components/form-input";
import { startTransition } from "react";
import { newUserRegistration } from "@/lib/actions";
import { APIResponseObject } from "@/types";
import ConfirmPin from "@/components/confirm-pin";

const formSchema = z
  .object({
    userName: z
      .string()
      .min(3, {
        message: "minimum of 3 characters (must start a letter)",
      })
      .regex(/^[a-zA-Z][a-zA-Z0-9]+$/, {
        message:
          "Can only contain alphanumeric characters starting with letters",
      })
      .trim()
      .refine((s) => !s.includes(" "), "Ensure No Spaces!"),
    email: z.string().email({ message: "Please provide a valid Email" }),
    password: z.string().min(6, { message: "at least 6 characters" }),
    confirmPassword: z.string().min(6),
    role: z.string().min(2, { message: "Please select a role" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords dont match",
    path: ["confirmPassword"],
  });
const roles = ["Trip_Staff", "Staff", "Admin", "Super_Admin", "Developer"];

const NewUserForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const validatePin = () => {
    document.getElementById("user-reg")?.click();
  };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(() => {
      newUserRegistration(values).then((data: APIResponseObject) => {
        if (data.success) {
          toast({
            description: "User created Please Continue with staff details",
          });
          router.push(`/office/super-admin/staff/${data.user.id}`);
        } else
          toast({
            variant: "destructive",
            description: data.message,
          });
      });
    });
  };
  return (
    <div className="border shadow-sm p-8 rounded-lg w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(validatePin)}
          className="w-full space-y-6"
        >
          <FormInput
            control={form.control}
            name="userName"
            label="Username"
            type="text"
            placeholder="e.g jane.jones"
          />
          <FormInput
            control={form.control}
            name="email"
            label="Email"
            type="email"
            placeholder="e.g janejones@example.com"
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role.replace("_", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormInput
            control={form.control}
            name="password"
            label="Password"
            type="password"
            placeholder="min 6 characters"
          />
          <FormInput
            control={form.control}
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="min 6 characters"
          />
          <ConfirmPin
            id="user-reg"
            name="Submit"
            action={form.handleSubmit(onSubmit)}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default NewUserForm;

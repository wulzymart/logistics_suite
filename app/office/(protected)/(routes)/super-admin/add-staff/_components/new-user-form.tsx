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
import { Input } from "@/components/ui/input";
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
import FormSelect from "@/components/form-select";
const formSchema = z
  .object({
    userName: z.string().min(3, { message: "must have minimum of 3 letters" }),
    email: z
      .string()
      .email({ message: "Please provide a valid Email" })
      .optional(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    role: z.string(),
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
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const valuesCopy: any = values;
    delete valuesCopy.confirmPassword;
    await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(valuesCopy),
    })
      .then(async (res) => {
        const resData = await res.json();

        if (res.ok) {
          toast({
            description: "User created Please Continue with staff details",
          });
          router.push(`/office/super-admin/staff/${resData?.id}`);
        } else if (resData?.code === "P2002") {
          const errorKey = resData.meta.target;
          if (errorKey.includes("userName"))
            toast({
              variant: "destructive",
              description: "User with the username already exists",
            });
          else
            toast({
              variant: "destructive",
              description: "User with the email already exists",
            });
        }
      })
      .catch((error) => {
        toast({
          description: "An error occured, try again later",
          variant: "destructive",
        });
      });
  };
  return (
    <div className="border shadow-sm p-8 rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          <FormSelect
            data={roles}
            name="role"
            label="Role"
            control={form.control}
            placeholder="Select Role"
          />
          {/* <FormField
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
          /> */}
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default NewUserForm;

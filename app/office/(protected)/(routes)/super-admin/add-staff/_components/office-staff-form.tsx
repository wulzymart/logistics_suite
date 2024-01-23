"use client";

import { UseFormReturn, useForm } from "react-hook-form";
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
import FormInput from "@/components/form-input";

const OfficeStaffForm = () => {
  return <div className="border shadow-sm p-8 rounded-lg w-full">
  <Form {...form}>
    <form className="w-full space-y-6">
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
    </form>
  </Form>
</div>;
};

export default OfficeStaffForm;

"use client";

import { UseFormReturn, useForm } from "react-hook-form";
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
import FormInput from "@/components/form-input";

const roles = ["Trip_Staff", "Staff", "Admin", "Super_Admin", "Developer"];

const NewUserForm = ({
  form,
}: {
  form: UseFormReturn<
    {
      role: string;
      email: string;
      password: string;
      userName: string;
      confirmPassword: string;
    },
    any,
    undefined
  >;
}) => {
  return (
    
  );
};



"use client";

import { UseFormReturn } from "react-hook-form";
import { Form, FormLabel } from "@/components/ui/form";

import FormInput from "@/components/form-input";
import FormTextarea from "@/components/form-textarea";

const NextOfKinForm = ({
  form,
}: {
  form: UseFormReturn<
    {
      address: string;
      name: string;
      phoneNumber: string;
    },
    any,
    undefined
  >;
}) => {
  return (
    <div className="border shadow-sm p-8 rounded-lg w-full">
      <Form {...form}>
        <form className="w-full space-y-6">
          <FormLabel className="">Next of Kin Information</FormLabel>
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              control={form.control}
              name="name"
              label="Full name"
              type="text"
              placeholder="e.g jane jones"
            />
            <FormInput
              control={form.control}
              name="phoneNumber"
              label="Phone number"
              type="text"
              placeholder="e.g +23409123456789"
            />
          </div>

          <FormTextarea
            name="address"
            control={form.control}
            label="Street address"
            placeholder="e.g 10 Ajayi Street, Ikeja, Lagos"
          />
        </form>
      </Form>
    </div>
  );
};

export default NextOfKinForm;

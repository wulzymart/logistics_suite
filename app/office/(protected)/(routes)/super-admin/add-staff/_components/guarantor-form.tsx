"use client";

import { UseFormReturn } from "react-hook-form";
import { Form, FormLabel } from "@/components/ui/form";

import FormInput from "@/components/form-input";
import FormTextarea from "@/components/form-textarea";

const GuarantorForm = ({
  form,
}: {
  form: UseFormReturn<
    {
      name1: string;
      phoneNumber1: string;
      name2: string;
      phoneNumber2: string;
    },
    any,
    undefined
  >;
}) => {
  return (
    <div className="border shadow-sm p-8 rounded-lg w-full">
      <Form {...form}>
        <form className="w-full space-y-6">
          <FormLabel>Guarantor 1</FormLabel>
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              control={form.control}
              name="name1"
              label="Full name"
              type="text"
              placeholder="e.g jane jones"
            />
            <FormInput
              control={form.control}
              name="phoneNumber1"
              label="Phone number"
              type="text"
              placeholder="e.g +23409123456789"
            />
          </div>
          <FormLabel>Guarantor 2</FormLabel>
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              control={form.control}
              name="name2"
              label="Full name"
              type="text"
              placeholder="e.g jane jones"
            />
            <FormInput
              control={form.control}
              name="phoneNumber2"
              label="Phone number"
              type="text"
              placeholder="e.g +23409123456789"
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default GuarantorForm;

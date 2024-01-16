"use client";

import { UseFormReturn } from "react-hook-form";
import { Form, FormLabel } from "@/components/ui/form";

import FormInput from "@/components/form-input";
import FormTextarea from "@/components/form-textarea";

const SalaryInfoForm = ({
  form,
}: {
  form: UseFormReturn<
    {
      bankName: string;
      bankAccount: string;
      grossSalary: number;
      tax: number;
      pension: number;
      otherDeductions: number;
    },
    any,
    undefined
  >;
}) => {
  return (
    <div className="border shadow-sm p-8 rounded-lg w-full">
      <Form {...form}>
        <form className="w-full space-y-6">
          <FormLabel className="">Salary information (NGN)</FormLabel>
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              control={form.control}
              name="grossSalary"
              label="Gross salary"
              type="number"
              placeholder="e.g 100000"
            />
            <FormInput
              control={form.control}
              name="tax"
              label="Tax"
              type="number"
              placeholder="e.g 10000"
            />
            <FormInput
              control={form.control}
              name="pension"
              label="Pension"
              type="number"
              placeholder="e.g 10000"
            />
            <FormInput
              control={form.control}
              name="otherDeductions"
              label="Other deductions"
              type="number"
              placeholder="e.g 10000"
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SalaryInfoForm;

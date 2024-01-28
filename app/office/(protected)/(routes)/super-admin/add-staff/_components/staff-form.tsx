"use client";
import { UseFormReturn, useForm } from "react-hook-form";
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
import FormInput from "@/components/form-input";
import { Lga, State } from "@prisma/client";
import FormTextarea from "@/components/form-textarea";
import { compare } from "@/lib/utils";
import { GetStates, Getlgas } from "@/hooks/states_lga";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const staffFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  middleName: z.string().nullable(),
  gender: z.enum(["male", "female"]),
  phoneNumbers: z
    .string()
    .min(11, { message: "Please provide valid phone numbers" }),
  qualifications: z.string().min(0).nullable(),

  dateOfBirth: z.date().nullable(),
});
const StaffInfoForm = ({
  form,
}: {
  form: UseFormReturn<
    {
      firstName: string;
      lastName: string;
      middleName: string | null;
      gender: "" | "male" | "female";
      phoneNumbers: string;
      state: string;
      address: string;
    },
    any,
    undefined
  >;
}) => {
  const {
    isLoading: isLoadingStates,
    data: statesData,
    isError: isErrorStates,
  } = GetStates();
  return (
    <div className="border shadow-sm p-8 rounded-lg w-full">
      <Form {...form}>
        <form className="w-full space-y-6">
          <div className="flex w-full gap-4">
            <FormInput
              control={form.control}
              name="firstName"
              label="First Name"
              type="text"
              placeholder="e.g Jones"
            />
            <FormInput
              control={form.control}
              name="lastName"
              label="Last Name"
              type="text"
              placeholder="e.g Jack"
            />
          </div>
          <div className="flex w-full gap-4">
            <FormInput
              control={form.control}
              name="middleName"
              label="middle Name"
              type="text"
              placeholder="e.g Jones"
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full gap-4">
            <FormInput
              control={form.control}
              type="text"
              label="Phone Numbers"
              message="seperated by spaces"
              name="phoneNumbers"
              placeholder="e.g +2348123456789 +2348081730978"
            />
          </div>
          <div className="space-y-4">
            <FormLabel className="mb-4">Address</FormLabel>
            <div className="flex gap-4 w-full">
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <SelectTrigger
                          disabled={
                            isErrorStates ||
                            isLoadingStates ||
                            !statesData.success
                          }
                          className="w-full"
                        >
                          {field.value ? (
                            <SelectValue
                              placeholder="Select State"
                              className="w-full"
                            />
                          ) : (
                            "Select State"
                          )}
                        </SelectTrigger>
                        <SelectContent>
                          {!isLoadingStates &&
                            !isErrorStates &&
                            statesData.states
                              .sort(compare)
                              .map((state: State) => (
                                <SelectItem key={state.id} value={state.name}>
                                  {state.name}
                                </SelectItem>
                              ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormTextarea
              name="address"
              control={form.control}
              label="Address"
              placeholder="e.g 10 Ajayi Street, Ikeja, Lagos"
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StaffInfoForm;

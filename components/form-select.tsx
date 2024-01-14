import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Select, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { SelectContent } from "@radix-ui/react-select";
import { Control } from "react-hook-form";

const FormSelect = ({
  control,
  name,
  label,
  placeholder,
  data,
  isLoading = false,
}: {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  isLoading?: boolean;
  data: any[];
}) => {
  return (
    <div className="relative">
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className=" border-2 top-4">
                  {isLoading ? (
                    <SelectItem value="">{label}</SelectItem>
                  ) : (
                    data.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role.replace("_", " ")}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FormSelect;

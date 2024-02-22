"use client";
import ConfirmPin from "@/components/confirm-pin";
import FormInput from "@/components/form-input";
import { Button } from "@/components/ui/button";
import { Form, FormLabel } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { addAdditionalCharge, addShipmentType } from "@/lib/actions";
import { additionalChargeSchema, shipmentTypeSchema } from "@/lib/zodSchemas";
import { APIResponseObject } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const AddAdditionalCharge = () => {
  const form = useForm<z.infer<typeof additionalChargeSchema>>({
    resolver: zodResolver(additionalChargeSchema),
    defaultValues: {
      name: "",
    },
  });
  const validatePin = () => {
    document.getElementById("submit-additional-charge")?.click();
  };
  const { mutate } = useMutation({
    mutationKey: ["additional-charges"],
    mutationFn: async () => {
      const data: APIResponseObject = await addAdditionalCharge(
        form.getValues()
      );
      if (!data.success) throw new Error(data.message);
      return data;
    },
  });
  const onSubmit = () => {
    mutate(undefined, {
      onSuccess: (data) => {
        toast({
          description: data.message,
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };
  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(validatePin)}
          className="border shadow-sm p-8 rounded-lg w-full space-y-6"
        >
          <FormLabel>Register additional charge name</FormLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <FormInput
              control={form.control}
              name="name"
              label="Type"
              type="text"
              placeholder="eg, Packing"
            />
            <ConfirmPin id="submit-additional-charge" action={onSubmit} />
            <Button type="submit">Add {form.watch("name")}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddAdditionalCharge;

"use client";
import ConfirmPin from "@/components/confirm-pin";
import FormInput from "@/components/form-input";
import { Button } from "@/components/ui/button";
import { Form, FormLabel } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { addItemType } from "@/lib/actions";
import { itemTypeSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";

const AddItemType = () => {
  const form = useForm<z.infer<typeof itemTypeSchema>>({
    resolver: zodResolver(itemTypeSchema),
    defaultValues: {
      name: "",
      priceFactor: 1,
    },
  });
  const validatePin = () => {
    document.getElementById("submit-item-type")?.click();
  };
  const { mutate } = useMutation({
    mutationKey: ["item-types"],
    mutationFn: async () => await addItemType(form.getValues()),
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
          <FormLabel>Add item type</FormLabel>
          <div className={` grid grid-cols-1 md:grid-cols-3 gap-6 items-end`}>
            <FormInput
              control={form.control}
              name="name"
              label="Type"
              type="text"
              placeholder="Flamable"
            />
            <FormInput
              control={form.control}
              name="priceFactor"
              label="Price factor"
              type="number"
            />
            <ConfirmPin id="submit-item-type" action={onSubmit} />
            <Button type="submit">Add {form.watch("name")}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddItemType;

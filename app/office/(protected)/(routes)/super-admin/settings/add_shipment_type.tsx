"use client";
import ConfirmPin from "@/components/confirm-pin";
import FormInput from "@/components/form-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { addItemType } from "@/lib/actions";
import { itemTypeSchema, shipmentTypeSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";

const AddItemCartegory = () => {
  const form = useForm<z.infer<typeof shipmentTypeSchema>>({
    resolver: zodResolver(itemTypeSchema),
    defaultValues: {
      name: "",
      price: 0,
      ppw: 0,
      minWeight: 0,
      maxWeight: 0,
    },
  });
  const validatePin = () => {
    document.getElementById("submit-item-type")?.click();
  };
  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(validatePin)}
          className="w-full space-y-6"
        >
          <div
            className={`border shadow-sm p-8 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-6`}
          >
            <FormInput
              control={form.control}
              name="name"
              label="Type"
              type="text"
              placeholder="Flammable"
            />
            <FormInput
              control={form.control}
              name="priceFactor"
              label="Price factor"
              type="number"
            />
            <ConfirmPin
              id="submit-item-type"
              action={form.handleSubmit(addItemType)}
            />
            <Button type="submit">Add {form.watch("name")}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddItemCartegory;

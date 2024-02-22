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
import { addShipmentType } from "@/lib/actions";
import { shipmentTypeSchema } from "@/lib/zodSchemas";
import { APIResponseObject } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const AddShipmentType = () => {
  const [pricingType, setPricingType] = useState("");

  const form = useForm<z.infer<typeof shipmentTypeSchema>>({
    resolver: zodResolver(shipmentTypeSchema),
    defaultValues: {
      name: "",
      price: 0,
      ppw: 0,
      minWeight: 0,
      maxWeight: 0,
    },
  });
  const validatePin = () => {
    document.getElementById("submit-shipment-type")?.click();
  };
  const { mutate } = useMutation({
    mutationKey: ["shipment-types"],
    mutationFn: async () => {
      const data: APIResponseObject = await addShipmentType(form.getValues());
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
          <FormLabel>Add shipment type</FormLabel>
          <div
            className={`grid grid-cols-1 ${
              pricingType === "flat" ? "md:grid-cols-4" : "md:grid-cols-3"
            } gap-6 items-end justify-center`}
          >
            <FormInput
              control={form.control}
              name="name"
              label="Type"
              type="text"
              placeholder="eg, Parcel"
            />
            <Select
              onValueChange={(e) => {
                setPricingType(e);
                e === "flat" && form.setValue("ppw", 0);
                e === "flat" && form.setValue("maxWeight", 0);
                e === "flat" && form.setValue("minWeight", 0);
                e === "ppw" && form.setValue("price", 0);
              }}
              defaultValue={pricingType}
              value={pricingType}
            >
              <SelectTrigger className="w-full">
                {pricingType ? (
                  <SelectValue
                    placeholder="Select pricing type"
                    className="w-full"
                  />
                ) : (
                  "Select pricing type"
                )}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flat">Flat Price</SelectItem>
                <SelectItem value="ppw">Price per weight</SelectItem>
              </SelectContent>
            </Select>
            {pricingType === "flat" && (
              <FormInput
                control={form.control}
                name="price"
                label="Price"
                type="number"
              />
            )}
            {pricingType === "ppw" && (
              <FormInput
                control={form.control}
                name="ppw"
                label="Price/Kg"
                type="number"
              />
            )}
            {pricingType === "ppw" && (
              <FormInput
                control={form.control}
                name="minWeight"
                label="Minimum Weight"
                type="number"
              />
            )}
            {pricingType === "ppw" && (
              <FormInput
                control={form.control}
                name="maxWeight"
                label="Maximum Weight"
                type="number"
              />
            )}

            <ConfirmPin id="submit-shipment-type" action={onSubmit} />
            <Button type="submit">Add {form.watch("name")}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddShipmentType;

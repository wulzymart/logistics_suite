"use client";
import ConfirmPin from "@/components/confirm-pin";
import FormInput from "@/components/form-input";
import { Button } from "@/components/ui/button";
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
import { toast } from "@/components/ui/use-toast";
import { GetAdditionalCharges } from "@/hooks/additional-charges";
import { delAdditionalCharge } from "@/lib/actions";
import { compare } from "@/lib/utils";
import { remTypeSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdditonalCharge, ShipmentType } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";

const RemAdditionalCharge = () => {
  const { isLoading, isError, data } = GetAdditionalCharges();
  const form = useForm<z.infer<typeof remTypeSchema>>({
    resolver: zodResolver(remTypeSchema),
    defaultValues: {
      name: "",
    },
  });
  const validatePin = () => {
    document.getElementById("del-additional-charge")?.click();
  };
  const { mutate } = useMutation({
    mutationKey: ["additional-charges"],
    mutationFn: async () => await delAdditionalCharge(form.getValues().name),
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
          className=" border shadow-sm p-8 rounded-lg w-full space-y-6"
        >
          <FormLabel>Remove additional charge name</FormLabel>
          <div className={`grid grid-cols-1 gap-6`}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        {field.value ? (
                          <SelectValue
                            placeholder="Select type"
                            className="w-full"
                          />
                        ) : (
                          "Select type"
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        {!isLoading &&
                          !isError &&
                          data.additionalCharges
                            .sort(compare)
                            .map((charge: AdditonalCharge) => (
                              <SelectItem key={charge.id} value={charge.name}>
                                {charge.name}
                              </SelectItem>
                            ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ConfirmPin id="del-additional-charge" action={onSubmit} />
            <Button type="submit">Remove {form.watch("name")}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RemAdditionalCharge;

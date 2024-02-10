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
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { GetItemTypes } from "@/hooks/item-types";
import { addItemType } from "@/lib/actions";
import { remTypeSchema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";

const RemItemType = () => {
  const {} = GetItemTypes;
  const form = useForm<z.infer<typeof remTypeSchema>>({
    resolver: zodResolver(remTypeSchema),
    defaultValues: {
      name: "",
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
          className="w-full space-y-6"
        >
          <FormLabel>Add item type</FormLabel>
          <div
            className={`border shadow-sm p-8 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-6`}
          >
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
            <ConfirmPin id="submit-item-type" action={onSubmit} />
            <Button type="submit">Add {form.watch("name")}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RemItemType;

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Lga, State, Station } from "@prisma/client";
import GetLGA from "@/app/hooks/lga";
import FormTextarea from "@/components/form-textarea";
import { Button } from "@/components/ui/button";
import ConfirmPin from "@/components/confirm-pin";
import { startTransition } from "react";
import { addStation } from "@/lib/actions";
import { APIResponseObject } from "@/types";
import { toast } from "@/components/ui/use-toast";

export function compare(a: State | Lga, b: State | Lga) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}
const formSchema = z.object({
  name: z.string().min(3, { message: "Name is a minimum of 3 characters" }),
  shortCode: z
    .string()
    .min(2, { message: "Station code can only be 2 or 3 characters" })
    .max(3, { message: "Station code can only be 2 or 3 characters" }),
  state: z.string().min(2, { message: "Please select a state" }),
  lgaId: z.string().min(2, { message: "Please select a LGA" }),
  lga: z.string(),
  address: z.string().min(10, { message: "Provide a detailed street address" }),
  phoneNumbers: z
    .string()
    .min(10, { message: "Please Provide valid Phone numbers" }),
});

const StationForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      shortCode: "",
      state: "",
      lgaId: "",
      address: "",
      phoneNumbers: "",
      lga: "",
    },
  });
  const { isLoading, data, isError } = useQuery({
    queryKey: ["states_list"],
    queryFn: async () => {
      const { data } = await axios.get("/api/states");
      return data;
    },
  });

  const lgas = GetLGA(form.watch("state"));
  const validatePin = () => {
    (document.getElementById("station-reg") as HTMLDialogElement)?.click();
  };
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const lga: Lga = JSON.parse(values.lgaId);

    values.lga = lga.name;
    values.lgaId = lga.id;
    // (values as any).lgaId = lga.id;
    startTransition(() => {
      addStation(values).then((data: APIResponseObject) => {
        if (data.success) {
          toast({
            description: data.message,
          });
          form.reset();
        } else {
          toast({
            description: data.message,
            variant: "destructive",
          });
        }
      });
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(validatePin)}
        className="flex flex-col gap-8"
      >
        <div className="flex gap-4 w-full">
          <FormInput
            control={form.control}
            type="text"
            label="Station Name"
            name="name"
            placeholder="e.g Lagos 1"
          />
          <FormInput
            control={form.control}
            type="text"
            label="Station Code"
            name="shortCode"
            placeholder="e.g LG1"
          />
        </div>
        <FormInput
          control={form.control}
          type="text"
          label="Station Phone Numbers"
          message="seperated by spaces"
          name="phoneNumbers"
          placeholder="e.g +2348123456789 +2348081730978"
        />
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
                  >
                    <SelectTrigger
                      disabled={isError || isLoading || !data.success}
                      className="w-full"
                    >
                      <SelectValue
                        placeholder="Select State"
                        className="w-full"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {!isLoading &&
                        !isError &&
                        data.states.sort(compare).map((state: State) => (
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
          <FormField
            control={form.control}
            name="lgaId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>LGA</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      disabled={
                        isError ||
                        isLoading ||
                        lgas.isError ||
                        lgas.isLoading ||
                        !lgas.data.success
                      }
                      className="w-full"
                    >
                      <SelectValue placeholder="Select LGA" />
                    </SelectTrigger>
                    <SelectContent>
                      {!lgas.isLoading &&
                        !lgas.isError &&
                        lgas.data.lgas.sort(compare).map((lga: Lga) => (
                          <SelectItem key={lga.id} value={JSON.stringify(lga)}>
                            {lga.name}
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
        <ConfirmPin
          id="station-reg"
          name="Add station"
          action={form.handleSubmit(onSubmit)}
        />
        <Button size="lg" type="submit">
          Add Station
        </Button>
      </form>
    </Form>
  );
};

export default StationForm;

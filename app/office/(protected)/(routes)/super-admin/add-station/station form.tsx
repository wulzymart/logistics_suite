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
import { useQuery, useMutation } from "@tanstack/react-query";
import { Lga, State, Station } from "@prisma/client";
import FormTextarea from "@/components/form-textarea";
import { Button } from "@/components/ui/button";
import ConfirmPin from "@/components/confirm-pin";
import { startTransition } from "react";
import { addStation, getStates } from "@/lib/actions";
import { APIResponseObject } from "@/types";
import { toast } from "@/components/ui/use-toast";
import { stationFormSchema } from "@/lib/zodSchemas";
import { compare } from "@/lib/utils";
import { GetStates, Getlgas } from "@/hooks/states_lga";

const StationForm = () => {
  const form = useForm<z.infer<typeof stationFormSchema>>({
    resolver: zodResolver(stationFormSchema),
    defaultValues: {
      name: "",
      shortCode: "",
      state: "",
      lga: "",
      address: "",
      phoneNumbers: "",
    },
  });
  const {
    isLoading: isLoadingStates,
    data: statesData,
    isError: isErrorStates,
  } = GetStates();
  let state = form.watch("state");
  const {
    isLoading: isLoadingLgas,
    isError: isErrorLgas,
    data: lgasData,
  } = Getlgas(state);
  const { mutate } = useMutation({
    mutationKey: ["stations_list", `${state}-stations`],
    mutationFn: async (values: z.infer<typeof stationFormSchema>) => {
      if (!values) throw Error;
      const data = await addStation(values);
      if (!data.success) throw Error(data.message);
      return data;
    },
  });
  const validatePin = () => {
    (document.getElementById("station-reg") as HTMLDialogElement)?.click();
  };
  const onSubmit = (values: z.infer<typeof stationFormSchema>) => {
    console.log(values);

    mutate(values, {
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
                    value={field.value}
                  >
                    <SelectTrigger
                      disabled={
                        isErrorStates || isLoadingStates || !statesData.success
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
                        statesData.states.sort(compare).map((state: State) => (
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
            name="lga"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>LGA</FormLabel>
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
                        isErrorLgas ||
                        isLoadingLgas ||
                        !lgasData.success
                      }
                      className="w-full"
                    >
                      {field.value ? (
                        <SelectValue placeholder="Select LGA" />
                      ) : !state ? (
                        "Awaiting state"
                      ) : isErrorLgas || isLoadingLgas ? (
                        "Loading..."
                      ) : (
                        "Select LGA"
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      {!isLoadingLgas &&
                        !isErrorLgas &&
                        lgasData?.lgas?.sort(compare).map((lga: Lga) => (
                          <SelectItem key={lga.id} value={lga.name}>
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
          label="Street address"
          placeholder="e.g 10 Ajayi Street, Ikeja, Lagos"
        />
        <ConfirmPin
          id="station-reg"
          name="Add station"
          action={form.handleSubmit(onSubmit)}
        />
        <Button
          size="lg"

          type="button"
          onClick={() => form.handleSubmit(validatePin)()}>
          Add Station
        </Button>
      </form>
    </Form>
  );
};

export default StationForm;

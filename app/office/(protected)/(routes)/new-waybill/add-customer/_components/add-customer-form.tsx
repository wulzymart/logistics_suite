"use client";
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
import { State } from "@prisma/client";
import FormTextarea from "@/components/form-textarea";
import { compare } from "@/lib/utils";
import { GetStates, Getlgas } from "@/hooks/states_lga";
import { useMutation, useQuery } from "@tanstack/react-query";
import { newCustomerShema } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import ConfirmPin from "@/components/confirm-pin";
import { toast } from "@/components/ui/use-toast";
import { addCustomer } from "@/lib/actions";
import { SetCustomer } from "@/contexts/new-waybill-context";
import { useRouter } from "next/navigation";

const AddCustomerForm = () => {
  const setCustomer = SetCustomer();
  const router = useRouter();
  const form = useForm<z.infer<typeof newCustomerShema>>({
    resolver: zodResolver(newCustomerShema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      address: {
        state: "",
        streetAddress: "",
      },
    },
    mode: "onTouched",
  });
  const {
    isLoading: isLoadingStates,
    data: statesData,
    isError: isErrorStates,
  } = GetStates();
  const validatePin = () => {
    document.getElementById("customer-reg")?.click();
  };
  const { mutate } = useMutation({
    mutationFn: async () => {
      const values = form.getValues();
      const data = await addCustomer(values);
      if (!data.success) throw Error(data.message);
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
        setCustomer(data.customer);
        return router.push("/office/new-waybill?path=order");
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
    <div className="border shadow-sm p-8 rounded-lg w-full">
      <Form {...form}>
        <form
          className="w-full space-y-6"
          onSubmit={form.handleSubmit(validatePin)}
        >
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
              type="tel"
              label="Phone Number"
              name="phoneNumber"
              placeholder="e.g +2348123456789"
            />
            <FormInput
              control={form.control}
              type="email"
              label="Email"
              name="email"
              placeholder="e.g example@example.com"
            />
          </div>
          <div className="space-y-4">
            <FormLabel className="mb-4">Address</FormLabel>
            <div className="flex gap-4 w-full">
              <FormField
                control={form.control}
                name="address.state"
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
              name="address.streetAddress"
              control={form.control}
              label="Address"
              placeholder="e.g 10 Ajayi Street, Ikeja, Lagos"
            />
          </div>
          <div className="flex flex-col md:flex-row w-full justify-center gap-8">
            <ConfirmPin id="customer-reg" name="Submit" action={onSubmit} />
            <Button
              variant="destructive"
              size="lg"
              type="button"
              onClick={() => router.push("/office/new-waybill")}
            >
              Cancel
            </Button>
            <Button size="lg" type="submit">
              Save & Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddCustomerForm;

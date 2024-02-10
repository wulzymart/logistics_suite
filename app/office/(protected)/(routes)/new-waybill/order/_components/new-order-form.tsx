"use client";

import { GetCustomer } from "@/contexts/new-waybill-context";
import { orderSchema } from "@/lib/zodSchemas";
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
import { State, Station } from "@prisma/client";
import FormTextarea from "@/components/form-textarea";
import { compare } from "@/lib/utils";
import { GetStates, Getlgas } from "@/hooks/states_lga";
import { useMutation, useQuery } from "@tanstack/react-query";
import { newCustomerShema } from "@/lib/zodSchemas";
import { Button } from "@/components/ui/button";
import ConfirmPin from "@/components/confirm-pin";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { GetStations } from "@/hooks/stations";

const NewOrderForm = () => {
  const router = useRouter();
  const customer = GetCustomer();
  // if (!customer) router.replace("/office/new-waybill");
  const orderForm = useForm<z.infer<typeof orderSchema>>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      deliveryArea: "",
      serviceType: "",
      deliveryType: "",
      originStation: "",
      destinationStation: "",
      receiver: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: {
          state: "",
          address: "",
        },
      },
      item: {
        category: "",
        type: "",
        condition: "",
        description: "",
        quantity: 1,
        value: 0,
        weight: 0,
      },
      charges: {
        freightPrice: 0,
        additionalService: [{ name: "", price: 0 }],
        totalAdditionalService: 0,
        VAT: 0,
        subTotal: 0,
        Total: 0,
      },
    },
  });

  const deliveryArea = orderForm.watch("deliveryArea");

  const {
    isLoading: isLoadingStations,
    isError: isErrorStations,
    data: stationsData,
  } = GetStations();
  const {
    isLoading: isLoadingStates,
    data: statesData,
    isError: isErrorStates,
  } = GetStates();

  const { fields, append } = useFieldArray({
    name: "charges.additionalService",
    control: orderForm.control,
  });
  return (
    <div className="w-full">
      <Form {...orderForm}>
        <form className="w-full space-y-6">
          <div
            className={`border shadow-sm p-8 rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`}
          >
            <FormField
              control={orderForm.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Service Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        {field.value ? (
                          <SelectValue
                            placeholder="Select Type"
                            className="w-full"
                          />
                        ) : (
                          "Select Type"
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Regular">Regular</SelectItem>
                        <SelectItem value="Express">Express</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={orderForm.control}
              name="deliveryArea"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Delivery Area</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(e) => {
                        field.onChange(e);
                        e === "local" &&
                          orderForm.setValue("deliveryType", "station_to_door");
                      }}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        {field.value ? (
                          <SelectValue
                            placeholder="Select Area"
                            className="w-full"
                          />
                        ) : (
                          "Select Area"
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">local</SelectItem>
                        <SelectItem value="intrastate">same state</SelectItem>
                        <SelectItem value="interstate">
                          state-to-state
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={orderForm.control}
              name="deliveryType"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Delivery Type</FormLabel>
                  <FormControl>
                    <Select
                      disabled={deliveryArea === "local"}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        {field.value ? (
                          <SelectValue
                            placeholder="Select Type"
                            className="w-full"
                          />
                        ) : (
                          "Select Type"
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="station_to_station">
                          station-to-station
                        </SelectItem>
                        <SelectItem value="pickup_to_station">
                          pickup-to-station
                        </SelectItem>
                        <SelectItem value="station_to_door">
                          station-to-door
                        </SelectItem>
                        <SelectItem value="pickup_to_door">
                          pickup-to-door
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={orderForm.control}
              name="originStation"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Station</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <SelectTrigger disabled={true} className="w-full">
                        {field.value ? (
                          <SelectValue placeholder="Select station" />
                        ) : isErrorStations || isLoadingStations ? (
                          "Loading..."
                        ) : (
                          "Select station"
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        {!isLoadingStations &&
                          !isErrorStations &&
                          stationsData?.stations
                            ?.sort(compare)
                            .map((station: Station) => (
                              <SelectItem key={station.id} value={station.name}>
                                {station.name}
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
          <div className="border shadow-sm p-8 rounded-lg w-full space-y-6">
            <FormLabel className="block mb-6">
              Receiver&apos;s Details
            </FormLabel>
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6`}>
              <FormInput
                control={orderForm.control}
                name="receiver.firstName"
                label="First Name"
                type="text"
                placeholder="e.g Jones"
              />
              <FormInput
                control={orderForm.control}
                name="receiver.lastName"
                label="Last Name"
                type="text"
                placeholder="e.g Jack"
              />
              <FormInput
                control={orderForm.control}
                type="tel"
                label="Phone Number"
                name="receiver.phoneNumber"
                placeholder="e.g +2348123456789"
              />
            </div>
            <div
              className={`grid grid-cols-1 ${
                deliveryArea !== "local" && "md:grid-cols-3"
              } gap-6 items-center`}
            >
              {deliveryArea !== "local" && (
                <FormField
                  control={orderForm.control}
                  name="receiver.address.state"
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
              )}
              {deliveryArea !== "local" && (
                <FormField
                  control={orderForm.control}
                  name="destinationStation"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Destination station</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <SelectTrigger disabled={true} className="w-full">
                            {field.value ? (
                              <SelectValue placeholder="Select station" />
                            ) : isErrorStations || isLoadingStations ? (
                              "Loading..."
                            ) : (
                              "Select station"
                            )}
                          </SelectTrigger>
                          <SelectContent>
                            {!isLoadingStations &&
                              !isErrorStations &&
                              stationsData?.stations
                                ?.sort(compare)
                                .map((station: Station) => (
                                  <SelectItem
                                    key={station.id}
                                    value={station.name}
                                  >
                                    {station.name}
                                  </SelectItem>
                                ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormTextarea
                control={orderForm.control}
                name=""
                label="Street address"
                placeholder="e.g 123 example street"
              />
            </div>
          </div>
          <div className="border shadow-sm p-8 rounded-lg w-full space-y-6">
            <FormLabel className="block mb-6">Item Information</FormLabel>
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6`}>
              <FormInput
                control={orderForm.control}
                name="receiver.firstName"
                label="First Name"
                type="text"
                placeholder="e.g Jones"
              />
              <FormInput
                control={orderForm.control}
                name="receiver.lastName"
                label="Last Name"
                type="text"
                placeholder="e.g Jack"
              />
              <FormInput
                control={orderForm.control}
                type="tel"
                label="Phone Number"
                name="receiver.phoneNumber"
                placeholder="e.g +2348123456789"
              />
            </div>
            <div
              className={`grid grid-cols-1 ${
                deliveryArea !== "local" && "md:grid-cols-3"
              } gap-6 items-center`}
            >
              {deliveryArea !== "local" && (
                <FormField
                  control={orderForm.control}
                  name="receiver.address.state"
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
              )}
              {deliveryArea !== "local" && (
                <FormField
                  control={orderForm.control}
                  name="destinationStation"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Destination station</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <SelectTrigger disabled={true} className="w-full">
                            {field.value ? (
                              <SelectValue placeholder="Select station" />
                            ) : isErrorStations || isLoadingStations ? (
                              "Loading..."
                            ) : (
                              "Select station"
                            )}
                          </SelectTrigger>
                          <SelectContent>
                            {!isLoadingStations &&
                              !isErrorStations &&
                              stationsData?.stations
                                ?.sort(compare)
                                .map((station: Station) => (
                                  <SelectItem
                                    key={station.id}
                                    value={station.name}
                                  >
                                    {station.name}
                                  </SelectItem>
                                ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormTextarea
                control={orderForm.control}
                name=""
                label="Street address"
                placeholder="e.g 123 example street"
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewOrderForm;

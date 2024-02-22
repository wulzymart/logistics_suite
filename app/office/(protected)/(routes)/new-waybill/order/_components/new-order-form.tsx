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
import {
  AdditonalCharge,
  ItemType,
  ShipmentType,
  State,
  Station,
} from "@prisma/client";
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
import { GetShipmentTypes } from "@/hooks/shipment-types";
import { GetItemTypes } from "@/hooks/item-types";
import { GetAdditionalCharges } from "@/hooks/additional-charges";
import { Minus, Plus } from "lucide-react";

const NewOrderForm = () => {
  const router = useRouter();
  const customer = GetCustomer();
  const {
    isLoading: isLoadingShipmentTypes,
    isError: isErrorShipmentTypes,
    data: shipmentTypesData,
  } = GetShipmentTypes();
  const {
    isLoading: isLoadingItemType,
    isError: isErrorItemType,
    data: itemTypeData,
  } = GetItemTypes();
  const {
    isLoading: isLoadingAddCharges,
    isError: isErrorAddCharges,
    data: addChargesData,
  } = GetAdditionalCharges();
  const selectedAdditionalCharge: string[] = [];
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
        additionalService: [],
        totalAdditionalService: 0,
        insurance: 0,
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

  const { fields, append, remove } = useFieldArray({
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
              <FormField
                control={orderForm.control}
                name="item.category"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Shipment category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          {field.value ? (
                            <SelectValue
                              placeholder="Select category"
                              className="w-full"
                            />
                          ) : (
                            "Select category"
                          )}
                        </SelectTrigger>
                        <SelectContent>
                          {!isLoadingShipmentTypes &&
                            !isErrorShipmentTypes &&
                            shipmentTypesData.shipmentTypes
                              .sort(compare)
                              .map((shipmentType: ShipmentType) => (
                                <SelectItem
                                  key={shipmentType.id}
                                  value={shipmentType.name}
                                >
                                  {shipmentType.name}
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
                control={orderForm.control}
                name="item.type"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Item type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <SelectTrigger
                          disabled={
                            isLoadingItemType ||
                            isErrorItemType ||
                            !itemTypeData.success
                          }
                          className="w-full"
                        >
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
                          {!isLoadingItemType &&
                            !isErrorItemType &&
                            itemTypeData.itemTypes
                              .sort(compare)
                              .map((itemType: ItemType) => (
                                <SelectItem
                                  key={itemType.id}
                                  value={itemType.name}
                                >
                                  {itemType.name}
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
                control={orderForm.control}
                name="item.condition"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Item Condition</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          {field.value ? (
                            <SelectValue placeholder="Select condition" />
                          ) : (
                            "Select condition"
                          )}
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="New">Brand New</SelectItem>
                          <SelectItem value="Good">Good</SelectItem>
                          <SelectItem value="Defected">Defected</SelectItem>
                          <SelectItem value="Damaged">Damaged</SelectItem>
                          <SelectItem value="Rotten">Rotten</SelectItem>
                          <SelectItem value="Bad">Bad</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div
              className={`grid grid-cols-1 ${
                deliveryArea !== "local" && "md:grid-cols-3"
              } gap-6 items-center`}
            >
              <FormInput
                control={orderForm.control}
                name="item.quantity"
                label="Quantity"
                type="number"
              />
              <FormInput
                control={orderForm.control}
                name="item.value"
                label="Value (NGN)"
                type="text"
              />
              <FormInput
                control={orderForm.control}
                type="number"
                label="Weight"
                name="item.weight"
              />
            </div>
            <FormTextarea
              control={orderForm.control}
              name="item.description"
              label="Item description"
              placeholder="e.g HP laptop in sealed carton..."
            />
          </div>
          <div className="border shadow-sm p-8 rounded-lg w-full space-y-6">
            <FormLabel className="block mb-6">Additional charges</FormLabel>
            <div className={`grid grid-cols-1 gap-6`}>
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex gap-6 items-center md:items-end"
                >
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 items-end gap-4">
                    <FormField
                      name={`charges.additionalService.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              onOpenChange={}
                              defaultValue={field.value}
                              value={field.value}
                            >
                              <SelectTrigger className="w-full">
                                {field.value ? (
                                  <SelectValue
                                    placeholder="Select charge"
                                    className="w-full"
                                  />
                                ) : (
                                  "Select charge"
                                )}
                              </SelectTrigger>
                              <SelectContent>
                                {!isLoadingAddCharges &&
                                  !isErrorAddCharges &&
                                  addChargesData.additionalCharges
                                    .filter(
                                      (charge: AdditonalCharge) =>
                                        !selectedAdditionalCharge.includes(
                                          charge.name
                                        )
                                    )
                                    .sort(compare)
                                    .map(
                                      (additionalCharge: AdditonalCharge) => (
                                        <SelectItem
                                          key={additionalCharge.id}
                                          value={additionalCharge.name}
                                        >
                                          {additionalCharge.name}
                                        </SelectItem>
                                      )
                                    )}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormInput
                      name={`charges.additionalService.${index}.price`}
                      type="number"
                      label="Price"
                    />
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      console.log(field);

                      remove(index);
                    }}
                    type="button"
                  >
                    <Minus />
                  </Button>
                </div>
              ))}
            </div>
            <div className="w-full flex justify-end items-center">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => append({ name: "", price: 0 })}
                type="button"
              >
                <Plus />
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewOrderForm;

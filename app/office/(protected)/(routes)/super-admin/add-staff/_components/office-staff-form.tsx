"use client";

import { UseFormReturn, useForm } from "react-hook-form";
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
import { GetStateStations } from "@/hooks/stations";
import { GetStates } from "@/hooks/states_lga";
import { compare } from "@/lib/utils";
import { State, Station } from "@prisma/client";

const OfficeStaffForm = ({
  form,
}: {
  form: UseFormReturn<
    {
      state: string;
      station: string;
    },
    any,
    undefined
  >;
}) => {
  const {
    isError: isErrorStates,
    isLoading: isLoadingStates,
    data: statesData,
  } = GetStates();
  let state = form.watch("state");
  const {
    isError: isErrorStations,
    isLoading: isLoadingStations,
    data: stationsData,
  } = GetStateStations(state);

  return (
    <div className="border shadow-sm p-8 rounded-lg w-full">
      <Form {...form}>
        <form className="w-full space-y-6">
          <FormLabel>Station Info</FormLabel>

          <div className="flex gap-4 w-full">
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Station location</FormLabel>
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
            <FormField
              control={form.control}
              name="station"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Station</FormLabel>
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
                          isErrorStations ||
                          isLoadingStations ||
                          !stationsData?.success
                        }
                        className="w-full"
                      >
                        {field.value ? (
                          <SelectValue placeholder="Select station" />
                        ) : !state ? (
                          "Awaiting state"
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
        </form>
      </Form>
    </div>
  );
};

export default OfficeStaffForm;

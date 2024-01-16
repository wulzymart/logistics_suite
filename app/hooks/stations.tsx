import { addStation, getLgas } from "@/lib/actions";
import {
  UseQueryResult,
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import * as z from "zod";
import { stationFormSchema } from "@/lib/zodSchemas";

export const SaveStation = (
  state: string,
  lga: string
): UseMutationResult<
  any,
  Error,
  {
    state: string;
    lga: string;
    name: string;
    shortCode: string;
    lgaId: string;
    address: string;
    phoneNumbers: string;
  },
  unknown
> => {
  const stationsMutation = useMutation({
    mutationKey: [`${state}-stations`, `${lga}-stations`],
    mutationFn: async (values: z.infer<typeof stationFormSchema>) => {
      if (!state || !lga) throw Error;
      if (!values) throw Error;
      const data = await addStation(values);
      if (!data.success) throw Error(data.message);
      return data;
    },
  });
  return stationsMutation;
};

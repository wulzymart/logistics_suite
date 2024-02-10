import { getItemTypes } from "@/lib/actions";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export const GetItemTypes = (): UseQueryResult<any, Error> => {
  const itemTypesQuery = useQuery({
    queryKey: [`item-types`],
    queryFn: async () => {
      const data = await getItemTypes();
      if (!data.success) throw Error();
      return data;
    },
  });
  return itemTypesQuery;
};

import { getAdditionalCharges } from "@/lib/actions";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export const GetAdditionalCharges = (): UseQueryResult<any, Error> => {
  const additionalChargeQuery = useQuery({
    queryKey: [`additional-charges`],
    queryFn: async () => {
      const data = await getAdditionalCharges();
      if (!data.success) throw Error();
      return data;
    },
  });
  return additionalChargeQuery;
};

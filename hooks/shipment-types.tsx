import { getShipmentTypes } from "@/lib/actions";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export const GetShipmentTypes = (): UseQueryResult<any, Error> => {
  const shipmentTypesQuery = useQuery({
    queryKey: [`shipment-types`],
    queryFn: async () => {
      const data = await getShipmentTypes();
      if (!data.success) throw Error(data.message);
      return data;
    },
  });
  return shipmentTypesQuery;
};


import {  getStateStations, getStations } from "@/lib/actions";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export const GetStateStations = (state: string): UseQueryResult<any, Error> => {
  const stationsQuery = useQuery({
    queryKey: [`${state}-stations`],
    queryFn: async () => {
      if (!state) throw Error();
      const data = await getStateStations(state);
      if (!data.success) throw Error();
      return data;
    },
  });
  return stationsQuery;
};

export const GetStations = (): UseQueryResult<any, Error> => {
  const stationsQuery = useQuery({
    queryKey: [`stations_list`],
    queryFn: async () => {
      const data = await getStations();
      if (!data.success) throw Error();
      return data;
    },
  });
  return stationsQuery;
};

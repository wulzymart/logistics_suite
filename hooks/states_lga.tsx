import { getLgas, getStates } from "@/lib/actions";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export const Getlgas = (state: string): UseQueryResult<any, Error> => {
  const LgasQuery = useQuery({
    queryKey: [`${state}-lgas`],
    queryFn: async () => {
      if (!state) throw Error();
      const data = await getLgas(state);
      if (!data.success) throw Error();
      return data;
    },
  });
  return LgasQuery;
};

export const GetStates = (): UseQueryResult<any, Error> => {
  const statesQuery = useQuery({
    queryKey: [`states_list`],
    queryFn: async () => {
      const data = await getStates();
      if (!data.success) throw Error();
      return data;
    },
  });
  return statesQuery;
};


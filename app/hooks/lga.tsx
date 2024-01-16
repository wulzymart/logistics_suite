import { getLgas } from "@/lib/actions";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import axios from "axios";

const GetLGA = (state: string): UseQueryResult<any, Error> => {
  const LgaQuery = useQuery({
    queryKey: [`${state}-lgas`],
    queryFn: async () => {
      if (!state) throw Error();
      const data = await getLgas(state);
      if (!data.success) throw Error();
      return data;
    },
  });
  return LgaQuery;
};

export default GetLGA;

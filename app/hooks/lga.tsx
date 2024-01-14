import { UseQueryResult, useQuery } from "@tanstack/react-query";
import axios from "axios";

const getLgas = async (state: string) => {
  axios;
};

const GetLGA = (state: string): UseQueryResult<any, Error> => {
  const LgaQuery = useQuery({
    queryKey: [`${state}-lgas`],
    queryFn: async () => {
      if (!state) throw Error();
      const { data } = await axios.get(`/api/states/${state}/lgas`);
      return data;
    },
  });
  return LgaQuery;
};

export default GetLGA;

import { useQuery } from "@tanstack/react-query";
import { PROGRAM_QUERY_KEY } from "../constants";
import { useApiProvider } from "../../../context";

const useFetchPrograms = () => {
  const { get } = useApiProvider();
  return useQuery({
    queryKey: [PROGRAM_QUERY_KEY],
    queryFn: async () => {
      return await get("/program");
    },
  });
};

export { useFetchPrograms };

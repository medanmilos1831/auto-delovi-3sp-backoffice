import { useQuery } from "@tanstack/react-query";
import { ABOUT_QUERY_KEY } from "../constants";
import { API_ROUTES } from "../../../constants";
import { useApiProvider } from "../../../context";

const useFetchPrograms = () => {
  const { get } = useApiProvider();
  return useQuery({
    queryKey: [ABOUT_QUERY_KEY],
    queryFn: async () => {
      return await get(API_ROUTES.PROGRAM.ALL);
    },
  });
};

export { useFetchPrograms };

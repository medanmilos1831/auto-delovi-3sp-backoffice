import { useQuery } from "@tanstack/react-query";
import { useApiProvider } from "../../../context";

const useFetchProgramCategories = () => {
  const { get } = useApiProvider();
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return await get(`/category`);
    },
  });
};

export { useFetchProgramCategories };

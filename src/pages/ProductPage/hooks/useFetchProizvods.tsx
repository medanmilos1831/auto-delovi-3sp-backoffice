import { useQuery } from "@tanstack/react-query";
import { PRODUCTS_QUERY_KEY } from "../constants";
import { useApiProvider } from "../../../context";
import { API_ROUTES } from "../../../constants";

const useFetchProizvods = () => {
  const { get } = useApiProvider();
  return useQuery({
    queryKey: [PRODUCTS_QUERY_KEY],
    queryFn: async () => {
      return await get(API_ROUTES.PRODUCT.ALL);
    },
  });
};

export { useFetchProizvods };

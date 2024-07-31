import { API_ROUTES } from '@/constants';
import { useApiProvider } from '@/context';
import { useQuery } from '@tanstack/react-query';
import { ABOUT_QUERY_KEY } from '../constants';

const useFetchPrograms = () => {
  const { get } = useApiProvider();
  return useQuery({
    queryKey: [ABOUT_QUERY_KEY],
    queryFn: async () => {
      return await get<any>(API_ROUTES.PROGRAM.ALL);
    },
  });
};

export { useFetchPrograms };

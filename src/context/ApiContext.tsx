import { PropsWithChildren, createContext, useContext } from 'react';
import { IAxios } from '@/libs';

const ApiContext = createContext<IAxios | undefined>(undefined);

const ApiProvider = ({
  children,
  value,
}: PropsWithChildren<{ value: IAxios }>) => {
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

const useApiProvider = () => {
  const ctx = useContext(ApiContext)!;
  return {
    get: ctx?.api_get!,
    post: ctx?.api_post!,
    put: ctx?.api_put!,
    remove: ctx?.api_delete!,
    patch: ctx?.api_patch!,
    api: ctx,
  };
};

export { ApiProvider, useApiProvider };

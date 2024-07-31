import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useAuth0 } from "@auth0/auth0-react";
import { Axios } from "./libs";
import { ApiProvider } from "./context";
import { router } from "./router/router";
// 171
// klare cetkin 7
// 4841 8787 8684 1951
// 160-5100102363259-88
// 1951

// dodati kataloski broj
// evening87

// auto-delovi-dobavnic-3sp.rs com
// <!-- A	@	164.90.211.116 -->
// ssh root@164.90.211.116
// autO-delovi-3sp
// sudo lsof -i :3000 => nadji proces

const App = () => {
  const { isLoading, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    loginWithRedirect();
    return <div>Redirecting...</div>;
  }
  return (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              refetchOnWindowFocus: false,
              retry: 0,
            },
          },
        })
      }
    >
      <ApiProvider value={new Axios()}>
        <div className="page flex flex-column">
          <div>
            <button onClick={() => logout()}>logout</button>
          </div>
          <RouterProvider router={router} />
        </div>
      </ApiProvider>
    </QueryClientProvider>
  );
};

export { App };

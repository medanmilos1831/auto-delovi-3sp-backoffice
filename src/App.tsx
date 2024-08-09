import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useAuth0 } from "@auth0/auth0-react";
import { Axios } from "./libs";
import { ApiProvider } from "./context";
import { router } from "./router/router";

const App = () => {
  console.log("VITE_API", import.meta.env.VITE_API, import.meta.env.MODE);
  const { isLoading, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  if (import.meta.env.MODE === "production" && isLoading) {
    return <div>Loading...</div>;
  }

  if (import.meta.env.MODE === "production" && !isAuthenticated) {
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
          {import.meta.env.MODE === "development" ? null : (
            <div>
              <button onClick={() => logout()}>logout</button>
            </div>
          )}
          <RouterProvider router={router} />
        </div>
      </ApiProvider>
    </QueryClientProvider>
  );
};

export { App };

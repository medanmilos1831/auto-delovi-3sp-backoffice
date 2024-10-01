import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UploadOutlined } from "@ant-design/icons";

import { useAuth0 } from "@auth0/auth0-react";
import { Axios } from "./libs";
import { ApiProvider } from "./context";
import { router } from "./router/router";
import { Upload, Button } from "antd";

const App = () => {
  const props = {
    name: "file",
    action: `${import.meta.env.VITE_API}pocetna/excel`,
    // action: "https://your-server/upload", // URL servera gde se fajlovi uploaduju
    // headers: {
    //   authorization: "authorization-text",
    // },

    // /pocetna/excel
    onChange(info: any) {
      if (info.file.status === "done") {
        console.log(`${info.file.name} file uploaded successfully.`);
      } else if (info.file.status === "error") {
        console.error(`${info.file.name} file upload failed.`);
      }
    },
  };
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
          <div>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>
          <RouterProvider router={router} />
        </div>
      </ApiProvider>
    </QueryClientProvider>
  );
};

export { App };

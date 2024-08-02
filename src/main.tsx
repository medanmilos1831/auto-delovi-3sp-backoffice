import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { Auth0Provider } from "@auth0/auth0-react";
import "./styles/index.less";
const onRedirectCallback = (appState: any) => {
  window.history.replaceState(
    {},
    document.title,
    appState?.returnTo || window.location.pathname
  );
};
const providerConfig = {
  domain: import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN as string,
  clientId: import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID as string,
  onRedirectCallback,
  authorizationParams: {
    redirect_uri:
      "https://medanmilos1831.github.io/auto-delovi-3sp-backoffice/",
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Auth0Provider {...providerConfig}>
    <App />
  </Auth0Provider>
);

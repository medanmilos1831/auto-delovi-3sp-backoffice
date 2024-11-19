import { createBrowserRouter } from "react-router-dom";
import { SPA_ROUTES } from "../constants";
import { AboutPage } from "../pages/AboutPage";
import { HomePage, ProgramPage, ContactPage, PocetnaPage } from "../pages";

export const router = createBrowserRouter(
  [
    {
      path: SPA_ROUTES.PROGRAM_PAGE,
      element: <HomePage />,
      children: [
        {
          index: true,
          element: <ProgramPage />,
        },
        {
          path: SPA_ROUTES.ABOUT,
          element: <AboutPage />,
        },
        {
          path: SPA_ROUTES.CONTACT,
          element: <ContactPage />,
        },
        {
          path: SPA_ROUTES.HOME,
          element: <PocetnaPage />,
        },
      ],
    },
    {
      path: "*",
      element: <>nema</>,
    },
  ],
  {
    basename: "/auto-delovi-3sp-backoffice/",
  }
);

import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UploadOutlined } from "@ant-design/icons";

import { useAuth0 } from "@auth0/auth0-react";
import { Axios } from "./libs";
import { ApiProvider } from "./context";
import { router } from "./router/router";
import { Upload, Button } from "antd";

// const generateUniqueIds = (start: any, end: any, count: any) => {
//   const ids = new Set();
//   while (ids.size < count) {
//     const id = Math.floor(Math.random() * (end - start + 1)) + start;
//     ids.add(id);
//   }
//   return Array.from(ids);
// };

// const generateData = (numItems: any) => {
//   const half = numItems / 2;

//   // Generiši 3000 jedinstvenih ID-ova u opsegu 50000-60000
//   const traktorskiProgramIds = generateUniqueIds(50000, 60000, half);

//   // Generiši 3000 jedinstvenih ID-ova u opsegu 1-49999
//   const autoProgramIds = generateUniqueIds(1, 49999, half);

//   const ids = [...traktorskiProgramIds, ...autoProgramIds];
//   const categories = [
//     "filteri",
//     "pločice",
//     "gume",
//     "svečice",
//     "akumulatori",
//     "pumpa-za-gorivo",
//     "zamajac",
//     "kočioni-diskovi",
//     "kočione-pločice",
//     "španeri",
//     "ulje-za-motor",
//     "mjenjač",
//     "remenice",
//     "alternator",
//     "starter",
//     "egr-ventil",
//     "hladnjak",
//     "kondenzator",
//     "termostat",
//     "zračni-filter",
//     "uljni-filter",
//     "paljenje",
//     "razvodna-kapica",
//     "razvodnik",
//     "nosaci",
//     "opruga",
//     "stabilizatori",
//     "zračnice",
//     "škrge",
//     "zatvarači",
//     "rukohvati",
//     "gornji-nosač",
//     "donji-nosač",
//     "zračni-rezervoar",
//     "hladnjak-za-ulje",
//     "čarape-za-gume",
//     "upravljač",
//     "kablovi",
//     "prigušivač",
//     "razvodnik-goriva",
//     "pumpe-za-vodu",
//     "ležajevi",
//     "distributer",
//     "silikoni",
//     "električni-sistem",
//     "navigacija",
//     "kamera-za-vožnju",
//     "parking-senzori",
//     "isporuka",
//     "ulja-i-maziva",
//   ];
//   // const categories = ["filter", "plocice"]; // Definiši kategorije

//   const data = ids.map((id, index) => {
//     // const isTraktorskiProgram = traktorskiProgramIds.includes(id);
//     const category = categories[Math.floor(Math.random() * categories.length)]; // Nasumično odaberi kategoriju
//     const opis = `${category.charAt(0).toUpperCase() + category.slice(1)} ${
//       index + 1
//     }`; // Opis sa kategorijom
//     const cena = Math.floor(Math.random() * 5000) + 100; // Cena između 100 i 5100
//     const kataloskiBroj = Math.floor(Math.random() * 1000) + 1; // Kataloski broj između 1 i 1000

//     return { id, opis, cena, kataloski_broj: kataloskiBroj };
//   });

//   return data;
// };

// // Generiši 6000 objekata
// const d = generateData(6000);
// console.log("dddd", [
//   ...d,
//   { cena: 99999, id: 1, kataloski_broj: 1, opis: "milos" },
// ]);
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

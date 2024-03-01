import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "@/routes/_app.tsx";
import Error from "@/routes/_error.tsx";
import "./index.css";
import {
  CONTROL_CENTER_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  SIGNUP_ROUTE,
} from "./utils/routes.ts";
import { ControlCenter } from "@/components/ControlCenter.tsx";
import { Login } from "./components/view/Login.tsx";
import { Signup } from "./components/view/Signup.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "@/store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { CompanyPage } from "./components/reusable/CompanyPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Dashboard } from "./components/Dashboard.tsx";

const router = createBrowserRouter(
  [
    {
      path: HOME_ROUTE,
      element: <App />,
      errorElement: <Error />,
      children: [
        {
          path: HOME_ROUTE,
          element: <Dashboard />,
        },
        {
          path: CONTROL_CENTER_ROUTE,
          element: <ControlCenter />,
        },
        {
          path: CONTROL_CENTER_ROUTE + "/:companyName",
          element: <CompanyPage />,
        },
      ],
    },
    {
      path: LOGIN_ROUTE,
      element: <Login />,
      errorElement: <Error />,
    },
    {
      path: SIGNUP_ROUTE,
      element: <Signup />,
      errorElement: <Error />,
    },
  ],
  { basename: import.meta.env.PROD ? "/protoshell" : "/" }
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);

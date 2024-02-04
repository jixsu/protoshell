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
import { store } from "@/store/store.ts";

const router = createBrowserRouter([
  {
    path: HOME_ROUTE,
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: CONTROL_CENTER_ROUTE,
        element: <ControlCenter />,
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

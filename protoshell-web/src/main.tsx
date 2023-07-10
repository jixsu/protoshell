import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./routes/_app.tsx";
import Error from "./routes/_error.tsx";
import "./index.css";
import { HOME_ROUTE } from "./utils/routes.ts";

const router = createBrowserRouter([
  {
    path: HOME_ROUTE,
    element: <App />,
    errorElement: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

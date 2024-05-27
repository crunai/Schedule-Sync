import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Scaffold from "./pages/Scaffold";
import { lazy } from "react";
import Home from "./pages/Home";

const Create = lazy(() => import("./pages/Create"));
const Schedule = lazy(() => import("./pages/Schedule"));
const NotFound = lazy(() => import("./pages/NotFound"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Scaffold />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "/schedule/:scheduleId",
        element: <Schedule />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

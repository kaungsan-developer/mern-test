import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import CreateNote from "../pages/CreateNote";
import DetailNote from "../pages/DetailNote";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "/create", Component: CreateNote },
      { path: "/detail/:id", Component: DetailNote },
    ],
  },
]);

export default router;

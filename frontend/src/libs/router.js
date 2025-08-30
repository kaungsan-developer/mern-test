import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import CreateNote from "../pages/CreateNote";
import DetailNote from "../pages/DetailNote";
import EditNote from "../pages/EditNote";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "/create", Component: CreateNote },
      { path: "/detail/:id", Component: DetailNote },
      { path: "/edit/:id", Component: EditNote },
    ],
  },
]);

export default router;

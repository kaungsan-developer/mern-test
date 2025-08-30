import { Link, Outlet } from "react-router";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div data-theme="light" className="mb-100">
      <Navbar />

      <div className="container mx-auto">
        <div className="breadcrumbs text-sm ms-10">
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/create"}>New Note</Link>
            </li>
          </ul>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

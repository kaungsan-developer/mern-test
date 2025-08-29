import { Plus as PlusIcon } from "lucide-react";
import { useNavigate } from "react-router";
export default function Navbar() {
  const navigate = useNavigate();
  return (
    <header className="border-base-300 border-b">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary ">Note</h1>
          <button className="btn" onClick={() => navigate("/create")}>
            <PlusIcon />
            New Note
          </button>
        </div>
      </div>
    </header>
  );
}

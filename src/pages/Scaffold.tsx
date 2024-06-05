import { Link, Outlet } from "react-router-dom";
import { GiBowenKnot } from "react-icons/gi";
import { Suspense } from "react";
import Fallback from "./Fallback";

function Scaffold() {
  return (
    <div className="flex min-h-screen flex-col">
      <nav className="navbar mt-2 justify-between">
        <Link to="/">
          <button className="btn btn-ghost text-4xl text-emerald-500 hover:bg-inherit">
            <GiBowenKnot className="mr-1" />
            Sync.
          </button>
        </Link>
        <Link to="/create">
          <button className="btn btn-ghost mr-3 bg-emerald-600 text-xl text-white hover:bg-emerald-600">
            + Schedule
          </button>
        </Link>
      </nav>
      <Suspense fallback={<Fallback />}>
        <div className="flex-1">
          <Outlet />
        </div>
      </Suspense>
    </div>
  );
}

export default Scaffold;

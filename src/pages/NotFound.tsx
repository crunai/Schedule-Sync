import { Link } from "react-router-dom";

function NotFound({ isSchedule = false }: { isSchedule?: boolean }) {
  return (
    <div className="hero h-[35rem]">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">
            {isSchedule ? "Schedule" : "Page"} Not Found
          </h1>
          <p className="py-6">You may have mistyped the URL.</p>
          <Link to="/">
            <button className="btn btn-md bg-amber-400">
              Return To Homepage
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;

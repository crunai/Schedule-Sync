import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Page Not Found</h1>
          <p className="py-6">You may have mistyped the URL.</p>
          <Link to="/">
            <button className="btn btn-primary">Return To Homepage</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;

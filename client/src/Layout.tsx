import { Link, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

export default function Layout() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard/report" />;
  }
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex space-x-4">
        <h1 className="text-xl text-blue-500">Projects</h1>
      </div>
      {!user ? <Link to="/login">Login</Link> : null}
      {/* Content goes here */}
      <Outlet />
    </div>
  );
}

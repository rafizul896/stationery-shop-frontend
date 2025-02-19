import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mt-4">Oops! Page Not Found</h2>
      <p className="text-gray-600 mt-2">The page you are looking for might have been removed or is temporarily unavailable.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-purple-800 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}

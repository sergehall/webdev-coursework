import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 px-4 py-24 text-center">
      <h1 className="animate-pulse select-none text-7xl font-extrabold tracking-widest text-red-600 drop-shadow-2xl">
        404
      </h1>
      <p className="text-2xl font-medium text-gray-700 dark:text-gray-300">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-4 inline-block rounded-xl bg-emerald-400 px-6 py-3 text-lg font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-emerald-700 dark:bg-emerald-600"
      >
        Go Home
      </Link>
    </div>
  );
}

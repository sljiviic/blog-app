import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-8 text-center">
      <p className="text-7xl font-bold text-primary sm:text-8xl">404</p>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-heading sm:text-3xl">
          Page not found
        </h1>
        <p className="max-w-md text-sm font-medium text-muted">
          The page you're looking for doesn't exist or may have been moved.
        </p>
      </div>

      <Link
        to="/"
        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-surface transition-colors hover:bg-primary-hover"
      >
        Back to home
      </Link>
    </div>
  );
};

export default NotFound;

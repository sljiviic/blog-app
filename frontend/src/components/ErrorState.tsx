import { LuRefreshCw, LuTriangleAlert } from "react-icons/lu";

type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};

const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <div className="flex justify-center items-center w-12 h-12 rounded-full bg-danger/10 text-danger">
        <LuTriangleAlert className="w-6 h-6" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-heading font-semibold">Something went wrong</p>
        <p className="text-sm text-muted max-w-sm">
          {message ??
            "We couldn't load this content. Please check your connection and try again."}
        </p>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="flex items-center gap-2 py-2 px-4 text-sm font-semibold text-heading border border-border rounded-lg cursor-pointer hover:border-heading transition-colors"
        >
          <LuRefreshCw className="w-4 h-4" />
          Try again
        </button>
      )}
    </div>
  );
};

export default ErrorState;

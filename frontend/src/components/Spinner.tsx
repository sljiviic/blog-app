import { twMerge } from "tailwind-merge";

type SpinnerProps = {
  className?: string;
};

const Spinner = ({ className }: SpinnerProps) => {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={twMerge(
        "inline-block w-8 h-8 border-3 border-current border-t-transparent rounded-full animate-spin text-primary",
        className,
      )}
    ></div>
  );
};

export default Spinner;

import type { IconType } from "react-icons";

type EmptyStateProps = {
  Icon: IconType;
  title: string;
  message?: string;
};

const EmptyState = ({ Icon, title, message }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <div className="flex justify-center items-center w-12 h-12 rounded-full bg-primary/8 text-primary">
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-heading font-semibold">{title}</p>
        {message && <p className="text-sm text-muted max-w-sm">{message}</p>}
      </div>
    </div>
  );
};

export default EmptyState;

import { useEffect, useState } from "react";
import Spinner from "./Spinner";

type LoadingStateProps = {
  // ms before the cold-start hint appears
  hintDelay?: number;
};

// The demo backend runs on a free tier that sleeps after inactivity, so the
// first request can take up to a minute. If loading drags on, we say so — a
// silent spinner reads as "broken", an explained one reads as "waking up".
const LoadingState = ({ hintDelay = 4000 }: LoadingStateProps) => {
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(true), hintDelay);
    return () => clearTimeout(timer);
  }, [hintDelay]);

  return (
    <div className="flex flex-col justify-center items-center gap-4 py-20 text-center">
      <Spinner />
      {showHint && (
        <p className="text-sm text-muted max-w-xs">
          Waking up the demo server — this can take up to a minute on the free
          tier.
        </p>
      )}
    </div>
  );
};

export default LoadingState;

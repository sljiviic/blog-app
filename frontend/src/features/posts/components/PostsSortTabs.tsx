import type { Dispatch } from "react";
import { LuClock, LuFlame } from "react-icons/lu";

type PostsSortTabsProps = {
  sortBy: "newest" | "popular";
  setSortBy: Dispatch<React.SetStateAction<"newest" | "popular">>;
};

const PostsSortTabs = ({ sortBy, setSortBy }: PostsSortTabsProps) => {
  return (
    <div className="flex justify-start items-center w-full h-14 px-4 py-2 shadow-md/5 border border-border bg-surface rounded-lg">
      <div className="relative grid grid-cols-2 gap-4 h-full">
        {/* active highlight (behind the buttons) */}
        <div
          className={`absolute left-0 bg-primary/5 w-[calc(50%-0.5rem)] h-full pointer-events-none rounded-lg transition-transform duration-200 ease-in-out ${sortBy === "newest" ? "translate-x-0" : "translate-x-[calc(100%+1rem)]"}`}
        ></div>
        <button
          type="button"
          onClick={() => setSortBy("newest")}
          aria-pressed={sortBy === "newest"}
          className={`flex justify-center items-center gap-1.5 px-4 whitespace-nowrap text-sm font-semibold cursor-pointer transition-colors ${sortBy === "newest" ? "text-primary" : "text-muted"}`}
        >
          <LuClock aria-hidden="true" className="w-4.5 h-4.5 shrink-0" />
          Newest
        </button>
        <button
          type="button"
          onClick={() => setSortBy("popular")}
          aria-pressed={sortBy === "popular"}
          className={`flex justify-center items-center gap-1.5 px-4 whitespace-nowrap text-sm font-semibold cursor-pointer transition-colors ${sortBy === "popular" ? "text-primary" : "text-muted"}`}
        >
          <LuFlame aria-hidden="true" className="w-4.5 h-4.5 shrink-0" />
          Most Liked
        </button>
        <div
          className={`absolute top-full mt-1 left-0 w-[calc(50%-0.5rem)] h-0.75 bg-primary rounded-full transition-transform duration-200 ease-in-out ${sortBy === "newest" ? "translate-x-0" : "translate-x-[calc(100%+1rem)]"}`}
        ></div>
      </div>
    </div>
  );
};

export default PostsSortTabs;

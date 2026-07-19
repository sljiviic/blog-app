import { useDebounce } from "@/hooks/useDebounce";
import { useRef, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useSearchedPostsQuery } from "../../hooks/usePosts";
import PostSearchResults from "./PostSearchResults";
import { useClickOutside } from "@/hooks/useClickOutside";

const PostSearch = () => {
  const [title, setTitle] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const debouncedTitle = useDebounce(title, 400);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  useClickOutside(searchRef, () => setShowResults(false));
  const { data, isFetching, isError } = useSearchedPostsQuery(debouncedTitle);

  const trimmed = debouncedTitle.trim();

  return (
    <div ref={searchRef} className="relative w-full max-w-90 min-w-0">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <LuSearch
            className={`h-5 w-5 ${isFocused ? "text-primary" : "text-muted"} transition-colors`}
          />
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            setShowResults(true);
          }}
          onBlur={() => setIsFocused(false)}
          placeholder="Search posts by title"
          className="block w-full rounded-lg ring-1 ring-border py-3 pl-10 pr-3
            text-heading font-normal placeholder-muted transition-shadow focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
        />
      </div>
      {showResults && trimmed.length > 0 && (
        <PostSearchResults
          posts={data}
          isLoading={isFetching}
          isError={isError}
          onSelect={() => {
            setShowResults(false);
            setTitle("");
          }}
        />
      )}
    </div>
  );
};

export default PostSearch;

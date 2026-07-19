import Modal from "@/components/Modal";
import { useDebounce } from "@/hooks/useDebounce";
import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useSearchedPostsQuery } from "../../hooks/usePosts";
import PostSearchResults from "./PostSearchResults";

type SearchModalProps = {
  onClose: () => void;
};

const SearchModal = ({ onClose }: SearchModalProps) => {
  const [title, setTitle] = useState("");
  const debouncedTitle = useDebounce(title, 400);
  const trimmed = debouncedTitle.trim();

  const { data, isFetching, isError } = useSearchedPostsQuery(debouncedTitle);

  return (
    <Modal onClose={onClose} size="md">
      <h3 className="text-lg font-bold text-heading pr-6">Search posts</h3>

      <div className="relative mt-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <LuSearch className="h-5 w-5 text-muted" />
        </div>
        <input
          type="text"
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Search posts by title"
          className="block w-full rounded-lg ring-1 ring-border py-3 pl-10 pr-3 text-heading font-normal placeholder-muted transition-shadow focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
        />
      </div>

      {trimmed.length > 0 && (
        <PostSearchResults
          variant="inline"
          posts={data}
          isLoading={isFetching}
          isError={isError}
          onSelect={onClose}
        />
      )}
    </Modal>
  );
};

export default SearchModal;

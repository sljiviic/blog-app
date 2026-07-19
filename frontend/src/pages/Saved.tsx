import Spinner from "@/components/Spinner";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";
import { LuBookmark } from "react-icons/lu";
import PostsList from "@/features/posts/components/PostsList";
import { useSavedPostsQuery } from "@/features/users/hooks/useUsers";

const Saved = () => {
  const { data, isPending, isError, refetch } = useSavedPostsQuery();

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-heading">Saved Posts</h1>
        <p className="text-sm text-muted">Posts you've bookmarked to read later.</p>
      </div>

      {isPending ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : isError ? (
        <ErrorState
          message="We couldn't load your saved posts."
          onRetry={() => refetch()}
        />
      ) : data.length > 0 ? (
        <PostsList posts={data} />
      ) : (
        <EmptyState
          Icon={LuBookmark}
          title="Nothing saved yet"
          message="Bookmark a post and it will appear here."
        />
      )}
    </div>
  );
};

export default Saved;

import Spinner from "@/components/Spinner";
import {
  PLACEHOLDER_COVER,
  type BasePostType,
} from "../../types/posts.types";
import { Link } from "react-router";

type PostSearchResultsProps = {
  posts?:
    | Pick<BasePostType, "id" | "slug" | "title" | "coverImage" | "createdAt">[]
    | undefined;
  isLoading: boolean;
  isError: boolean;
  onSelect: () => void;
  variant?: "dropdown" | "inline";
};

const PostSearchResults = ({
  posts,
  isLoading,
  isError,
  onSelect,
  variant = "dropdown",
}: PostSearchResultsProps) => {
  const containerClasses =
    variant === "dropdown"
      ? "absolute left-0 top-full flex flex-col w-full mt-2 rounded-lg p-3 border border-border bg-surface shadow-lg/5"
      : "flex flex-col w-full mt-4";

  return (
    <div className={containerClasses}>
      <h3 className="text-xs text-muted font-semibold">BLOG POSTS</h3>
      <div className="mt-4">
        {isError ? (
          <p className="text-sm text-danger">Something went wrong</p>
        ) : isLoading ? (
          <div className="flex justify-center items-center w-full py-6">
            <Spinner />
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="flex flex-col gap-1.5">
            {posts.slice(0, 4).map((post) => {
              const formattedDate = post.createdAt.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              });

              const formattedTime = post.createdAt.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              });

              return (
                <Link
                  key={post.id}
                  to={`/posts/${post.slug}`}
                  onClick={onSelect}
                  className="flex gap-3 text-left hover:bg-primary/5 rounded-lg p-1 cursor-pointer transition-colors"
                >
                  <img
                    src={post.coverImage || PLACEHOLDER_COVER}
                    alt={`Cover image for "${post.title}"`}
                    className="w-16 h-16 rounded-md object-cover shrink-0"
                  />
                  <div>
                    <h4 className="text-heading font-semibold">{post.title}</h4>
                    <time
                      dateTime={post.createdAt.toISOString()}
                      className="text-sm text-muted"
                    >
                      {`${formattedDate} • ${formattedTime}`}
                    </time>
                  </div>
                </Link>
              );
            })}
            {posts.length > 4 && (
              <div className="text-center text-base tracking-widest text-heading">
                ...
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted">No posts found</p>
        )}
      </div>
    </div>
  );
};

export default PostSearchResults;

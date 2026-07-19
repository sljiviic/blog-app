import CreatePost from "@/features/posts/components/CreatePost";
import UpsertPostModal from "@/features/posts/components/UpsertPostModal";
import PostsList from "@/features/posts/components/PostsList";
import { usePostsQuery } from "@/features/posts/hooks/usePosts";
import { useState } from "react";
import PostsSortTabs from "@/features/posts/components/PostsSortTabs";
import { useMyProfileQuery } from "@/features/users/hooks/useUsers";
import Spinner from "@/components/Spinner";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";
import { LuFileText } from "react-icons/lu";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"newest" | "popular">("newest");

  const token = localStorage.getItem("token");
  const { data: profile } = useMyProfileQuery(!!token);
  const fullName = profile
    ? `${profile.firstName} ${profile.lastName}`
    : "User";

  const { isPending, isError, data, refetch } = usePostsQuery(sortBy);

  if (isPending) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorState
        message="We couldn't load the feed right now."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="p-6 flex flex-col gap-3">
      {token && (
        <CreatePost
          fullName={fullName}
          profileImage={profile?.profileImage}
          onClick={() => setIsModalOpen(true)}
        />
      )}
      <PostsSortTabs sortBy={sortBy} setSortBy={setSortBy} />
      {isModalOpen && <UpsertPostModal onClose={() => setIsModalOpen(false)} />}
      {data.length > 0 ? (
        <PostsList posts={data} />
      ) : (
        <EmptyState
          Icon={LuFileText}
          title="No posts yet"
          message={
            token
              ? "Be the first to publish something — use the box above to write a post."
              : "There's nothing here yet. Log in to publish the first post."
          }
        />
      )}
    </div>
  );
};

export default Home;

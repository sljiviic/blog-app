import Spinner from "@/components/Spinner";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";
import { LuFileText } from "react-icons/lu";
import PostsList from "@/features/posts/components/PostsList";
import UserProfileHeader from "@/features/users/components/UserProfileHeader";
import {
  useUserPostsQuery,
  useUserProfileQuery,
} from "@/features/users/hooks/useUsers";
import { useParams } from "react-router";

const UserProfile = () => {
  const { userId } = useParams();
  const id = Number(userId);

  const { data: profile, isPending, isError } = useUserProfileQuery(id);
  const postsQuery = useUserPostsQuery(id);

  if (isPending) {
    return <LoadingState />;
  }

  if (isError || !profile) {
    return <ErrorState message="We couldn't load this profile." />;
  }

  const fullName = `${profile.firstName} ${profile.lastName}`;

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6">
      <UserProfileHeader profile={profile} />

      <h2 className="text-lg font-bold text-heading">
        Posts by {profile.firstName}
      </h2>

      {postsQuery.isPending ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : postsQuery.isError ? (
        <ErrorState
          message="We couldn't load these posts."
          onRetry={() => postsQuery.refetch()}
        />
      ) : postsQuery.data.length > 0 ? (
        <PostsList posts={postsQuery.data} />
      ) : (
        <EmptyState
          Icon={LuFileText}
          title="No posts yet"
          message={`${fullName} hasn't published anything yet.`}
        />
      )}
    </div>
  );
};

export default UserProfile;

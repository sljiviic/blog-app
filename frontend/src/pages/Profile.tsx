import Spinner from "@/components/Spinner";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";
import { LuBookmark, LuSquarePen } from "react-icons/lu";
import PostsList from "@/features/posts/components/PostsList";
import ProfileHeader from "@/features/users/components/ProfileHeader";
import ProfileTabs, {
  type ProfileTab,
} from "@/features/users/components/ProfileTabs";
import {
  useMyPostsQuery,
  useMyProfileQuery,
  useSavedPostsQuery,
} from "@/features/users/hooks/useUsers";
import { useState } from "react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>("posts");

  const {
    data: profile,
    isPending: isProfilePending,
    isError: isProfileError,
  } = useMyProfileQuery();

  const myPosts = useMyPostsQuery(activeTab === "posts");
  const savedPosts = useSavedPostsQuery(activeTab === "saved");

  const activeQuery = activeTab === "posts" ? myPosts : savedPosts;

  if (isProfilePending) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }

  if (isProfileError || !profile) {
    return <ErrorState message="We couldn't load your profile." />;
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <ProfileHeader profile={profile} />
      <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeQuery.isPending ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : activeQuery.isError ? (
        <ErrorState
          message="We couldn't load these posts."
          onRetry={() => activeQuery.refetch()}
        />
      ) : activeQuery.data.length > 0 ? (
        <PostsList posts={activeQuery.data} />
      ) : activeTab === "posts" ? (
        <EmptyState
          Icon={LuSquarePen}
          title="No posts yet"
          message="Posts you publish will show up here."
        />
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

export default Profile;

import type { PostsType } from "../types/posts.types";
import PostCard from "./PostCard";

type PostsListProp = {
  posts: PostsType;
};

const PostsList = ({ posts }: PostsListProp) => {
  return (
    <div className="flex flex-col gap-5">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          {...post}
          isLiked={post.isLiked}
          isSaved={post.isSaved}
        />
      ))}
    </div>
  );
};

export default PostsList;

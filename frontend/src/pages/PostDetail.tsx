import Spinner from "@/components/Spinner";
import ErrorState from "@/components/ErrorState";
import Avatar from "@/components/Avatar";
import CommentList from "@/features/posts/components/CommentList";
import CreateCommentModal from "@/features/posts/components/CreateCommentModal";
import { usePostBySlugQuery } from "@/features/posts/hooks/usePosts";
import { PLACEHOLDER_COVER } from "@/features/posts/types/posts.types";
import { useToggleLikeMutation } from "@/features/posts/hooks/useLikes";
import { useToggleSaveMutation } from "@/features/posts/hooks/useSaves";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { LuArrowLeft, LuBookmark, LuHeart, LuMessageCircle } from "react-icons/lu";
import { useState } from "react";
import { Link, useParams } from "react-router";
import { useAuth } from "@/features/auth/hooks/useAuth";

const PostDetail = () => {
  const { slug } = useParams();
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const {
    data: post,
    isPending,
    isError,
  } = usePostBySlugQuery(slug ?? "");

  const toggleLikeMutation = useToggleLikeMutation();
  const toggleSaveMutation = useToggleSaveMutation();
  const { requireAuth } = useAuth();

  if (isPending) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }

  if (isError || !post) {
    return (
      <ErrorState message="This post could not be found or loaded." />
    );
  }

  const fullName = `${post.author.firstName} ${post.author.lastName}`;
  const authorHref = post.isOwner ? "/profile" : `/users/${post.author.id}`;
  const formattedDate = post.createdAt.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleLike = () =>
    requireAuth(() =>
      toggleLikeMutation.mutate({ postId: post.id, isLiked: post.isLiked }),
    );
  const handleSave = () =>
    requireAuth(() =>
      toggleSaveMutation.mutate({ postId: post.id, isSaved: post.isSaved }),
    );
  const handleComment = () => requireAuth(() => setIsCommentModalOpen(true));

  return (
    <div className="flex flex-col gap-6 py-6 max-w-3xl mx-auto">
      <Link
        to="/"
        className="flex items-center gap-2 text-sm font-semibold text-muted hover:text-heading transition-colors w-fit"
      >
        <LuArrowLeft className="w-4 h-4" />
        Back to feed
      </Link>

      <article className="flex flex-col gap-5 p-4 sm:p-6 shadow-md/5 border border-border bg-surface rounded-lg">
        {/* Author */}
        <div className="flex items-center gap-3">
          <Link to={authorHref} aria-label={`View ${fullName}'s profile`}>
            <Avatar
              profileImage={post.author.profileImage}
              fullName={fullName}
            />
          </Link>
          <div className="flex flex-col gap-0.5">
            <Link
              to={authorHref}
              className="flex items-center gap-1 text-sm font-semibold text-heading hover:text-primary transition-colors w-fit"
            >
              {fullName}
              <RiVerifiedBadgeFill
                aria-label="Verified"
                role="img"
                className="text-primary text-sm"
              />
            </Link>
            <time
              dateTime={post.createdAt.toISOString()}
              className="text-xs text-muted"
            >
              {formattedDate}
            </time>
          </div>
        </div>

        {/* Title + cover + content */}
        <h1 className="text-2xl sm:text-3xl font-bold text-heading">
          {post.title}
        </h1>
        <img
          src={post.coverImage || PLACEHOLDER_COVER}
          alt={`Cover image for "${post.title}"`}
          className="w-full max-h-80 object-cover rounded-xl"
        />
        <p className="text-base text-heading/90 whitespace-pre-line leading-relaxed">
          {post.content}
        </p>

        {/* Actions */}
        <footer className="flex justify-between items-center border-t border-border pt-4">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={handleLike}
              aria-pressed={post.isLiked}
              className={`flex items-center gap-1.5 text-sm font-semibold transition-colors cursor-pointer ${
                post.isLiked ? "text-danger" : "text-muted hover:text-heading"
              }`}
            >
              <LuHeart className={`text-lg ${post.isLiked ? "fill-current" : ""}`} />
              {post._count.likes}
            </button>
            <button
              type="button"
              onClick={handleComment}
              className="flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-heading transition-colors cursor-pointer"
            >
              <LuMessageCircle className="text-lg" />
              {post.comments.length}
            </button>
          </div>

          <button
            type="button"
            onClick={handleSave}
            aria-pressed={post.isSaved}
            className={`transition-colors cursor-pointer ${
              post.isSaved ? "text-primary" : "text-muted hover:text-heading"
            }`}
          >
            <LuBookmark className={`text-lg ${post.isSaved ? "fill-current" : ""}`} />
          </button>
        </footer>
      </article>

      {/* Comments */}
      <section className="flex flex-col gap-4 p-4 sm:p-6 shadow-md/5 border border-border bg-surface rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-heading">
            Comments ({post.comments.length})
          </h2>
          <button
            type="button"
            onClick={handleComment}
            className="flex items-center gap-2 py-2 px-3 text-sm font-medium text-white bg-primary rounded-lg cursor-pointer hover:bg-primary-hover transition-colors"
          >
            <LuMessageCircle className="w-4 h-4" />
            Add comment
          </button>
        </div>
        <CommentList comments={post.comments} />
      </section>

      {isCommentModalOpen && (
        <CreateCommentModal
          onClose={() => setIsCommentModalOpen(false)}
          postId={post.id}
        />
      )}
    </div>
  );
};

export default PostDetail;

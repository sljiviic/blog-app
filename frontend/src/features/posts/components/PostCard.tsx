import Avatar from "@/components/Avatar";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuBookmark, LuHeart, LuMessageCircle } from "react-icons/lu";
import { useToggleLikeMutation } from "../hooks/useLikes";
import { useToggleSaveMutation } from "../hooks/useSaves";
import { PLACEHOLDER_COVER, type PostType } from "../types/posts.types";
import CreateCommentModal from "./CreateCommentModal";
import { useState } from "react";
import PostActionsMenu from "./PostActionsMenu";
import UpsertPostModal from "./UpsertPostModal";
import DeletePostModal from "./DeletePostModal";
import { Link } from "react-router";
import { useAuth } from "@/features/auth/hooks/useAuth";

type PostCardProps = PostType & {
  isLiked: boolean;
  isSaved: boolean;
};

const PostCard = ({
  id,
  slug,
  title,
  content,
  coverImage,
  createdAt,
  author,
  _count,
  isOwner,
  isLiked,
  isSaved,
}: PostCardProps) => {
  const toggleLikeMutation = useToggleLikeMutation();
  const toggleSaveMutation = useToggleSaveMutation();
  const { requireAuth } = useAuth();
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpsertModalOpen, setIsUpsertModalOpen] = useState(false);

  const handleLike = () => {
    requireAuth(() => toggleLikeMutation.mutate({ postId: id, isLiked }));
  };

  const handleSave = () => {
    requireAuth(() => toggleSaveMutation.mutate({ postId: id, isSaved }));
  };

  const handleShare = async (): Promise<boolean> => {
    const url = `${window.location.origin}/posts/${slug}`;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user dismissed the native share dialog
      }
      return false;
    }

    await navigator.clipboard.writeText(url);
    return true;
  };

  const fullName = `${author.firstName} ${author.lastName}`;
  const authorHref = isOwner ? "/profile" : `/users/${author.id}`;

  const formattedDate = createdAt.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = createdAt.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <article className="w-full p-3 shadow-md/5 border border-border bg-surface rounded-lg">
      <div className="flex flex-col gap-4">
        <header className="relative flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link
              to={authorHref}
              aria-label={`View ${fullName}'s profile`}
              className="cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Avatar profileImage={author.profileImage} fullName={fullName} />
            </Link>
            <div className="flex flex-col items-start gap-0.5">
              <Link
                to={authorHref}
                aria-label={`View ${fullName}'s profile`}
                className="flex items-center gap-1 cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span className="text-xs font-semibold text-heading hover:text-primary transition-colors">
                  {fullName}
                </span>
                <RiVerifiedBadgeFill
                  aria-label="Verified"
                  role="img"
                  className="text-primary text-sm"
                />
              </Link>
              <time
                dateTime={createdAt.toISOString()}
                className="text-xs text-muted"
              >
                {`${formattedDate} • ${formattedTime}`}
              </time>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen((prev) => !prev);
            }}
            aria-label="Post options"
            className="cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <BsThreeDotsVertical className="w-4.5 h-4.5 text-muted hover:text-heading transition-colors" />
          </button>
          {isMenuOpen && (
            <PostActionsMenu
              onClose={() => setIsMenuOpen(false)}
              onShare={handleShare}
              onUpdate={() => setIsUpsertModalOpen(true)}
              onDelete={() => setIsDeleteModalOpen(true)}
              isOwner={isOwner}
            />
          )}
        </header>

        {/* Body */}
        <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-4 sm:gap-10">
          <div>
            <Link
              to={`/posts/${slug}`}
              className="inline-block cursor-pointer text-left rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <h2 className="text-lg font-semibold text-heading hover:text-primary transition-colors">
                {title}
              </h2>
            </Link>
            <p className="text-sm text-muted line-clamp-3">{content}</p>
          </div>

          <Link
            to={`/posts/${slug}`}
            className="block w-full h-full cursor-pointer rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <img
              src={coverImage || PLACEHOLDER_COVER}
              alt={`Cover image for "${title}"`}
              className="rounded-xl object-cover w-full h-40 sm:h-full"
            />
          </Link>
        </div>
      </div>

      <footer className="flex justify-between items-center border-t border-border pt-3 mt-3 -mx-3 px-3">
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={handleLike}
            aria-label={
              isLiked
                ? `Unlike post (${_count.likes} likes)`
                : `Like post (${_count.likes} likes)`
            }
            aria-pressed={isLiked}
            className={`flex items-center gap-1 text-sm font-semibold transition-colors cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              isLiked ? "text-danger" : "text-muted hover:text-heading"
            }`}
          >
            <LuHeart
              aria-hidden="true"
              className={`text-lg ${isLiked ? "fill-current" : ""}`}
            />
            {_count.likes}
          </button>
          <button
            type="button"
            onClick={() => requireAuth(() => setIsCommentModalOpen(true))}
            aria-label={`View comments (${_count.comments} comments)`}
            className="flex items-center gap-1 text-sm font-semibold text-muted hover:text-heading transition-colors cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <LuMessageCircle aria-hidden="true" className="text-lg" />
            {_count.comments}
          </button>
        </div>

        <button
          type="button"
          onClick={handleSave}
          aria-label={isSaved ? "Unsave post" : "Save post"}
          aria-pressed={isSaved}
          className={`transition-colors cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
            isSaved ? "text-primary" : "text-muted hover:text-heading"
          }`}
        >
          <LuBookmark
            aria-hidden="true"
            className={`text-lg ${isSaved ? "fill-current" : ""}`}
          />
        </button>
      </footer>
      {isCommentModalOpen && (
        <CreateCommentModal
          onClose={() => setIsCommentModalOpen(false)}
          postId={id}
        />
      )}
      {isUpsertModalOpen && (
        <UpsertPostModal
          onClose={() => setIsUpsertModalOpen(false)}
          post={{ id, title, content, coverImage }}
        />
      )}
      {isDeleteModalOpen && (
        <DeletePostModal
          onClose={() => setIsDeleteModalOpen(false)}
          postId={id}
        />
      )}
    </article>
  );
};

export default PostCard;

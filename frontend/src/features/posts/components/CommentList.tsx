import Avatar from "@/components/Avatar";
import type { DetailedCommentType } from "../types/posts.types";

type CommentListProps = {
  comments: DetailedCommentType[];
};

const CommentList = ({ comments }: CommentListProps) => {
  if (comments.length === 0) {
    return (
      <p className="text-sm text-muted py-6 text-center">
        No comments yet. Be the first to comment.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {comments.map((comment) => {
        const fullName = `${comment.user.firstName} ${comment.user.lastName}`;
        const formattedDate = comment.createdAt.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });

        return (
          <li key={comment.id} className="flex gap-3">
            <Avatar
              profileImage={comment.user.profileImage}
              fullName={fullName}
              size="sm"
            />
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-heading">
                  {fullName}
                </span>
                <time
                  dateTime={comment.createdAt.toISOString()}
                  className="text-xs text-muted"
                >
                  {formattedDate}
                </time>
              </div>
              <p className="text-sm text-muted">{comment.comment}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CommentList;

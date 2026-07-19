import Modal from "@/components/Modal";
import { useCreateCommentMutation } from "../hooks/useComments";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createCommentSchema,
  type CreateCommentDTO,
} from "../types/comments.types";
import { LuMessageCircle } from "react-icons/lu";
import Avatar from "@/components/Avatar";
import Spinner from "@/components/Spinner";
import { useMyProfileQuery } from "@/features/users/hooks/useUsers";

type CreateCommentProps = {
  onClose: () => void;
  postId: number;
};

const CreateCommentModal = ({ onClose, postId }: CreateCommentProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(createCommentSchema) });

  const createCommentMutation = useCreateCommentMutation();
  const { data: profile } = useMyProfileQuery();

  const fullName = profile ? `${profile.firstName} ${profile.lastName}` : "";

  const onSubmit = ({ comment }: CreateCommentDTO) => {
    createCommentMutation.mutate({ postId, comment });
    onClose();
    reset();
  };

  const cancelSubmition = () => {
    if (!createCommentMutation.isPending) {
      onClose();
      reset();
    }
  };

  return (
    <Modal onClose={cancelSubmition}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-lg font-bold text-heading pr-3">Add a comment</h3>

        <div className="mt-8 flex flex-col gap-3">
          <label
            htmlFor="comment"
            className="block text-sm font-semibold text-heading mb-2"
          >
            <div className="flex justify-start items-center gap-3">
              <Avatar
                fullName={fullName}
                profileImage={profile?.profileImage ?? ""}
              />
              {fullName}
              <span className="text-subtle text-xs">Posting as yourself</span>
            </div>
          </label>
          <div>
            <textarea
              id="comment"
              {...register("comment")}
              placeholder="Write your comment here..."
              className="block w-full rounded-lg ring-1 px-3 ring-border-strong py-3 text-heading font-semibold placeholder-muted transition-shadow focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
            ></textarea>
            {errors.comment && (
              <p className="text-sm text-danger mt-1">
                {errors.comment.message}
              </p>
            )}
          </div>
          <div className="w-full flex justify-end mt-6 gap-3">
            <button
              type="button"
              onClick={cancelSubmition}
              disabled={createCommentMutation.isPending}
              className="py-2.5 px-5 text-center text-muted font-medium text-base border border-border rounded-lg cursor-pointer hover:text-heading hover:border-heading disabled:opacity-60 disabled:hover:text-muted disabled:hover:border-border disabled:cursor-not-allowed transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createCommentMutation.isPending}
              className="flex justify-center items-center gap-2 py-2.5 px-5 text-center text-white font-medium text-base bg-primary rounded-lg cursor-pointer hover:bg-primary-hover disabled:bg-primary-hover disabled:cursor-not-allowed transition-colors"
            >
              {createCommentMutation.isPending ? (
                <Spinner className="w-5 h-5 border-2 text-white" />
              ) : (
                <>
                  <LuMessageCircle />
                  Post Comment
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CreateCommentModal;

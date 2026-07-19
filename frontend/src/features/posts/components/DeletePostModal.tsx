import Modal from "@/components/Modal";
import { useDeletePostMutation } from "../hooks/usePosts";
import Spinner from "@/components/Spinner";

type DeletePostProps = {
  onClose: () => void;
  postId: number;
};

const DeletePostModal = ({ onClose, postId }: DeletePostProps) => {
  const deletePostMutation = useDeletePostMutation();

  const handleDelete = () => {
    deletePostMutation.mutate(postId, { onSuccess: onClose });
  };

  return (
    <Modal onClose={onClose} size="sm">
      <div>
        <h3 className="text-lg font-bold text-heading pr-3">
          Are you sure you want to delete the post?
        </h3>

        <div className="flex justify-center gap-3 mt-8">
          <button
            type="button"
            onClick={onClose}
            disabled={deletePostMutation.isPending}
            className="py-2.5 px-5 text-center text-muted font-medium text-base border border-border rounded-lg cursor-pointer hover:text-heading hover:border-heading disabled:opacity-60 disabled:hover:text-muted disabled:hover:border-border disabled:cursor-not-allowed transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deletePostMutation.isPending}
            className="flex justify-center items-center gap-2 py-2.5 px-5 text-center text-white font-medium text-base bg-danger rounded-lg cursor-pointer hover:bg-danger-hover disabled:bg-danger-hover disabled:cursor-not-allowed transition-colors"
          >
            {deletePostMutation.isPending ? (
              <Spinner className="w-5 h-5 border-2 text-white" />
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeletePostModal;

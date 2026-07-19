import Modal from "@/components/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  upsertPostSchema,
  type BasePostType,
  type UpsertPostDTO,
  type UpsertPostFormType,
} from "../types/posts.types";
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from "../hooks/usePosts";
import Input from "@/components/Input";
import { LuImage, LuSend, LuUpload } from "react-icons/lu";
import Spinner from "@/components/Spinner";
import { useRef, useState } from "react";
import { uploadCoverImage } from "@/services/cloudinary";

type UpsertPostProps = {
  onClose: () => void;
  post?: Pick<BasePostType, "id" | "title" | "content" | "coverImage">;
};

const UpsertPostModal = ({ onClose, post }: UpsertPostProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(upsertPostSchema),
    values: post
      ? { title: post.title, content: post.content }
      : { title: "", content: "" },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? "");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const createPostMutation = useCreatePostMutation();
  const updatePostMutation = useUpdatePostMutation();
  const mutation = post ? updatePostMutation : createPostMutation;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setIsUploading(true);
    try {
      const url = await uploadCoverImage(file);
      setCoverImage(url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = (form: UpsertPostFormType) => {
    const payload: UpsertPostDTO = { ...form, coverImage };

    if (!post) {
      createPostMutation.mutate(payload, { onSuccess: onClose });
    } else {
      updatePostMutation.mutate(
        { postId: post.id, postData: payload },
        { onSuccess: onClose },
      );
    }
  };

  const cancelSubmition = () => {
    if (!mutation.isPending) {
      onClose();
    }
  };

  return (
    <Modal onClose={cancelSubmition}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-lg font-bold text-heading pr-6">
          {!post ? "Create a new blog post" : "Update your post"}
        </h3>

        <div className="mt-8 flex flex-col gap-5">
          {mutation.isError && (
            <p className="text-sm text-danger">{mutation.error.message}</p>
          )}
          <Input
            type="text"
            label="Blog Title"
            name="title"
            register={register}
            errors={errors}
            placeholder="Enter an engaging title here..."
            className="font-medium"
          />

          {/* Cover slika */}
          <div>
            <label className="block text-sm font-semibold text-heading mb-2">
              Cover image (optional)
            </label>
            <div className="flex items-center gap-4">
              <div className="relative flex justify-center items-center w-32 h-20 shrink-0 overflow-hidden rounded-lg ring-1 ring-border-strong bg-primary/5">
                {coverImage ? (
                  <img
                    src={coverImage}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <LuImage className="w-6 h-6 text-muted" />
                )}
                {isUploading && (
                  <div className="absolute inset-0 flex justify-center items-center bg-black/30">
                    <Spinner className="w-5 h-5 border-2 text-white" />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="flex items-center gap-2 py-2 px-3 w-fit text-sm font-medium text-heading border border-border rounded-lg cursor-pointer hover:border-heading disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                >
                  <LuUpload className="w-4 h-4" />
                  {coverImage ? "Change cover" : "Upload cover"}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {uploadError && (
                  <p className="text-sm text-danger">{uploadError}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-semibold text-heading mb-2"
            >
              Content
            </label>
            <textarea
              id="content"
              {...register("content")}
              placeholder="Write your content here..."
              className="block w-full rounded-lg ring-1 px-3 ring-border-strong py-3 text-heading font-semibold placeholder-muted transition-shadow focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
            ></textarea>
            {errors.content && (
              <p className="text-sm text-danger mt-1">
                {errors.content.message}
              </p>
            )}
          </div>
        </div>

        <div className="w-full flex justify-end mt-6 gap-3">
          <button
            type="button"
            onClick={cancelSubmition}
            disabled={mutation.isPending}
            className="py-2.5 px-5 text-center text-muted font-medium text-base border border-border rounded-lg cursor-pointer hover:text-heading hover:border-heading disabled:opacity-60 disabled:hover:text-muted disabled:hover:border-border disabled:cursor-not-allowed transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={mutation.isPending || isUploading}
            className="flex justify-center items-center gap-2 py-2.5 px-5 text-center text-white font-medium text-base bg-primary rounded-lg cursor-pointer hover:bg-primary-hover disabled:bg-primary-hover disabled:cursor-not-allowed transition-colors"
          >
            {mutation.isPending ? (
              <Spinner className="w-5 h-5 border-2 text-white" />
            ) : (
              <>
                <LuSend />
                {!post ? "Publish" : "Save Changes"}
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpsertPostModal;

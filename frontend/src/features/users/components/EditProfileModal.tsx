import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Avatar from "@/components/Avatar";
import Spinner from "@/components/Spinner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  editProfileSchema,
  type EditProfileFormType,
} from "../types/users.types";
import { useMyProfileQuery, useUpdateProfileMutation } from "../hooks/useUsers";
import { uploadProfileImage } from "@/services/cloudinary";
import { useRef, useState } from "react";
import { LuCamera, LuSave } from "react-icons/lu";

type EditProfileModalProps = {
  onClose: () => void;
};

const EditProfileModal = ({ onClose }: EditProfileModalProps) => {
  const { data: profile, isPending } = useMyProfileQuery();
  const updateMutation = useUpdateProfileMutation();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // until the user uploads a new one, show whatever is on the profile
  const imageUrl = uploadedImage ?? profile?.profileImage ?? "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editProfileSchema),
    values: profile
      ? { firstName: profile.firstName, lastName: profile.lastName }
      : { firstName: "", lastName: "" },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setIsUploading(true);
    try {
      const url = await uploadProfileImage(file);
      setUploadedImage(url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = (form: EditProfileFormType) => {
    updateMutation.mutate(
      { ...form, profileImage: imageUrl },
      { onSuccess: onClose },
    );
  };

  const fullName = profile ? `${profile.firstName} ${profile.lastName}` : "User";

  return (
    <Modal onClose={onClose} size="md">
      <h3 className="text-lg font-bold text-heading pr-6">Edit profile</h3>

      {isPending || !profile ? (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 flex flex-col gap-5"
        >
          {/* Photo */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar profileImage={imageUrl} fullName={fullName} size="xl" />
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30">
                  <Spinner className="w-6 h-6" />
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
                <LuCamera className="w-4 h-4" />
                {isUploading ? "Uploading..." : "Change photo"}
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

          {/* Name */}
          <div className="flex gap-3">
            <Input
              type="text"
              label="First name"
              name="firstName"
              register={register}
              errors={errors}
              placeholder="John"
            />
            <Input
              type="text"
              label="Last name"
              name="lastName"
              register={register}
              errors={errors}
              placeholder="Doe"
            />
          </div>

          {updateMutation.isError && (
            <p className="text-sm text-danger">
              {updateMutation.error.message}
            </p>
          )}

          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={updateMutation.isPending}
              className="py-2.5 px-5 text-muted font-medium border border-border rounded-lg cursor-pointer hover:text-heading hover:border-heading disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateMutation.isPending || isUploading}
              className="flex items-center gap-2 py-2.5 px-5 text-white font-medium bg-primary rounded-lg cursor-pointer hover:bg-primary-hover disabled:bg-primary-hover disabled:cursor-not-allowed transition-colors"
            >
              {updateMutation.isPending ? (
                "Saving..."
              ) : (
                <>
                  <LuSave className="w-4 h-4" />
                  Save changes
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default EditProfileModal;

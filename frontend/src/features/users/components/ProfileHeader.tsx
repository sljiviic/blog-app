import Avatar from "@/components/Avatar";
import { LuBookmark, LuHeart, LuPencil, LuSquarePen } from "react-icons/lu";
import type { UserProfile } from "../types/users.types";
import { useState } from "react";
import EditProfileModal from "./EditProfileModal";

type ProfileHeaderProps = {
  profile: UserProfile;
};

const ProfileHeader = ({ profile }: ProfileHeaderProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const fullName = `${profile.firstName} ${profile.lastName}`;

  const stats = [
    { Icon: LuSquarePen, value: profile.stats.blogsPublished, label: "Blogs Published" },
    { Icon: LuHeart, value: profile.stats.likesReceived, label: "Likes Received" },
    { Icon: LuBookmark, value: profile.stats.postsSaved, label: "Posts Saved" },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-6 p-6 shadow-md/5 border border-border bg-surface rounded-lg">
      {isEditOpen && <EditProfileModal onClose={() => setIsEditOpen(false)} />}
      <Avatar profileImage={profile.profileImage} fullName={fullName} size="xl" />

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-heading">{fullName}</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted">{profile.email}</span>
          <button
            type="button"
            onClick={() => setIsEditOpen(true)}
            className="flex items-center gap-1.5 py-1.5 px-3 text-sm font-medium text-heading border border-border rounded-lg cursor-pointer hover:border-heading transition-colors"
          >
            <LuPencil className="w-3.5 h-3.5" />
            Edit Profile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 sm:ml-auto">
        {stats.map(({ Icon, value, label }) => (
          <div key={label} className="flex flex-col items-center gap-1 text-center">
            <div className="flex justify-center items-center w-9 h-9 rounded-lg bg-primary/8 text-primary">
              <Icon className="w-4.5 h-4.5" />
            </div>
            <span className="text-xl font-bold text-heading">{value}</span>
            <span className="text-xs font-medium text-muted whitespace-nowrap">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileHeader;

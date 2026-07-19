import Avatar from "@/components/Avatar";
import { LuHeart, LuSquarePen } from "react-icons/lu";
import type { PublicUserProfile } from "../types/users.types";

type UserProfileHeaderProps = {
  profile: PublicUserProfile;
};

const UserProfileHeader = ({ profile }: UserProfileHeaderProps) => {
  const fullName = `${profile.firstName} ${profile.lastName}`;

  const stats = [
    {
      Icon: LuSquarePen,
      value: profile.stats.blogsPublished,
      label: "Blogs Published",
    },
    {
      Icon: LuHeart,
      value: profile.stats.likesReceived,
      label: "Likes Received",
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-6 p-6 shadow-md/5 border border-border bg-surface rounded-lg">
      <Avatar profileImage={profile.profileImage} fullName={fullName} size="xl" />

      <h1 className="text-2xl font-bold text-heading">{fullName}</h1>

      <div className="grid grid-cols-2 gap-6 sm:ml-auto">
        {stats.map(({ Icon, value, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-1 text-center"
          >
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

export default UserProfileHeader;

type AvatarSize = "sm" | "md" | "lg" | "xl";

type AvatarProps = {
  profileImage: string;
  fullName: string;
  size?: AvatarSize;
};

const avatarSize: Record<AvatarSize, string> = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
  xl: "w-28 h-28",
};

const Avatar = ({ profileImage, fullName, size = "md" }: AvatarProps) => {
  return (
    <img
      src={
        profileImage
          ? profileImage
          : "https://res.cloudinary.com/rhgkp87k/image/upload/v1783978645/Portrait_Placeholder_uuyebq.png"
      }
      alt={`${fullName}'s avatar`}
      className={`rounded-full object-cover shrink-0 ${avatarSize[size]}`}
    />
  );
};

export default Avatar;

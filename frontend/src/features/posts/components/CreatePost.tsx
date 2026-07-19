import Avatar from "@/components/Avatar";

type CreatePostProps = {
  fullName: string;
  profileImage?: string;
  onClick: () => void;
};

const CreatePost = ({
  fullName,
  profileImage = "",
  onClick,
}: CreatePostProps) => {
  return (
    <div className="flex items-center gap-5 w-full p-3 shadow-md/5 border border-border bg-surface rounded-lg">
      <Avatar profileImage={profileImage} fullName={fullName} />
      <button
        type="button"
        onClick={onClick}
        className="w-full rounded-xl ring-1 ring-border-strong p-3 text-muted text-sm text-left bg-primary/2 cursor-text hover:bg-primary/5 transition-colors"
      >
        What's on your mind?
      </button>
    </div>
  );
};

export default CreatePost;

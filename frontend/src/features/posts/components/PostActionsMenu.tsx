import { useClickOutside } from "@/hooks/useClickOutside";
import { useRef, useState } from "react";
import { LuCheck, LuPencil, LuShare2, LuTrash2 } from "react-icons/lu";

type PostActionsMenuProps = {
  onClose: () => void;
  onShare: () => Promise<boolean>;
  onUpdate: () => void;
  onDelete: () => void;
  isOwner: boolean;
};

const PostActionsMenu = ({
  onClose,
  onShare,
  onUpdate,
  onDelete,
  isOwner,
}: PostActionsMenuProps) => {
  const menuRef = useRef(null);
  useClickOutside(menuRef, onClose);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const didCopy = await onShare();
    if (didCopy) {
      setCopied(true);
      setTimeout(onClose, 1200);
    } else {
      onClose();
    }
  };

  return (
    <div
      ref={menuRef}
      className="absolute top-0 mt-10 right-0 flex flex-col gap-1 max-w-30 w-full z-40 rounded-xl p-2 bg-surface shadow-lg"
    >
      <button
        onClick={handleShare}
        disabled={copied}
        className="flex justify-center items-center gap-2 py-2 px-3 text-center text-muted font-medium text-sm bg-primary/8 rounded-lg cursor-pointer hover:bg-primary/12 transition-colors"
      >
        {copied ? (
          <>
            <LuCheck className="w-4 h-4" />
            Copied!
          </>
        ) : (
          <>
            <LuShare2 className="w-4 h-4" />
            Share
          </>
        )}
      </button>
      {isOwner && (
        <>
          <button
            onClick={() => {
              onUpdate();
              onClose();
            }}
            className="flex justify-center items-center gap-2 py-2 px-3 text-center text-muted font-medium text-sm bg-primary/8 rounded-lg cursor-pointer hover:bg-primary/12 transition-colors"
          >
            <LuPencil className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={() => {
              onDelete();
              onClose();
            }}
            className="flex justify-center items-center gap-2 py-2 px-3 text-center text-surface font-medium text-sm bg-danger rounded-lg cursor-pointer hover:bg-danger-hover transition-colors"
          >
            <LuTrash2 className="w-4 h-4" />
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default PostActionsMenu;

import { useClickOutside } from "@/hooks/useClickOutside";
import { useRef } from "react";
import { LuBookmark, LuLogOut, LuSettings, LuUser } from "react-icons/lu";
import { Link } from "react-router";

type ProfileMenuProps = {
  onClose: () => void;
  onSettings: () => void;
  onLogout: () => void;
};

const itemClasses =
  "flex items-center gap-3 py-2 px-3 rounded-lg text-sm font-medium text-left transition-colors";

const ProfileMenu = ({ onClose, onSettings, onLogout }: ProfileMenuProps) => {
  const menuRef = useRef(null);
  useClickOutside(menuRef, onClose);

  return (
    <div
      ref={menuRef}
      className="absolute top-full right-0 mt-2 flex flex-col min-w-44 z-40 rounded-xl p-2 bg-surface shadow-lg"
    >
      <Link
        to="/profile"
        onClick={onClose}
        className={`${itemClasses} text-heading cursor-pointer hover:bg-primary/6`}
      >
        <LuUser className="w-4 h-4" />
        Profile
      </Link>
      <Link
        to="/saved"
        onClick={onClose}
        className={`${itemClasses} text-heading cursor-pointer hover:bg-primary/6`}
      >
        <LuBookmark className="w-4 h-4" />
        Saved
      </Link>
      <button
        onClick={() => {
          onSettings();
          onClose();
        }}
        className={`${itemClasses} text-heading cursor-pointer hover:bg-primary/6`}
      >
        <LuSettings className="w-4 h-4" />
        Settings
      </button>

      <div className="my-1 border-t border-border" />

      <button
        onClick={() => {
          onLogout();
          onClose();
        }}
        className={`${itemClasses} text-danger cursor-pointer hover:bg-danger/8`}
      >
        <LuLogOut className="w-4 h-4" />
        Log Out
      </button>
    </div>
  );
};

export default ProfileMenu;

import { NavLink } from "react-router";
import { LuHouse, LuBookmark, LuUser, LuSquarePen } from "react-icons/lu";
import { useState } from "react";
import UpsertPostModal from "@/features/posts/components/UpsertPostModal";
import { useAuth } from "@/features/auth/hooks/useAuth";

const navItems = [
  { to: "/", label: "Home", Icon: LuHouse, end: true },
  { to: "/saved", label: "Saved", Icon: LuBookmark },
  { to: "/profile", label: "My Profile", Icon: LuUser },
];

const SideNav = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { requireAuth } = useAuth();

  return (
    <div className="hidden lg:block fixed inset-y-0 left-0 w-50 pt-22 pb-6 px-4 border-r border-border">
      <nav className="flex flex-col gap-1">
        {navItems.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex gap-2 items-center py-3 px-6 font-semibold text-left rounded-3xl transition-colors cursor-pointer ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-heading hover:bg-primary/6"
              }`
            }
          >
            <Icon className="w-6 h-6" />
            {label}
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        onClick={() => requireAuth(() => setIsCreateOpen(true))}
        className="flex justify-center items-center gap-2 w-full mt-3 py-3 px-4 font-semibold text-white bg-primary rounded-3xl cursor-pointer hover:bg-primary-hover transition-colors"
      >
        <LuSquarePen className="w-5 h-5" />
        Create Post
      </button>
      {isCreateOpen && (
        <UpsertPostModal onClose={() => setIsCreateOpen(false)} />
      )}
    </div>
  );
};

export default SideNav;

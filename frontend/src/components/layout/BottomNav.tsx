import { NavLink } from "react-router";
import { LuHouse, LuBookmark, LuUser, LuPlus } from "react-icons/lu";
import { useState } from "react";
import UpsertPostModal from "@/features/posts/components/UpsertPostModal";
import { useAuth } from "@/features/auth/hooks/useAuth";

const navItems = [
  { to: "/", label: "Home", Icon: LuHouse, end: true },
  { to: "/saved", label: "Saved", Icon: LuBookmark },
  { to: "/profile", label: "Profile", Icon: LuUser },
];

const BottomNav = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { requireAuth } = useAuth();

  return (
    <>
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 h-16 flex items-center justify-around bg-surface border-t border-border">
        {navItems.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 text-xs font-medium transition-colors ${
                isActive ? "text-primary" : "text-muted"
              }`
            }
          >
            <Icon className="w-5 h-5" />
            {label}
          </NavLink>
        ))}

        <button
          type="button"
          onClick={() => requireAuth(() => setIsCreateOpen(true))}
          aria-label="Create post"
          className="flex justify-center items-center w-11 h-11 -mt-1 rounded-xl bg-primary text-white cursor-pointer hover:bg-primary-hover transition-colors"
        >
          <LuPlus className="w-6 h-6" />
        </button>
      </nav>

      {isCreateOpen && (
        <UpsertPostModal onClose={() => setIsCreateOpen(false)} />
      )}
    </>
  );
};

export default BottomNav;

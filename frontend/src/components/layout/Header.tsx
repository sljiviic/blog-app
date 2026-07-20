import Avatar from "../Avatar";
import PostSearch from "@/features/posts/components/PostSearch/PostSearch";
import SearchModal from "@/features/posts/components/PostSearch/SearchModal";
import Logo from "../Logo";
import { LuChevronDown, LuSearch } from "react-icons/lu";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import ProfileMenu from "./ProfileMenu";
import EditProfileModal from "@/features/users/components/EditProfileModal";
import { useMyProfileQuery } from "@/features/users/hooks/useUsers";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const token = localStorage.getItem("token");
  const { data: profile } = useMyProfileQuery(!!token);
  const fullName = profile ? `${profile.firstName} ${profile.lastName}` : "";

  const handleLogout = () => {
    localStorage.removeItem("token");
    queryClient.clear();
    navigate("/auth");
  };

  return (
    <header className="fixed top-0 inset-x-0 h-16 bg-surface border-b border-border z-50">
      <div className="flex justify-between items-center gap-3 w-full h-full max-w-[1600px] mx-auto px-4 sm:px-12">
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>

        {/* Desktop: inline search */}
        <div className="hidden lg:flex flex-1 justify-center">
          <PostSearch />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Mobile: button that opens the search modal */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search"
            className="lg:hidden flex justify-center items-center w-10 h-10 rounded-lg ring-1 ring-border text-muted hover:text-heading cursor-pointer transition-colors"
          >
            <LuSearch className="w-5 h-5" />
          </button>

          {token ? (
            <div className="relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen((prev) => !prev);
                }}
                aria-label="Account menu"
                aria-expanded={isMenuOpen}
                className="flex justify-center items-center gap-1.5 cursor-pointer"
              >
                <Avatar
                  profileImage={profile?.profileImage ?? ""}
                  fullName={fullName || "User"}
                />
                <LuChevronDown
                  className={`text-muted transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isMenuOpen && (
                <ProfileMenu
                  onClose={() => setIsMenuOpen(false)}
                  onSettings={() => setIsEditOpen(true)}
                  onLogout={handleLogout}
                />
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/auth"
                className="hidden sm:block py-2 px-3 text-sm font-semibold text-heading rounded-lg hover:bg-primary/6 transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/auth?mode=register"
                className="py-2 px-3 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors whitespace-nowrap"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>

      {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}
      {isEditOpen && <EditProfileModal onClose={() => setIsEditOpen(false)} />}
    </header>
  );
};

export default Header;

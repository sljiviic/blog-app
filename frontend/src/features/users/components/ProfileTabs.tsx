import type { Dispatch, SetStateAction } from "react";

export type ProfileTab = "posts" | "saved";

type ProfileTabsProps = {
  activeTab: ProfileTab;
  setActiveTab: Dispatch<SetStateAction<ProfileTab>>;
};

const tabs: { key: ProfileTab; label: string }[] = [
  { key: "posts", label: "My Posts" },
  { key: "saved", label: "Saved Posts" },
];

const ProfileTabs = ({ activeTab, setActiveTab }: ProfileTabsProps) => {
  return (
    <div className="flex items-center gap-6 border-b border-border">
      {tabs.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          onClick={() => setActiveTab(key)}
          aria-pressed={activeTab === key}
          className={`relative -mb-px py-3 text-sm font-semibold cursor-pointer transition-colors ${
            activeTab === key ? "text-primary" : "text-muted hover:text-heading"
          }`}
        >
          {label}
          {activeTab === key && (
            <span className="absolute left-0 bottom-0 w-full h-0.75 bg-primary rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
};

export default ProfileTabs;

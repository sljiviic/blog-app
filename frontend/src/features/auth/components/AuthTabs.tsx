type AuthTab = "login" | "register";

type AuthTabsProps = {
  activeTab: AuthTab;
  onChange: (tab: AuthTab) => void;
};

const AuthTabs = ({ activeTab, onChange }: AuthTabsProps) => {
  return (
    <div className="relative w-full flex">
      <button
        type="button"
        onClick={() => onChange("login")}
        aria-pressed={activeTab === "login"}
        className={`flex-1 px-3 py-2 font-semibold cursor-pointer transition-colors ${activeTab === "login" ? "text-primary" : "text-muted"}`}
      >
        Login
      </button>
      <button
        type="button"
        onClick={() => onChange("register")}
        aria-pressed={activeTab === "register"}
        className={`flex-1 px-3 py-2 font-semibold cursor-pointer transition-colors ${activeTab === "register" ? "text-primary" : "text-muted"}`}
      >
        Register
      </button>

      <div className="absolute top-full left-0 w-full h-0.75 bg-border rounded-full" />
      <div
        className={`absolute top-full left-0 w-1/2 h-0.75 bg-primary rounded-full transition-transform duration-300 ease-in-out ${activeTab === "login" ? "translate-x-0" : "translate-x-full"}`}
      />
    </div>
  );
};

export default AuthTabs;
export type { AuthTab };

import { useState } from "react";
import LoginForm from "../features/auth/components/LoginForm";
import RegisterForm from "../features/auth/components/RegisterForm";
import AuthHero from "../features/auth/components/AuthHero";
import AuthTabs, { type AuthTab } from "../features/auth/components/AuthTabs";
import SecurityNote from "../features/auth/components/SecurityNote";
import Logo from "../components/Logo";
import { Link, useSearchParams } from "react-router";
import { LuArrowRight } from "react-icons/lu";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<AuthTab>(
    searchParams.get("mode") === "register" ? "register" : "login",
  );
  const isLogin = activeTab === "login";

  return (
    <div className="flex min-h-screen">
      {/* Left side */}
      <AuthHero />

      {/* Right side */}
      <div className="flex-1 flex flex-col gap-12 lg:gap-6 sm:justify-center items-center px-8 sm:px-12 py-10 sm:bg-black/5">
        <Logo className="lg:hidden text-heading" />

        {/* Main card */}
        <div className="flex flex-col gap-7 w-full sm:max-w-lg rounded-xl sm:shadow-md sm:px-8 sm:py-10 bg-surface">
          {/* Card header */}
          <div className="flex flex-col text-center gap-1.5">
            <h2 className="text-2xl font-bold text-heading">
              {isLogin ? "Welcome back!👋" : "Create your account!🚀"}
            </h2>
            <p className="text-sm font-semibold text-muted">
              {isLogin
                ? "Login to countinue your jurney"
                : "Join out community of developers & creators"}
            </p>
          </div>

          {/* Login/register tabs */}
          <AuthTabs activeTab={activeTab} onChange={setActiveTab} />

          {/* Form */}
          {isLogin ? <LoginForm /> : <RegisterForm />}

          {/* Switch */}
          <div className="flex gap-2 justify-center text-sm font-semibold text-muted">
            <p>
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <button
              type="button"
              onClick={() => setActiveTab(isLogin ? "register" : "login")}
              className="text-primary cursor-pointer"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs text-subtle">or</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <Link
            to="/"
            className="flex justify-center items-center gap-2 py-2.5 px-5 text-sm font-semibold text-muted border border-border rounded-lg hover:text-heading hover:border-heading transition-colors"
          >
            Continue as guest
            <LuArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Footer */}
        <SecurityNote />
      </div>
    </div>
  );
};

export default Auth;

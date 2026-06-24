import { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { LuBookmark, LuUsers } from "react-icons/lu";
import { LuPencilLine } from "react-icons/lu";
import { LuShieldCheck } from "react-icons/lu";

const AuthLayout = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <div className="flex min-h-screen">
      {/* Left side */}
      <div
        className="relative hidden lg:flex flex-1 flex-col px-12 py-8 bg-slate-950 bg-radial-[at_70%_80%] from-indigo-500/30 to-transparent before:absolute before:block before:inset-0  before:opacity-40
    before:bg-[radial-gradient(circle_at_60%_60%,white_1px,transparent_2px),radial-gradient(circle_at_70%_30%,white_1px,transparent_2px),radial-gradient(circle_at_70%_80%,white_1px,transparent_2px),radial-gradient(circle_at_85%_15%,white_2px,transparent_3px),radial-gradient(circle_at_80%_50%,white_1px,transparent_3px)]"
      >
        {/* logo */}
        <span className="text-3xl text-white font-bold mb-12">
          <span className="text-indigo-600">Dev</span>Stories
        </span>

        {/* content */}
        <div className="flex flex-1 flex-col gap-12 max-w-md">
          <div className="flex flex-col items-start gap-6">
            {/* tag */}
            <div className="flex gap-2 items-center px-4 py-2 rounded-full text-white text-sm font-semibold bg-indigo-500/15">
              <LuUsers className="stroke-[1.5] w-5 h-5 text-indigo-600" />
              <h3>A community for developers & creators</h3>
            </div>

            {/* heading */}
            <h1 className="text-5xl leading-[1.2] font-bold text-white">
              Share ideas.
              <br /> Inspire others.
              <br />
              <span className="text-indigo-600">Grow together.</span>
            </h1>
            <p className="text-base text-gray-400 font-semibold">
              DevStories is the modern bloggin platform build for developers, by
              a developer. <br />
              Write. Share. Connect.
            </p>
          </div>

          {/* points */}
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-3">
              {/* icon */}
              <div className="flex shrink-0 justify-center items-center p-2.5 rounded-xl bg-indigo-500/15 border border-indigo-500/20">
                <LuPencilLine className="stroke-[1.5] w-7 h-7 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-base text-white font-semibold">
                  Write with ease
                </h3>
                <p className="text-sm text-gray-400 font-semibold">
                  Beautiful editor to craft and publish your ideas.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              {/* icon */}
              <div className="flex shrink-0 justify-center items-center p-2.5 rounded-xl bg-indigo-500/15 border border-indigo-500/20">
                <LuUsers className="stroke-[1.5] w-7 h-7 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-base text-white font-semibold">
                  Write with ease
                </h3>
                <p className="text-sm text-gray-400 font-semibold">
                  Beautiful editor to craft and publish your ideas.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              {/* icon */}
              <div className="flex shrink-0 justify-center items-center p-2.5 rounded-xl bg-indigo-500/15 border border-indigo-500/20">
                <LuBookmark className="stroke-[1.5] w-7 h-7 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-base text-white font-semibold">
                  Write with ease
                </h3>
                <p className="text-sm text-gray-400 font-semibold">
                  Beautiful editor to craft and publish your ideas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1 flex flex-col gap-12 lg:gap-6 sm:justify-center items-center px-8 sm:px-12 py-10 sm:bg-black/5">
        {/* logo */}
        <span className="lg:hidden text-3xl text-gray-900 font-bold">
          <span className="text-indigo-600">Dev</span>Stories
        </span>
        {/* Main card */}
        <div className="flex flex-col gap-7 w-full sm:max-w-lg rounded-xl sm:shadow-md sm:px-8 sm:py-10 bg-white">
          {/* Card header */}
          <div className="flex flex-col text-center gap-1.5">
            <h2 className="text-2xl font-bold text-gray-900">
              {activeTab === "login"
                ? "Welcome back!👋"
                : "Create your account!🚀"}
            </h2>
            <p className="text-sm font-semibold text-gray-500">
              {activeTab === "login"
                ? "Login to countinue your jurney"
                : "Join out community of developers & creators"}
            </p>
          </div>

          {/* Login/register tabs */}
          <div className="relative w-full flex">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 px-3 py-2 font-semibold cursor-pointer transition-colors ${activeTab === "login" ? "text-indigo-600" : "text-gray-500"} `}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 px-3 py-2 font-semibold cursor-pointer transition-colors ${activeTab === "register" ? "text-indigo-600" : "text-gray-500"} `}
            >
              Register
            </button>
            <div className="absolute top-full left-0 w-full h-0.75 bg-gray-200 rounded-full" />
            <div
              className={`absolute top-full left-0 w-1/2 h-0.75 bg-indigo-600 rounded-full transition-transform duration-300 ease-in-out ${activeTab === "login" ? "translate-x-0" : "translate-x-full"}`}
            ></div>
          </div>

          {/* Form */}
          {activeTab === "login" ? <LoginForm /> : <RegisterForm />}

          <div className="flex gap-2 justify-center text-sm font-semibold text-gray-500">
            <p>
              {activeTab === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <button
              onClick={() =>
                setActiveTab((prev) =>
                  prev === "login" ? "register" : "login",
                )
              }
              className="text-indigo-600 cursor-pointer"
            >
              {activeTab === "login" ? "Register" : "Login"}
            </button>
          </div>
        </div>
        {/* footer */}
        <div className="flex flex-col items-center gap-2">
          {/* icon */}
          <div className="flex justify-center items-center p-2 rounded-full bg-gray-200">
            <LuShieldCheck className="stroke-[1.5] w-7 h-7 text-gray-500" />
          </div>
          <p className="text-sm text-center font-semibold text-gray-500">
            Your data is secure with us. <br />
            <span className="text-gray-400">
              We never share your information.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

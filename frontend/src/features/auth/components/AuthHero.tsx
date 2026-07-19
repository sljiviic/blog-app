import { LuBookmark, LuPencilLine, LuUsers } from "react-icons/lu";
import Logo from "../../../components/Logo";
import FeaturePoint from "./FeaturePoint";

const features = [
  {
    icon: LuPencilLine,
    title: "Write with ease",
    description: "Beautiful editor to craft and publish your ideas.",
  },
  {
    icon: LuUsers,
    title: "Grow your audience",
    description: "Connect with a community of developers & creators.",
  },
  {
    icon: LuBookmark,
    title: "Save what matters",
    description: "Bookmark stories and revisit them anytime.",
  },
];

const AuthHero = () => {
  return (
    <div className="relative hidden lg:flex flex-1 flex-col px-12 py-8 bg-slate-950 bg-radial-[at_70%_80%] from-primary-accent/30 to-transparent before:absolute before:block before:inset-0 before:opacity-40 before:bg-[radial-gradient(circle_at_60%_60%,white_1px,transparent_2px),radial-gradient(circle_at_70%_30%,white_1px,transparent_2px),radial-gradient(circle_at_70%_80%,white_1px,transparent_2px),radial-gradient(circle_at_85%_15%,white_2px,transparent_3px),radial-gradient(circle_at_80%_50%,white_1px,transparent_3px)]">
      <Logo className="text-white mb-12" />

      <div className="flex flex-1 flex-col gap-12 max-w-md">
        <div className="flex flex-col items-start gap-6">
          {/* tag */}
          <div className="flex gap-2 items-center px-4 py-2 rounded-full text-white text-sm font-semibold bg-primary-accent/15">
            <LuUsers aria-hidden="true" className="stroke-[1.5] w-5 h-5 text-primary" />
            <h3>A community for developers & creators</h3>
          </div>

          {/* heading */}
          <h1 className="text-5xl leading-[1.2] font-bold text-white">
            Share ideas.
            <br /> Inspire others.
            <br />
            <span className="text-primary">Grow together.</span>
          </h1>
          <p className="text-base text-subtle font-semibold">
            DevStories is the modern bloggin platform build for developers, by a
            developer. <br />
            Write. Share. Connect.
          </p>
        </div>

        {/* points */}
        <div className="flex flex-col gap-6">
          {features.map((feature) => (
            <FeaturePoint key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthHero;

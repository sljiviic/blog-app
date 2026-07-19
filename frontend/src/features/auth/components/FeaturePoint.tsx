import { type IconType } from "react-icons";

type FeaturePointProps = {
  icon: IconType;
  title: string;
  description: string;
};

const FeaturePoint = ({ icon: Icon, title, description }: FeaturePointProps) => {
  return (
    <div className="flex items-start gap-3">
      <div className="flex shrink-0 justify-center items-center p-2.5 rounded-xl bg-primary-accent/15 border border-primary-accent/20">
        <Icon aria-hidden="true" className="stroke-[1.5] w-6 h-6 text-primary" />
      </div>
      <div>
        <h3 className="text-base text-white font-semibold">{title}</h3>
        <p className="text-sm text-subtle font-semibold">{description}</p>
      </div>
    </div>
  );
};

export default FeaturePoint;

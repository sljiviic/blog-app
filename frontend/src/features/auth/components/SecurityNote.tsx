import { LuShieldCheck } from "react-icons/lu";

const SecurityNote = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex justify-center items-center p-2 rounded-full bg-border">
        <LuShieldCheck aria-hidden="true" className="stroke-[1.5] w-7 h-7 text-muted" />
      </div>
      <p className="text-sm text-center font-semibold text-muted">
        Your data is secure with us. <br />
        <span className="text-subtle">We never share your information.</span>
      </p>
    </div>
  );
};

export default SecurityNote;

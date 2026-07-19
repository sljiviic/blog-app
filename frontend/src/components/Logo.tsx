type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => {
  return (
    <span className={`text-3xl font-bold ${className ?? ""}`}>
      <span className="text-primary">Dev</span>Stories
    </span>
  );
};

export default Logo;

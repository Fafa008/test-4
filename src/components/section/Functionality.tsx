import { ReactNode } from "react";

interface FunctionalityProps {
  children?: ReactNode;
  className?: string;
}

const Functionality: React.FC<FunctionalityProps> = ({
  children,
  className,
}) => {
  return <div className={className}>{children}</div>;
};

export default Functionality;

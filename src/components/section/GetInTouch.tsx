interface GetInTouchProps {
  children?: React.ReactNode;
  className?: string;
}

const GetInTouch: React.FC<GetInTouchProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export default GetInTouch;

interface GetInTouchProps {
  children?: React.ReactNode;
  className?: string;
}

const GetInTouch: React.FC<GetInTouchProps> = () => {
  return (
    <div className="h-screen w-full bg-purple-500 dark:bg-purple-900"></div>
  );
};

export default GetInTouch;

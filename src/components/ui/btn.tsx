import { Link, useNavigate } from "react-router-dom";
interface ConnectButtonProps {
  to: string;
  refreshOnRedirect?: boolean;
  useNavigateHook?: boolean;
}

export default function ConnectButton({
  to,
  refreshOnRedirect = false,
  useNavigateHook = false,
}: ConnectButtonProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (refreshOnRedirect) {
      window.location.href = to;
    } else {
      navigate(to);
    }
  };

  return (
    <Link to={to} className="w-fit">
      <div className="flex">
        <button
          className="
        group
        p-5
        cursor-pointer 
        relative  
        text-xl 
        font-normal 
        border-0 
        flex 
        items-center 
        justify-center
        bg-transparent
         text-white
         h-auto  
         w-[170px]  
         overflow-hidden   
         transition-all
         duration-100"
          onClick={handleClick}
        >
          <span
            className="
        group-hover:w-full
        absolute 
        left-0 
        h-full 
        w-5 
        border-y
        border-l
         border-white
           transition-all
         duration-500"
          ></span>

          <p
            className="group-hover:opacity-0 group-hover:translate-x-[-100%] absolute translate-x-0 transition-all
         duration-200"
          >
            Essayer le Demo
          </p>

          <span className="group-hover:translate-x-0  group-hover:opacity-100 absolute  translate-x-full opacity-0  transition-all duration-200">
            Allez-y
          </span>

          <span className="group-hover:w-full absolute right-0 h-full w-5  border-y border-r  border-white transition-all duration-500"></span>
        </button>
      </div>
    </Link>
  );
}

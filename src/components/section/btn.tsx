import { div } from "framer-motion/client";

export default function Btn() {
  //state

  //comportement
  //affichage
  return (
    <button
      class="
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
    >
      <span
        class="
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
        class="group-hover:opacity-0 group-hover:translate-x-[-100%] absolute translate-x-0 transition-all
         duration-200"
      >
        Essayer Le Demo
      </p>

      <span class="group-hover:translate-x-0  group-hover:opacity-100 absolute  translate-x-full opacity-0  transition-all duration-200">
        Allez-y
      </span>

      <span class="group-hover:w-full absolute right-0 h-full w-5  border-y border-r  border-white transition-all duration-500"></span>
    </button>
  );
}

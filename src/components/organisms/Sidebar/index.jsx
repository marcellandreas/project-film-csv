import { useState } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const Menus = [{ title: "User", src: "" }];
  return (
    <div
      className={` ${
        open ? "w-72" : "w-20 "
      } bg-red-900 min-h-screen p-3  pt-8 duration-300 sticky top-0`}
    >
      <div
        className={`absolute h-8 flex justify-center items-center w-8 z-20 cursor-pointer -right-3 top-9  bg-blue-700
 border-2 rounded-full  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      >
        <FaAngleDoubleRight size={20} />
      </div>
      <div className="flex gap-x-4 items-center ">
        {/* <img
     src="./src/assets/logo.png"
     className={`cursor-pointer duration-500 ${
       open && "rotate-[360deg]"
     }`}
   /> */}
        <div
          className={`cursor-pointer duration-500 scale-100  ${
            open && "rotate-[360deg] scale-0"
          }`}
        >
          PF
        </div>
        <h1
          className={`text-white origin-left font-medium text-xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          PreviewFIlm
        </h1>
      </div>
      <div className="  min-h-[90vh] flex flex-col relative">
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <NavLink
              to={"/dashboard-admin"}
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-blue-900 text-gray-300 text-sm items-center gap-x-4 
    ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-white"} `}
            >
              <p>X</p>
              <span
                className={`${
                  !open && "hidden"
                } origin-left duration-200 font-semibold`}
              >
                {Menu.title}
              </span>
            </NavLink>
          ))}
        </ul>
        <div
          className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 hover:bg-white hover:text-black     mt-1 absolute bottom-0 w-full ${
            !open ? "justify-center" : ""
          }`}
        >
          <MdLogout size={18} />
          <span
            className={`${
              !open && "hidden"
            } origin-left duration-200 font-semibold`}
          >
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

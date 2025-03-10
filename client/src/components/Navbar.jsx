import "./index.css";
import { PanelRightClose } from "lucide-react";
import { DynamicWidget, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { useNavigate } from "react-router-dom";
import LogoDark from "../assets/bullrun-dark.png";

export default function CustomNavbar({ isSidebarOpen, setIsSidebarOpen }) {
  const navigate = useNavigate()
  const isLoggedIn = useIsLoggedIn()

  return (
    <div className="h-[55px] w-full bg-transparent flex flex-row justify-between items-center px-2 md:px-4">
      <div className="flex flex-row">
        {!isSidebarOpen && isLoggedIn && (
          <div
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`w-fit h-fit my-auto flex cursor-pointer flex items-center rounded-lg bg-transparent ml-2`}
          >
            <PanelRightClose
              size={20}
              className="w-[1.5dvw] flex-shrink-0 min-w-[20px] dark:text-white light:text-[#353839]"
            />
          </div>
        )}
        {!isSidebarOpen && isLoggedIn && (
          <div onClick={() => { navigate("/home") }} className="py-[2px] md:px-2 text-purple-500 font-bold text-xl cursor-pointer h-[46px] w-[130px] md:w-[170px]">
            <img src={LogoDark} alt="Brand Logo" className="h-full w-full hidden dark:block" />
          </div>
        )}
        {!isSidebarOpen && !isLoggedIn && (
          <div onClick={() => { navigate("/") }} className="py-[2px] md:px-2 text-purple-500 font-bold text-xl cursor-pointer h-[46px] w-[130px] md:w-[170px]">
            <img src={LogoDark} alt="Brand Logo" className="h-full w-full hidden dark:block" />
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {!isLoggedIn &&
          <div onClick={() => { navigate("/chatdemo") }} className="cursor-pointer md:w-[100px] min-w-fit flex-shrink-0 w-fit text-sm p-2 text-center bg-gradient-to-r from-green-900 to-green-700 hover:scale-105 duration-300 text-white rounded-lg font-semibold">
            Try AI Demo
          </div>
        }

        <div className="">
          <DynamicWidget innerButtonComponent={"Sign Up (FREE!)"} />
        </div>
      </div>


    </div>
  );
}
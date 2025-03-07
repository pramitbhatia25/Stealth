import "./index.css";
import { Moon, PanelRightClose, Sparkles } from "lucide-react";
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/bullrun-light.jpeg";
import LogoDark from "../assets/bullrun-dark.png";

export default function CustomNavbar({ isSidebarOpen, setIsSidebarOpen }) {
  const navigate = useNavigate()
  const isActive = (path) => location.pathname === path;

  return (
    <div className="h-[55px] w-full bg-transparent flex flex-row justify-between items-center px-4">
      <div className="flex flex-row">
        {!isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`hidden w-fit h-fit my-auto md:hidden flex cursor-pointer flex items-center rounded-lg bg-transparent hover:bg-green-900 ml-2`}
          >
            <PanelRightClose
              size={20}
              className="w-[1.5dvw] flex-shrink-0 min-w-[20px] dark:text-white light:text-[#353839]"
            />
          </div>
        )}
        {!isSidebarOpen && (
          <div className="py-[2px] px-2 text-purple-500 font-bold text-xl cursor-pointer h-[46px] w-[170px]">
            <img src={Logo} alt="Brand Logo" className="h-full w-full block dark:hidden" />
            <img src={LogoDark} alt="Brand Logo" className="h-full w-full hidden dark:block" />
          </div>
        )}
      </div>

      {!isActive("/") && <>
        <div className="md:flex hidden mx-auto w-fit flex-shrink-0 gap-5">
          <form className="relative w-fit flex-shrink-0 min-w-[300px]">
            <button
              type="submit"
              className="absolute left-2 top-1 text-purple-500 p-1 rounded-full transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="16" y1="16" x2="22" y2="22"></line>
              </svg>
            </button>
            <input
              type="text"
              placeholder="Search a company or market..."
              className="w-full bg-white text-black rounded-full py-2 pl-10 pr-4 text-xs border border-gray-200 focus:outline-none focus:ring-0 shadow-md rounded-bottom-shadow"
            />
          </form>

          <div className="hidden md:flex relative w-full flex flex-row gap-5">
            <div onClick={() => { navigate("/dashboard") }} className={`cursor-pointer flex items-center justify-center p-2 rounded-full text-xs w-fit min-w-[70px] flex-shrink-0 ${isActive("/dashboard") ? "bg-[#eceef2] hover:bg-gray-200" : "bg-transparent hover:bg-[#eceef2]"}`}>
              Crypto
            </div>
            <div onClick={() => { navigate("/chat") }} className={`cursor-pointer flex items-center border border-purple-500 justify-center p-2 rounded-full text-xs w-fit min-w-[70px] flex-shrink-0 ${isActive("/chat") ? "bg-[#eceef2] hover:bg-gray-200" : "bg-transparent hover:bg-[#eceef2]"}`}>
              <Sparkles className="w-4 h-4 flex-shrink-0 mr-2 text-purple-500" />
              Ask AI
            </div>
          </div>
        </div>

        <div className="flex gap-5 flex items-center justify-center">
          <div className="flex flex-row w-fit flex-shrink-0 flex items-center justify-center">
            <DynamicWidget variant='modal' innerButtonComponent={"Get Started"} />
          </div>
        </div>
      </>}
    </div>
  );
}
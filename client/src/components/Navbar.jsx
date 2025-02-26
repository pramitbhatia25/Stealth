import "./index.css";
import { PanelRightClose, Sparkles } from "lucide-react";
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useNavigate } from "react-router-dom";

export default function CustomNavbar({ isSidebarOpen, setIsSidebarOpen }) {
  const navigate = useNavigate()
  const isActive = (path) => location.pathname === path;

  return (
    <div className="h-[50px] w-full dark:bg-black light:bg-white flex flex-row justify-between items-center px-4 border-b border-gray-200">
      <div className="flex flex-row">
        {!isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`cursor-pointer flex items-center rounded-lg bg-transparent dark:hover:bg-purple-500 light:hover:bg-gray-200 p-1 px-2`}
          >
            <PanelRightClose
              className="w-[1.5dvw] flex-shrink-0 min-w-[20px] dark:text-white light:text-[#353839]"
            />
          </div>
        )}
        {!isSidebarOpen && (
          <div className="p-1 px-2 text-purple-500 font-bold text-xl cursor-pointer" onClick={() => { navigate("/") }}>BullRunAI</div>
        )}
      </div>

      <div className="md:flex hidden mx-auto w-fit flex-shrink-0">
        <form className="relative w-fit flex-shrink-0 min-w-[500px]">
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
      </div>

      <div className="flex gap-5 flex items-center justify-center">
        <div className="flex flex-row w-fit flex-shrink-0 flex items-center justify-center">
          <DynamicWidget variant='modal' innerButtonComponent={"Get Premium For Free 🔥"}/>
        </div>
      </div>
    </div>
  );
}
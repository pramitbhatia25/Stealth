import "./index.css";
import { PanelRightClose, Sparkles } from "lucide-react";
import { DynamicWidget, useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useNavigate } from "react-router-dom";

export default function CustomNavbar({ isSidebarOpen, setIsSidebarOpen }) {
  const navigate = useNavigate()
  const isActive = (path) => location.pathname === path;

  return (
    <div className="h-[50px] w-full bg-white flex flex-row justify-between items-center px-4 border-b border-gray-200">
      <div className="flex flex-row">
        {!isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`md:hidden cursor-pointer flex items-center rounded-lg bg-transparent hover:bg-gray-200 p-1 px-2`}
          >
            <PanelRightClose
              color="#353839"
              className="w-[1.5dvw] flex-shrink-0 min-w-[20px]"
            />
          </div>
        )}
        {!isSidebarOpen && (
          <div className="p-1 px-2 text-purple-500 font-bold text-xl cursor-pointer" onClick={() => { navigate("/") }}>stealthAI</div>
        )}
      </div>

      <div className="md:flex hidden px-4 gap-5 mx-auto w-fit flex-shrink-0">
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
        <div className="relative w-full flex flex-row gap-5">
          <div onClick={() => { navigate("/") }} className={`cursor-pointer flex items-center justify-center p-2 rounded-full text-xs w-fit min-w-[70px] flex-shrink-0 ${isActive("/") ? "bg-[#eceef2] hover:bg-gray-200" : "bg-transparent hover:bg-[#eceef2]"}`}>
            Crypto
          </div>
          <div onClick={() => { navigate("/chats") }} className={`cursor-pointer flex items-center justify-center p-2 rounded-full text-xs w-fit min-w-[70px] flex-shrink-0 ${isActive("/chats") ? "bg-[#eceef2] hover:bg-gray-200" : "bg-transparent hover:bg-[#eceef2]"}`}>
            <Sparkles className="w-4 h-4 flex-shrink-0 mr-2 text-purple-500" />
            Ask AI
          </div>
        </div>
      </div>

      {/* 
      <div className="flex gap-5 flex items-center justify-center">
        <div className="text-black hidden md:flex hover:text-purple-500 hover:cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"></path>
          </svg>
        </div>
        <div className="flex flex-row w-fit flex-shrink-0 flex items-center justify-center">
          <DynamicWidget variant='modal' />
        </div>
      </div>
*/}
    </div>
  );
}
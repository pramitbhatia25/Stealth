import { Divider } from "@nextui-org/react";
import { Clock, Home, Layers, PanelRightOpen, Search, SquarePen } from "lucide-react";
import { useLocation } from "react-router-dom";

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav
            className={`absolute left-0 top-0 h-full w-full md:w-[15dvw] bg-[#f9f9f9] transition-transform duration-300 overflow-hidden ${isSidebarOpen ? "transform-none" : "transform -translate-x-full"}`}
        >
            <div className="h-[50px] w-full bg-[#f9f9f9] flex flex-row justify-between items-center p-4">

                <div onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={`cursor-pointer flex items-center rounded-lg bg-transparent hover:bg-gray-200 p-1 px-2`}>
                    <PanelRightOpen color="gray" className="w-[1.5dvw] flex-shrink-0 min-w-[20px]" />
                </div>

                <div className="flex flex-row">
                    <div onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={`cursor-pointer flex items-center rounded-lg bg-transparent hover:bg-gray-200 p-1 px-2`}>
                        <Search color="gray" className="w-[1.5dvw] flex-shrink-0 min-w-[20px]" />
                    </div>
                    <div onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={`cursor-pointer flex items-center rounded-lg bg-transparent hover:bg-gray-200 p-1 px-2`}>
                        <SquarePen color="gray" className="w-[1.5dvw] flex-shrink-0 min-w-[20px]" />
                    </div>
                </div>
            </div>
            <ul className="space-y-2 p-4 h-[calc(100dvh-50px)] overflow-auto">
                <li>
                    <a
                        href="/"
                        className={`flex items-center gap-4 rounded-lg transition-colors bg-transparent text-black hover:bg-gray-200
                            } flex flex-row justify-start px-2 py-1`}
                    >
                        <div className="h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center">
                            <span className="text-white text-sm">S</span>
                        </div>
                        <span className="text-xs">Home</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Sidebar;

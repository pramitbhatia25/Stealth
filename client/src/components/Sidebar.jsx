import { Divider } from "@nextui-org/react";
import { BarChart, BarChart2, BarChart2Icon, BarChart3Icon, BarChart4Icon, BarChartBigIcon, BarChartIcon, Bitcoin, Calendar, ChartNoAxesCombined, Clock, Folder, Home, HomeIcon, Layers, Newspaper, PanelRightOpen, Plus, Search, Sparkles, SquarePen, TrendingUp } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
    const location = useLocation();
    const navigate = useNavigate("");
    const isActive = (path) => location.pathname === path;

    function onBtnClick(link) {
        navigate(link);
        if (window.innerWidth < 768) {
            setIsSidebarOpen(!isSidebarOpen);
        }
    }
    

    return (
        <nav
            className={`absolute left-0 top-0 h-full w-full md:w-[15dvw] bg-[#f9f9f9] transition-transform duration-300 overflow-hidden ${isSidebarOpen ? "transform-none" : "transform -translate-x-full"}`}
        >
            <div className="h-[50px] w-full dark:bg-black light:bg-[#f9f9f9] flex flex-row items-center p-4">

                <div onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={`cursor-pointer flex items-center rounded-lg bg-transparent dark:hover:bg-purple-500 light:hover:bg-gray-200 p-1 px-2`}>
                    <PanelRightOpen className="w-[1.5dvw] flex-shrink-0 min-w-[20px] dark:text-white light:text-[#353839]" />
                </div>
                {isSidebarOpen && (
                    <div className="p-1 px-2 text-purple-500 font-bold text-xl cursor-pointer" onClick={() => { navigate("/") }}>BullRunAI</div>
                )}

            </div>
            <ul className="space-y-2 p-4 h-[calc(100dvh-50px)] overflow-auto">
                <li className="space-y-2">
                <div
                        onClick={() => {onBtnClick("/")}}
                        className={`flex cursor-pointer items-center gap-4 rounded-lg transition-colors dark:text-white light:text-black light:hover:text-black dark:hover:text-black ${isActive("/") ? "bg-[#eceef2] hover:bg-gray-200 dark:text-black" : "bg-transparent hover:bg-gray-200"}
                            } flex flex-row justify-start px-2 py-2`}
                    >
                        <Home color="gray" className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm">Overview</span>
                    </div>
                    <div
                        onClick={() => {onBtnClick("/stocks")}}
                        className={`flex cursor-pointer items-center gap-4 rounded-lg transition-colors dark:text-white light:text-black light:hover:text-black dark:hover:text-black ${isActive("/stocks") ? "bg-[#eceef2] hover:bg-gray-200 dark:text-black" : "bg-transparent hover:bg-gray-200"}
                            } flex flex-row justify-start px-2 py-2`}
                    >
                        <ChartNoAxesCombined color="gray" className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm">Stocks</span>
                    </div>
                    <div
                        onClick={() => { onBtnClick("/crypto") }}
                        className={`flex cursor-pointer items-center gap-4 rounded-lg transition-colors dark:text-white light:text-black light:hover:text-black dark:hover:text-black ${isActive("/crypto") ? "bg-[#eceef2] hover:bg-gray-200 dark:text-black" : "bg-transparent hover:bg-gray-200"}
                            } flex flex-row justify-start px-2 py-2`}
                    >
                        <Bitcoin color="gray" className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm">Crypto</span>
                    </div>
                    {/*
                    <div
                        onClick={() => { onBtnClick("/news") }}
                        className={`flex cursor-pointer items-center gap-4 rounded-lg transition-colors text-black ${isActive("/news") ? "bg-[#eceef2] hover:bg-gray-200" : "bg-transparent hover:bg-gray-200"}
                        } flex flex-row justify-start px-2 py-2`}
                    >
                        <Newspaper color="gray" className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm">News</span>
                    </div>
                    */}
                    <div
                        onClick={() => { onBtnClick("/chat") }}
                        className={`flex cursor-pointer items-center gap-4 rounded-lg transition-colors text-black ${isActive("/chat") ? "bg-[#eceef2] hover:bg-gray-200" : "bg-transparent hover:bg-gray-200"}
                } flex flex-row justify-start px-2 py-2`}
                    >
                        <Sparkles className="w-5 h-5 flex-shrink-0 text-purple-500" />
                        <span className="text-sm text-purple-500 font-bold">Chat</span>
                    </div>
                </li>
            </ul>
        </nav>
    );
}

export default Sidebar;

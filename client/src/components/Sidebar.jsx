import { Divider } from "@nextui-org/react";
import { BarChart, BarChart2, BarChart2Icon, BarChart3Icon, BarChart4Icon, BarChartBigIcon, BarChartIcon, Bitcoin, Calendar, ChartNoAxesCombined, Clock, Folder, Home, HomeIcon, Layers, Newspaper, PanelRightOpen, Plus, Search, Sparkles, SquarePen, TrendingUp } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/bullrun-light.jpeg";
import LogoDark from "../assets/bullrun-dark.png";
import { useIsLoggedIn } from "@dynamic-labs/sdk-react-core";

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
    const location = useLocation();
    const navigate = useNavigate("");
    const isActive = (path) => location.pathname === path;
    const isLoggedIn = useIsLoggedIn()

    function onBtnClick(link) {
        navigate(link);
        if (window.innerWidth < 768) {
            setIsSidebarOpen(!isSidebarOpen);
        }
    }

    return (
        <nav
            className={`absolute left-0 top-0 h-full w-full md:w-[15dvw] bg-[#0d0e10] transition-transform duration-300 overflow-hidden ${isSidebarOpen ? "transform-none" : "transform -translate-x-full"}`}
        >
            <div className="h-[55px] w-full bg-transparent flex flex-row justify-between items-center px-4">
                <div className="flex flex-row">
                    {isSidebarOpen && isLoggedIn && (
                        <div
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className={`w-fit h-fit my-auto flex cursor-pointer flex items-center rounded-lg bg-transparent ml-2`}
                        >
                            <PanelRightOpen
                                size={20}
                                className="w-[1.5dvw] flex-shrink-0 min-w-[20px] text-white"
                            />
                        </div>
                    )}
                    {isSidebarOpen && (
                        <div onClick={() => {navigate("/home")}} className="py-[2px] px-2 text-purple-500 font-bold text-xl cursor-pointer h-[46px] w-[130px] md:w-[170px]">
                            <img src={LogoDark} alt="Brand Logo" className="h-full w-full" />
                        </div>
                    )}
                </div>

            </div>
            <ul className="space-y-2 p-4 h-[calc(100dvh-50px)] overflow-auto">
                <li className="space-y-2">
                    <div
                        onClick={() => { onBtnClick("/home") }}
                        className={`flex cursor-pointer items-center gap-4 rounded-lg transition-colors  ${isActive("/home") ? "bg-white hover:bg-gray-200 text-black" : "bg-transparent hover:bg-gray-200 text-gray-200 hover:text-black"}
                            } flex flex-row justify-start px-2 py-2`}
                    >
                        <Home color="gray" className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm">Home</span>
                    </div>
                    <div
                        onClick={() => { onBtnClick("/market") }}
                        className={`flex cursor-pointer items-center gap-4 rounded-lg transition-colors  ${isActive("/market") ? "bg-white hover:bg-gray-200 text-black" : "bg-transparent hover:bg-gray-200 text-gray-200 hover:text-black"}
                            } flex flex-row justify-start px-2 py-2`}
                    >
                        <BarChart3Icon color="gray" className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm">Market</span>
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
                        className={`flex cursor-pointer items-center gap-4 rounded-lg transition-colors  ${isActive("/chat") ? "bg-white hover:bg-gray-200 text-black" : "bg-transparent hover:bg-gray-200 text-gray-200 hover:text-black"}
                } flex flex-row justify-start px-2 py-2`}
                    >
                        <Sparkles color="gray" className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm">Chat</span>
                    </div>
                </li>
            </ul>
        </nav>
    );
}

export default Sidebar;

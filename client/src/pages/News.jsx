import { ArrowBigDown, ArrowDown, ChevronDown, Cross, Sparkles, X } from "lucide-react";
import { useState } from "react";

function News({ isSidebarOpen, setIsSidebarOpen }) {

    const [isWelcomeOpen, setIsWelcomeOpen] = useState(true)

    const getFormattedDate = () => {
        const date = new Date();
        const day = date.getDate();
        const suffix = ['th', 'st', 'nd', 'rd'][(day % 10 > 3 || [11, 12, 13].includes(day % 100)) ? 0 : day % 10];
        const options = { month: 'long', year: 'numeric' };
        return `${day}${suffix} ${date.toLocaleDateString('en-US', options)}`;
    };

    return <div className="h-full w-full">
        <div className="h-[calc(100dvh-50px)] w-full flex flex-col overflow-y-auto">
            <div className="p-5 w-full h-full flex flex-col md:flex-row">
                <div className="w-full h-full md:w-[40%] flex-shrink-0">
                    <div className="border-l-5 h-full border-purple-500 px-5 w-full">

                    <div className="h-[15%]">
                        <div className="text-lg md:text-xl font-bold">
                            Overall Market
                        </div>

                        <form className=" relative w-full mt-5 flex-shrink-0">
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
                                className="w-full bg-white text-black rounded-lg py-2 pl-10 pr-4 text-xs border focus:outline-none focus:ring-0 "
                            />
                        </form>
                        </div>
                        <div className="h-[85%]  overflow-auto scrollbar-hide">
                            <div className="pt-4 pb-2 flex items-start flex-col gap-y-5 tracking-tighter">
                                <div className="p-5 border w-full h-fit rounded-lg flex flex-col">
                                    <div className="text-gray-500 flex flex-row gap-3 items-center text-xs">
                                        <div className="">
                                            Business Insider
                                        </div>
                                        <div className="border w-1 h-1 mt-1 bg-[gray] rounded-full">

                                        </div>
                                        <div className="">
                                            1 hour ago
                                        </div>
                                    </div>
                                    <div className="mt-2 font-semibold text-md">
                                        India to update latest average import tariff figures for clarity in US negotiations
                                    </div>
                                    <div className="mt-2 text-gray-500 text-sm">
                                        Commerce Department to hold sectoral consultations with other Ministries to sensitise them on India-US trade, tariff issues India-US trade, tariff issuesIndia-US trade, tariff issues...
                                    </div>
                                </div>
                                <div className="p-5 border w-full h-fit rounded-lg flex flex-col">
                                    <div className="text-gray-500 flex flex-row gap-3 items-center text-xs">
                                        <div className="">
                                            Business Insider
                                        </div>
                                        <div className="border w-1 h-1 mt-1 bg-[gray] rounded-full">

                                        </div>
                                        <div className="">
                                            1 hour ago
                                        </div>
                                    </div>
                                    <div className="mt-2 font-semibold text-md">
                                        India to update latest average import tariff figures for clarity in US negotiations
                                    </div>
                                    <div className="mt-2 text-gray-500 text-sm">
                                        Commerce Department to hold sectoral consultations with other Ministries to sensitise them on India-US trade, tariff issues India-US trade, tariff issuesIndia-US trade, tariff issues...
                                    </div>
                                </div>
                                <div className="p-5 border w-full h-fit rounded-lg flex flex-col">
                                    <div className="text-gray-500 flex flex-row gap-3 items-center text-xs">
                                        <div className="">
                                            Business Insider
                                        </div>
                                        <div className="border w-1 h-1 mt-1 bg-[gray] rounded-full">

                                        </div>
                                        <div className="">
                                            1 hour ago
                                        </div>
                                    </div>
                                    <div className="mt-2 font-semibold text-md">
                                        India to update latest average import tariff figures for clarity in US negotiations
                                    </div>
                                    <div className="mt-2 text-gray-500 text-sm">
                                        Commerce Department to hold sectoral consultations with other Ministries to sensitise them on India-US trade, tariff issues India-US trade, tariff issuesIndia-US trade, tariff issues...
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-10 md:mt-0 md:w-[50%]">
                    <div className="border-l-5 border-purple-500 px-5">
                        <div className="text-lg md:text-xl font-bold">
                            Summary & Impact
                        </div>
                        <div className="pt-5 pb-2 text-xs md:text-sm flex items-start">
                            <Sparkles className="mr-2 h-5 w-5 flex-shrink-0 text-purple-500" />
                            <p className="leading-tight">
                                The total cryptocurrency market cap stands at
                                <span className="mx-1 text-[red]">$3.18 trillion</span>, reflecting a
                                <span className="mx-1 text-[green]"> <ChevronDown className="w-5 h-3 inline" />1.43%</span> drop in the past 24 hours.
                                The total cryptocurrency market cap stands at
                                The total cryptocurrency market cap stands at
                                The total cryptocurrency market cap stands at
                                The total cryptocurrency market cap stands at
                            </p>
                        </div>
                        <div className="pt-5 pb-2 text-xs md:text-sm flex items-start">
                            <Sparkles className="mr-2 h-5 w-5 flex-shrink-0 text-purple-500" />
                            <p className="leading-tight">
                                The total cryptocurrency market cap stands at
                                <span className="mx-1 text-[red]">$3.18 trillion</span>, reflecting a
                                <span className="mx-1 text-[green]"> <ChevronDown className="w-5 h-3 inline" />1.43%</span> drop in the past 24 hours.
                                The total cryptocurrency market cap stands at
                                The total cryptocurrency market cap stands at
                                The total cryptocurrency market cap stands at
                                The total cryptocurrency market cap stands at
                            </p>
                        </div>
                        <div className="pt-5 pb-2 text-xs md:text-sm flex items-start">
                            <Sparkles className="mr-2 h-5 w-5 flex-shrink-0 text-purple-500" />
                            <p className="leading-tight">
                                The total cryptocurrency market cap stands at
                                <span className="mx-1 text-[red]">$3.18 trillion</span>, reflecting a
                                <span className="mx-1 text-[green]"> <ChevronDown className="w-5 h-3 inline" />1.43%</span> drop in the past 24 hours.
                                The total cryptocurrency market cap stands at
                                The total cryptocurrency market cap stands at
                                The total cryptocurrency market cap stands at
                                The total cryptocurrency market cap stands at
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default News;
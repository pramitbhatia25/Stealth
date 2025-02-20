import { ChevronDown,Sparkles, X } from "lucide-react";
import {useState } from "react";

function Home({ isSidebarOpen, setIsSidebarOpen }) {

    const [isWelcomeOpen, setIsWelcomeOpen] = useState(true)

    return <div className="h-full w-full">
        <div className="h-[calc(100dvh-50px)] w-full flex flex-col overflow-y-auto">
            <div className={`p-5 ${isWelcomeOpen ? "" : "hidden"}`}>
                <div className="bg-purple-100 rounded-2xl px-5 py-3 shadow-xl backdrop-blur-sm hover:border-zinc-600/50 transition-all duration-300">
                    <div className="flex items-start justify-between">
                        <div className="text-xl md:text-xl h-6 flex items-center font-bold text-purple-800">
                            Welcome back, Pramit!
                        </div>
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-200 cursor-pointer" onClick={() => { setIsWelcomeOpen(false) }}>
                            <X className="flex-shrink-0 w-4 h-4 text-[purple]" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-5">
                <div className="border-l-5 border-purple-500 px-5">
                    <div className="text-lg md:text-xl font-bold">
                        Today's Cryptocurrency Prices by Market Cap
                    </div>
                    <div className="py-5 text-xs md:text-sm flex items-center">
                        <Sparkles className="mr-2 h-5 w-5 flex-shrink-0 text-purple-500" />
                        <p className="leading-tight">
                            The total cryptocurrency market cap stands at
                            <span className="mx-1 text-[red]">$3.18 trillion</span>, reflecting a
                            <span className="mx-1 text-[green]"> <ChevronDown className="w-5 h-5 inline" />1.43%</span> drop in the past 24 hours.
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-5 flex overflow-x-auto justify-start scrollbar-hide flex-nowrap min-h-fit">
                {Array(3)
                    .fill(0)
                    .map((_, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-[220px] mx-[10px] md:w-[23%] md:mx-[1%] min-w-[220px] h-[250px] flex items-center justify-center rounded-2xl shadow-lg border border-gray-200 bg-white"
                        >
                            Hi
                        </div>
                    ))}

                {/* Nested Grid for Small Cards */}
                <div className="flex-shrink-0 w-[220px] mx-[10px] md:w-[23%] md:mx-[1%] min-w-[220px] h-[250px] grid grid-cols-2 grid-rows-2 gap-4">
                    {Array(4)
                        .fill(0)
                        .map((_, index) => (
                            <div
                                key={index}
                                className="p-4 flex items-center justify-center rounded-2xl shadow-lg border border-gray-200 bg-white"
                            >
                                Hi
                            </div>
                        ))}
                </div>
            </div>

            {/*
                <div className="p-5">
                    <div className="border-l-5 border-purple-500 px-5">
                        <div className="text-lg md:text-2xl font-bold">
                            Top Gainers
                        </div>
                        <div className="py-5 text-xs md:text-sm flex items-center">
                            <Sparkles className="mr-2 h-5 w-5 flex-shrink-0 text-purple-500" />
                            <p className="leading-tight">
                                NVDA stock went up
                                <span className="mx-1 text-[green]">$3.18 USD</span>, reflecting a
                                <span className="mx-1 text-[green]"> <ChevronDown className="w-5 h-5 inline" />1.43%</span> gain in the past 24 hours.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-5 flex overflow-x-auto justify-start scrollbar-hide min-h-fit">
                    {Array(4)
                        .fill(0)
                        .map((_, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 flex-grow-0 w-[220px] mx-[10px] md:w-[23%] md:mx-[1%] min-w-[220px] h-[150px] flex items-center justify-center rounded-2xl shadow-lg border border-gray-200 bg-white"
                            >
                                Hi
                            </div>
                        ))}
                </div>

                <div className="p-5">
                    <div className="border-l-5 border-purple-500 px-5">
                        <div className="text-lg md:text-2xl font-bold">
                            Top Losers
                        </div>
                        <div className="py-5 text-xs md:text-sm flex items-center">
                            <Sparkles className="mr-2 h-5 w-5 flex-shrink-0 text-purple-500" />
                            <p className="leading-tight">
                                NVDA stock went down
                                <span className="mx-1 text-[red]">$140 USD</span>, reflecting a
                                <span className="mx-1 text-[red]"> <ChevronDown className="w-5 h-5 inline" />100%</span> loss in the past 24 hours.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-5 flex overflow-x-auto justify-start scrollbar-hide min-h-fit">
                    {Array(4)
                        .fill(0)
                        .map((_, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 flex-grow-0 w-[220px] mx-[10px] md:w-[23%] md:mx-[1%] min-w-[220px] h-[150px] flex items-center justify-center rounded-2xl shadow-lg border border-gray-200 bg-white"
                            >
                                Hi
                            </div>
                        ))}
                </div>
            */}

        </div>
    </div>
}

export default Home;
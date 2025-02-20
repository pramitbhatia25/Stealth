import { ArrowBigDown, ArrowDown, ChevronDown, Cross, Sparkles, X } from "lucide-react";
import { useState } from "react";

function AllCrypto({ isSidebarOpen, setIsSidebarOpen }) {

    const [isWelcomeOpen, setIsWelcomeOpen] = useState(true)

    const getFormattedDate = () => {
        const date = new Date();
        const day = date.getDate();
        const suffix = ['th', 'st', 'nd', 'rd'][(day % 10 > 3 || [11, 12, 13].includes(day % 100)) ? 0 : day % 10];
        const options = { month: 'long', year: 'numeric' };
        return `${day}${suffix} ${date.toLocaleDateString('en-US', options)}`;
    };

    return <div className="h-full w-full">
        <div className="h-[calc(100dvh-50px)] w-full flex flex-col overflow-y-auto scrollbar-hide">
            <div className="p-5 w-full flex flex-col md:flex-row h-[50%]">
                <div className="w-full md:w-[50%] h-full overflow-auto scrollbar-hide">
                    <div className="border-l-5 border-purple-500 px-5 h-full">
                        <div className="text-lg md:text-xl font-bold">
                            Overall Market
                        </div>
                        <div className="pt-5 pb-2 text-xs md:text-sm flex items-start">
                            <div className="flex w-full flex-col md:flex-row">
                                <div className="flex flex-col w-full md:w-[50%] p-2">
                                    <div className="border w-full h-full my-2 p-2 rounded-md bg-[#f3f4f6]">
                                        hi
                                    </div>
                                    <div className="border w-full h-full my-2 p-2 rounded-md bg-[#f3f4f6]">
                                        hi
                                    </div>
                                    <div className="border w-full h-full my-2 p-2 rounded-md bg-[#f3f4f6]">
                                        hi
                                    </div>
                                </div>
                                <div className="flex flex-col w-full md:w-[50%] p-2">
                                    <div className="border w-full h-full my-2 p-2 rounded-md bg-[#f3f4f6]">
                                        hi
                                    </div>
                                    <div className="border w-full h-full my-2 p-2 rounded-md bg-[#f3f4f6]">
                                        hi
                                    </div>
                                    <div className="border w-full h-full my-2 p-2 rounded-md bg-[#f3f4f6]">
                                        hi
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-10 md:mt-0 md:w-[50%] h-full overflow-auto scrollbar-hide">
                    <div className="border-l-5 border-purple-500 px-5 h-full">
                        <div className="text-lg md:text-xl font-bold">
                            Summary
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

            <div className="p-5 w-full flex flex-col md:flex-row h-[50%]">
                <div className="w-full md:w-[50%] h-full overflow-auto scrollbar-hide">
                    <div className="border-l-5 border-purple-500 px-5 h-full">
                        <div className="text-lg md:text-xl font-bold">
                            Top Gainers
                        </div>
                        <div className="pt-5 pb-2 text-xs md:text-sm flex items-start">
                            <div className="flex w-full flex-col md:flex-row">
                                <div className="flex flex-col w-full md:w-[50%] p-2">
                                    <div className="border w-full h-full my-2 p-2 rounded-md bg-[#f3f4f6]">
                                        hi
                                    </div>
                                    <div className="border w-full h-full my-2 p-2 rounded-md bg-[#f3f4f6]">
                                        hi
                                    </div>
                                    <div className="border w-full h-full my-2 p-2 rounded-md bg-[#f3f4f6]">
                                        hi
                                    </div>
                                </div>
                                <div className="flex flex-col w-full md:w-[50%] p-2">
                                    <div className="border w-full h-full my-2 p-2 rounded-md bg-[#f3f4f6]">
                                        hi
                                    </div>
                                    <div className="border w-full h-full my-2 p-2 rounded-md bg-[#f3f4f6]">
                                        hi
                                    </div>
                                    <div className="border w-full h-full my-2 p-2 rounded-md bg-[#f3f4f6]">
                                        hi
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-[50%] h-full overflow-auto scrollbar-hide">
                    <div className="border-l-5 border-purple-500 px-5 h-full">
                        <div className="text-lg md:text-xl font-bold">
                            Top Losers
                        </div>
                        <div className="pt-5 pb-2 text-xs md:text-sm flex items-start">
                            <div className="flex w-full flex-col md:flex-row">
                                <div className="flex flex-col w-full md:w-[50%] p-2">
                                    <div className="border w-full h-full my-2 p-2 rounded-md bg-[#f3f4f6]">
                                        hi
                                    </div>
                                    <div className="border w-full h-full my-2 p-2 rounded-md bg-[#f3f4f6]">
                                        hi
                                    </div>
                                    <div className="border w-full h-full my-2 p-2 rounded-md bg-[#f3f4f6]">
                                        hi
                                    </div>
                                </div>
                                <div className="flex flex-col w-full md:w-[50%] p-2">
                                    <div className="border w-full h-full my-2 p-2 rounded-md bg-[#f3f4f6]">
                                        hi
                                    </div>
                                    <div className="border w-full h-full my-2 p-2 rounded-md bg-[#f3f4f6]">
                                        hi
                                    </div>
                                    <div className="border w-full h-full my-2 p-2 rounded-md bg-[#f3f4f6]">
                                        hi
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
}

export default AllCrypto;
import { useEffect, useState } from "react";
import { SymbolOverview } from "react-ts-tradingview-widgets";

function AllCrypto({ isSidebarOpen, setIsSidebarOpen }) {
    const [prices, setPrices] = useState({});
    const [selectedCrypto, setSelectedCrypto] = useState(null);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await fetch("https://stock-data-1032123744845.us-central1.run.app/get-all-prices");
                const data = await response.json();
                setPrices(data);
            } catch (error) {
                console.error("Error fetching prices:", error);
            }
        };

        fetchPrices();
    }, []);

    return (
        <div className="h-full w-full">
            <div className="h-[calc(100dvh-50px)] w-full flex flex-col overflow-y-auto scrollbar-hide">
                <div className="p-5 flex flex-row h-full">
                    {/* Left Side: Prices */}
                    <div className="w-full md:w-[50%] h-full">
                        <div className="border-l-5 border-purple-500 px-5 h-full overflow-auto">
                            <div className="text-lg md:text-xl font-bold">Overall Market</div>
                            <div className="pt-5 pb-2 text-xs md:text-sm flex items-start">
                                <div className="flex w-full flex-wrap">
                                    {prices ? (
                                        Object.entries(prices).map(([ticker, price]) => (
                                            <div key={ticker} className="flex flex-col w-full md:w-[50%] p-1">
                                                <div
                                                    className="border w-full h-full p-4 rounded-md bg-[#f3f4f6] cursor-pointer hover:bg-gray-300"
                                                    onClick={() => setSelectedCrypto(ticker)}
                                                >
                                                    <span className="font-semibold">{ticker}</span>: ${price.toFixed(2)}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="w-full text-center">Loading...</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Crypto Summary */}
                    <div className="w-full md:w-[50%] h-full overflow-auto">
                        <div className="border-l-5 border-purple-500 px-5 h-full">
                            <div className="text-lg md:text-xl font-bold">Crypto Summary For {selectedCrypto?.split("-").join("")}</div>
                            <div className="h-[500px] w-full border rounded-xl my-[20px] overflow-hidden">
                                {selectedCrypto ? (
                                    <SymbolOverview
                                        colorTheme="light"
                                        hideDateRanges={true}
                                        symbols={[selectedCrypto.split("-").join("")]}
                                        autosize
                                    />
                                ) : (
                                    <div className="m-5 text-gray-500">Select a cryptocurrency to view details</div>
                                )}                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllCrypto;

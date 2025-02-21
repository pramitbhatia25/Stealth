import { useEffect, useState } from "react";
import { SymbolOverview } from "react-ts-tradingview-widgets";

function AllCrypto({ isSidebarOpen, setIsSidebarOpen }) {
    const [prices, setPrices] = useState([]);
    const [selectedCrypto, setSelectedCrypto] = useState(null);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await fetch("https://stock-data-1032123744845.us-central1.run.app/get-latest-prices");
                const data = await response.json();
                setPrices(data);  // Store the full data (not just the prices)
            } catch (error) {
                console.error("Error fetching prices:", error);
            }
        };

        fetchPrices();
    }, []);

    return (
        <div className="h-full w-full">
            <div className="h-[calc(100dvh-50px)] w-full flex flex-col overflow-y-auto scrollbar-hide">
                <div className="p-5 flex flex-col md:flex-row h-full">
                    {/* Left Side: Prices in Table */}
                    <div className="w-full md:w-[50%] h-full">
                        <div className="border-l-5 border-purple-500 px-5 h-full overflow-auto">
                            <div className="text-lg md:text-xl font-bold">Overall Market</div>
                            <div className="pt-5 pb-2 text-xs md:text-sm">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="px-4 py-2 text-left">Ticker</th>
                                            <th className="px-4 py-2 text-left">Current Price</th>
                                            <th className="px-4 py-2 text-left">Open</th>
                                            <th className="px-4 py-2 text-left">High</th>
                                            <th className="px-4 py-2 text-left">Low</th>
                                            <th className="px-4 py-2 text-left">Volume</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {prices && prices.length > 0 ? (
                                            prices.map((crypto, index) => (
                                                <tr
                                                    key={index}
                                                    className="cursor-pointer hover:bg-gray-100"
                                                    onClick={() => setSelectedCrypto(crypto.Ticker)}
                                                >
                                                    <td className="px-4 py-2">{crypto.Ticker}</td>
                                                    <td className="px-4 py-2">${crypto.CurrentPrice.toFixed(2)}</td>
                                                    <td className="px-4 py-2">${crypto.Open.toFixed(2)}</td>
                                                    <td className="px-4 py-2">${crypto.High.toFixed(2)}</td>
                                                    <td className="px-4 py-2">${crypto.Low.toFixed(2)}</td>
                                                    <td className="px-4 py-2">{crypto.Volume}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center px-4 py-2">Loading...</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Crypto Summary (Widget) */}
                    <div className="w-full md:w-[50%] h-full overflow-auto">
                        <div className="border-l-5 border-purple-500 px-5 h-full">
                            <div className="text-lg md:text-xl font-bold">Crypto Summary For {selectedCrypto}</div>
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

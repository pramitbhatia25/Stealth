import { useEffect, useState } from "react";
import { SymbolOverview } from "react-ts-tradingview-widgets";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";

function AllCrypto({ isSidebarOpen, setIsSidebarOpen }) {
    const [prices, setPrices] = useState([]);
    const priorityCoins = ['LTC-USD', 'ETH-USD', 'DOGE-USD', 'BTC-USD'];

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

    const navigate = useNavigate();

    return (
        <div className="h-full w-full">
            <div className="h-[calc(100dvh-50px)] w-full flex flex-col overflow-y-auto scrollbar-hide">
                <div className="w-full h-full p-5">
                    <div className="border-l-5 border-purple-500 px-5 h-full">
                        <div className="text-lg md:text-xl font-bold h-[8%]">All Crypto Data</div>
                        <div className="text-sm h-[7%] items-center flex gap-2"><Sparkles className="text-purple-500 w-6 h-6"/> Click on a coin to learn more and perform a deep analysis.</div>
                        <div className="pb-2 text-xs md:text-sm border h-[85%] overflow-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="px-4 py-2 text-left">Ticker</th>
                                        <th className="px-4 py-2 text-left">Current Price</th>
                                        <th className="px-4 py-2 text-left">Open</th>
                                        <th className="px-4 py-2 text-left">High</th>
                                        <th className="px-4 py-2 text-left">Low</th>
                                        <th className="px-4 py-2 text-left">Volume</th>
                                        <th className="px-4 py-2 text-left">Datetime</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {prices && prices.length > 0 ? (
                                        [...prices]
                                            .sort((a, b) => {
                                                // Define priority cryptocurrencies
                                                const priority = ['LTC-USD', 'ETH-USD', 'DOGE-USD', 'BTC-USD'];
                                                
                                                // Get indices in priority array (-1 if not in priority)
                                                const indexA = priority.indexOf(a.Ticker);
                                                const indexB = priority.indexOf(b.Ticker);
                                                
                                                // If both are priority cryptos, sort by priority order
                                                if (indexA !== -1 && indexB !== -1) {
                                                    return indexA - indexB;
                                                }
                                                // If only A is priority, it goes first
                                                if (indexA !== -1) return -1;
                                                // If only B is priority, it goes first
                                                if (indexB !== -1) return 1;
                                                // For non-priority cryptos, sort alphabetically
                                                return a.Ticker.localeCompare(b.Ticker);
                                            })
                                            .map((crypto, index) => {
                                                const isPriority = priorityCoins.includes(crypto.Ticker);
                                                return (
                                                    <tr
                                                        key={index}
                                                        className={`cursor-pointer ${
                                                            isPriority 
                                                                ? "bg-purple-50 hover:bg-purple-100" 
                                                                : "hover:bg-gray-100"
                                                        }`}
                                                        onClick={() => navigate(`/${crypto.Ticker}`)}
                                                    >
                                                        <td className="px-4 py-2 flex items-center gap-2">
                                                            {isPriority && <Sparkles className="text-purple-500 w-4 h-4"/>}
                                                            {crypto.Ticker}
                                                        </td>
                                                        <td className="px-4 py-2">${crypto.CurrentPrice.toFixed(2)}</td>
                                                        <td className="px-4 py-2">${crypto.Open.toFixed(2)}</td>
                                                        <td className="px-4 py-2">${crypto.High.toFixed(2)}</td>
                                                        <td className="px-4 py-2">${crypto.Low.toFixed(2)}</td>
                                                        <td className="px-4 py-2">{crypto.Volume}</td>
                                                        <td className="px-4 py-2">
                                                            {new Date(new Date(crypto.Datetime).getTime() - (5 * 60 * 60 * 1000)).toLocaleString('en-US', {
                                                                timeZone: 'America/New_York',
                                                                dateStyle: 'medium',
                                                                timeStyle: 'medium'
                                                            })}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center text-gray-500 px-4">Loading...</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllCrypto;

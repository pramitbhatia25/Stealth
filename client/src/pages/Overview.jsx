import { useEffect, useState } from "react";
import { SymbolOverview, TickerTape } from "react-ts-tradingview-widgets";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";

function Overview({ isSidebarOpen, setIsSidebarOpen }) {
    const [cryptoPrices, setCryptoPrices] = useState([]);
    const [stockPrices, setStockPrices] = useState([]);

    const allCrypto = ['LTC-USD', 'ETH-USD', 'DOGE-USD', 'BTC-USD', 'BNB-USD', 'XRP-USD', 'ADA-USD', 'SOL-USD', 'DOT-USD', 'MATIC-USD', 'LTC-USD', 'BCH-USD', 'LINK-USD', 'XLM-USD', 'UNI1-USD', 'ATOM-USD', 'ALGO-USD', 'VET-USD', 'ICP-USD', 'FIL-USD', 'MANA-USD'];
    const allStock = ["AAPL", "NVDA", "MSFT", "AMZN", "GOOG", "META", "TSLA", "AVGO", "LLY",
        "WMT", "JPM", "V", "XOM", "MA", "UNH", "HD", "PG", "CVX", "KO",
        "PEP", "MRK", "ABBV", "PFE", "BAC", "CSCO", "ACN", "NFLX", "INTC", "CMCSA",
        "T", "VZ", "ADBE", "CRM", "NKE", "ORCL", "ABT", "MCD", "DHR", "WFC",
        "MDT", "BMY", "TXN", "NEE", "PM", "LIN", "HON", "QCOM", "COST", "AMGN",
    ];
    const priorityCoins = allCrypto;
    const priorityStock = allStock;


    function checkSignUp(path) {
        navigate(path)
    }

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await fetch("https://stock-data-1032123744845.us-central1.run.app/get-latest-prices");
                const data = await response.json();
    
                // Sort by volume in descending order and pick the top 5 cryptocurrencies
                const cryptoFilteredData = data
                    .filter(crypto => allCrypto.includes(crypto.Ticker))
                    .sort((a, b) => b.Volume - a.Volume)
                    .slice(0, 5);
    
                // Sort by volume in descending order and pick the top 5 stocks
                const stockFilteredData = data
                    .filter(stock => allStock.includes(stock.Ticker))
                    .sort((a, b) => b.Volume - a.Volume)
                    .slice(0, 5);
    
                setCryptoPrices(cryptoFilteredData);
                setStockPrices(stockFilteredData);
            } catch (error) {
                console.error("Error fetching prices:", error);
            }
        };
    
        fetchPrices();
    }, []);
        
    const navigate = useNavigate();

    return (
        <div className="h-full w-full">
            <div className="h-[calc(100dvh-50px)] w-full flex flex-col overflow-y-auto">
                <div className="h-[80px] md:h-[45px] w-full overflow-hidden border-b-1 dark:border-white light:border-gray-200">
                    <TickerTape />
                </div>
                <div className="w-full h-[calc(100dvh-140px)] md:h-[calc(100dvh-95px)] p-3 space-y-2 overflow-auto">
                    <div className="h-fit p-3 space-y-2">
                        <div className="text-lg md:text-2xl font-bold">Market Overview</div>
                        <div className="text-sm items-center flex gap-2"><Sparkles className="text-purple-500 w-6 h-6" /> Click on a symbol to learn more and perform a deep analysis.</div>
                    </div>
                    <div className="h-fit p-3 flex justify-between">
                        <div className="text-sm md:text-lg font-semibold " >Top Cryptocurrencies by Volume</div>
                        <div className="text-sm md:text-lg font-semibold underline text-purple-500 cursor-pointer" onClick={() => {navigate("/crypto")}}>View All Crypto</div>
                    </div>
                    <div className="pb-2 text-xs md:text-sm w-full h-fit border rounded-xl scrollbar-hide overflow-auto">
                        <table className="min-w-full" style={{ tableLayout: 'fixed' }}>
                            <thead>
                                <tr className="border-b">
                                    <th className="px-4 py-2 text-left" style={{ width: '14%' }}>Ticker</th>
                                    <th className="px-4 py-2 text-left" style={{ width: '14%' }}>Current Price</th>
                                    <th className="px-4 py-2 text-left" style={{ width: '14%' }}>Open</th>
                                    <th className="px-4 py-2 text-left" style={{ width: '14%' }}>High</th>
                                    <th className="px-4 py-2 text-left" style={{ width: '14%' }}>Low</th>
                                    <th className="px-4 py-2 text-left" style={{ width: '14%' }}>Volume</th>
                                    <th className="px-4 py-2 text-left" style={{ width: '14%' }}>Datetime</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cryptoPrices && cryptoPrices.length > 0 ? (
                                    [...cryptoPrices]
                                        .sort((a, b) => {
                                            // Define priority cryptocurrencies
                                            const priority = priorityCoins;

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
                                                    className={`cursor-pointer ${isPriority
                                                        ? "bg-purple-50 hover:bg-purple-100"
                                                        : "hover:bg-gray-100"
                                                        }`}
                                                    onClick={() => {checkSignUp(`/crypto/${crypto.Ticker}`)}}
                                                >
                                                    <td className="px-4 py-2 flex items-center gap-2">
                                                        {isPriority && <Sparkles className="text-purple-500 w-4 h-4" />}
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
                    <div className="h-fit p-3 flex justify-between">
                        <div className="text-sm md:text-lg font-semibold " >Top Stocks by Volume</div>
                        <div className="text-sm md:text-lg font-semibold underline text-purple-500 cursor-pointer" onClick={() => {navigate("/stock")}}>View All Stocks</div>
                    </div>
                    <div className="pb-2 text-xs md:text-sm w-full h-fit border rounded-xl scrollbar-hide overflow-auto">
                        <table className="min-w-full" style={{ tableLayout: 'fixed' }}>
                            <thead>
                                <tr className="border-b">
                                    <th className="px-4 py-2 text-left" style={{ width: '14%' }}>Ticker</th>
                                    <th className="px-4 py-2 text-left" style={{ width: '14%' }}>Current Price</th>
                                    <th className="px-4 py-2 text-left" style={{ width: '14%' }}>Open</th>
                                    <th className="px-4 py-2 text-left" style={{ width: '14%' }}>High</th>
                                    <th className="px-4 py-2 text-left" style={{ width: '14%' }}>Low</th>
                                    <th className="px-4 py-2 text-left" style={{ width: '14%' }}>Volume</th>
                                    <th className="px-4 py-2 text-left" style={{ width: '14%' }}>Datetime</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stockPrices && stockPrices.length > 0 ? (
                                    [...stockPrices]
                                        .sort((a, b) => {
                                            // Define priority cryptocurrencies
                                            const priority = priorityStock;

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
                                        .map((stock, index) => {
                                            const isPriority = priorityStock.includes(stock.Ticker);
                                            return (
                                                <tr
                                                    key={index}
                                                    className={`cursor-pointer ${isPriority
                                                        ? "bg-purple-50 hover:bg-purple-100"
                                                        : "hover:bg-gray-100"
                                                        }`}
                                                    onClick={() => {checkSignUp(`/stock/${stock.Ticker}`)}}
                                                >
                                                    <td className="px-4 py-2 flex items-center gap-2">
                                                        {isPriority && <Sparkles className="text-purple-500 w-4 h-4" />}
                                                        {stock.Ticker}
                                                    </td>
                                                    <td className="px-4 py-2">${stock.CurrentPrice.toFixed(2)}</td>
                                                    <td className="px-4 py-2">${stock.Open.toFixed(2)}</td>
                                                    <td className="px-4 py-2">${stock.High.toFixed(2)}</td>
                                                    <td className="px-4 py-2">${stock.Low.toFixed(2)}</td>
                                                    <td className="px-4 py-2">{stock.Volume}</td>
                                                    <td className="px-4 py-2">
                                                        {new Date(new Date(stock.Datetime).getTime() - (5 * 60 * 60 * 1000)).toLocaleString('en-US', {
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
    );
}

export default Overview;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import cryptoMetadata from "../data/cryptoMetadata.jsx"
import stockMetadata from "../data/stockMetadata.jsx"
import CustomTickerTape from "../components/CustomTickerTape";

function Overview({ isSidebarOpen, setIsSidebarOpen }) {
    const [cryptoPrices, setCryptoPrices] = useState([]);
    const [stockPrices, setStockPrices] = useState([]);

    const allCrypto = ['LTC-USD', 'ETH-USD', 'DOGE-USD', 'BTC-USD', 'BNB-USD', 'XRP-USD', 'ADA-USD', 'SOL-USD', 'DOT-USD', 'MATIC-USD', 'BCH-USD', 'LINK-USD', 'XLM-USD', 'UNI1-USD', 'ATOM-USD', 'ALGO-USD', 'VET-USD', 'ICP-USD', 'FIL-USD', 'MANA-USD'];
    const allStock = ["AAPL", "NVDA", "MSFT", "AMZN", "GOOG", "META", "TSLA", "AVGO", "LLY",
        "WMT", "JPM", "V", "XOM", "MA", "UNH", "HD", "PG", "CVX", "KO",
        "PEP", "MRK", "ABBV", "PFE", "BAC", "CSCO", "ACN", "NFLX", "INTC", "CMCSA",
        "T", "VZ", "ADBE", "CRM", "NKE", "ORCL", "ABT", "MCD", "DHR", "WFC",
        "MDT", "BMY", "TXN", "NEE", "PM", "LIN", "HON", "QCOM", "COST", "AMGN",
    ];

    function checkSignUp(path) {
        navigate(path)
    }

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await fetch("https://stock-data-1032123744845.us-central1.run.app/get-latest-prices");
                const data = await response.json();

                const cryptoFilteredData = data
                    .filter(crypto => allCrypto.includes(crypto.Ticker))
                    .sort((a, b) => b.Volume - a.Volume)
                    .slice(0, 5)

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
                <div className="h-[45px] w-full overflow-hidden border-b-1 dark:border-white light:border-gray-200 flex items-center">
                    <CustomTickerTape />
                </div>
                <div className="w-full h-[calc(100dvh-95px)] p-3 space-y-2 overflow-auto">
                    <div className="h-fit p-3 space-y-2">
                        <div className="text-lg md:text-2xl font-bold">Market Overview</div>
                        <div className="text-sm items-center flex gap-2"><Sparkles className="text-purple-500 w-6 h-6" /> Click on a symbol to learn more and perform a deep analysis.</div>
                    </div>
                    <div className="h-fit p-3 flex justify-between">
                        <div className="text-sm md:text-lg font-semibold " >Top Cryptocurrencies by Volume</div>
                        <div className="text-sm md:text-lg font-semibold underline text-purple-500 cursor-pointer" onClick={() => { navigate("/crypto") }}>View All Crypto</div>
                    </div>
                    <div className="text-xs md:text-sm w-full h-fit border rounded-xl scrollbar-hide overflow-auto">
                        <table className="min-w-full" style={{ tableLayout: 'fixed' }}>
                            <thead>
                                <tr className="border-b">
                                    <th className="px-4 py-2 text-left" style={{ width: '25%' }}>Ticker</th>
                                    <th className="px-4 py-2 text-left" style={{ width: '12.5%' }}>Current Price</th>
                                    <th className="px-4 py-2 text-left" style={{ width: '12.5%' }}>Open</th>
                                    <th className="px-4 py-2 text-left" style={{ width: '12.5%' }}>High</th>
                                    <th className="px-4 py-2 text-left" style={{ width: '12.5%' }}>Low</th>
                                    <th className="px-4 py-2 text-left" style={{ width: '12.5%' }}>Volume</th>
                                    <th className="px-4 py-2 text-left" style={{ width: '12.5%' }}>Datetime</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cryptoPrices && cryptoPrices.length > 0 ? (
                                    cryptoPrices.map((crypto, index) => {
                                        return (
                                            <tr
                                                key={index}
                                                className={`cursor-pointer bg-purple-50 hover:bg-purple-100 hover:bg-gray-100`}
                                                onClick={() => { checkSignUp(`/crypto/${crypto.Ticker}`) }}
                                            >
                                                <td className="px-4 py-2 flex items-center gap-2">
                                                    <img
                                                        src={cryptoMetadata[crypto.Ticker]?.image}
                                                        alt={crypto.Ticker}
                                                        className="w-6 h-6 rounded-full"
                                                    />
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold">{crypto.Ticker}</span>
                                                        <span className="text-gray-500 text-sm">
                                                            {cryptoMetadata[crypto.Ticker]?.fullName || "Unknown"}
                                                        </span>
                                                    </div>
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
                                        <td colSpan="7" className="text-center text-gray-500 px-4">Loading...</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="h-fit p-3 flex justify-between">
                        <div className="text-sm md:text-lg font-semibold " >Top Stocks by Volume</div>
                        <div className="text-sm md:text-lg font-semibold underline text-purple-500 cursor-pointer" onClick={() => { navigate("/stocks") }}>View All Stocks</div>
                    </div>
                    <div className="pb-2 text-xs md:text-sm w-full h-fit border rounded-xl scrollbar-hide overflow-auto">
                        <table className="min-w-full" style={{ tableLayout: 'fixed' }}>
                            <thead>
                                <tr className="border-b">
                                    <th className="px-4 py-2 text-left" style={{ width: '25%' }}>Ticker</th>
                                    <th className="px-4 py-2 text-left" style={{ width: '12.5%' }}>Current Price</th>
                                    <th className="px-4 py-2 text-left" style={{ width: '12.5%' }}>Open</th>
                                    <th className="px-4 py-2 text-left" style={{ width: '12.5%' }}>High</th>
                                    <th className="px-4 py-2 text-left" style={{ width: '12.5%' }}>Low</th>
                                    <th className="px-4 py-2 text-left" style={{ width: '12.5%' }}>Volume</th>
                                    <th className="px-4 py-2 text-left" style={{ width: '12.5%' }}>Datetime</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stockPrices && stockPrices.length > 0 ? (
                                    stockPrices.map((stock, index) => {
                                        return (
                                            <tr
                                                key={index}
                                                className={`cursor-pointer bg-purple-50 hover:bg-purple-100 hover:bg-gray-100`}
                                                onClick={() => { checkSignUp(`/stock/${stock.Ticker}`) }}
                                            >
                                                <td className="px-4 py-2 flex items-center gap-2">
                                                    <img
                                                        src={stockMetadata[stock.Ticker]?.image}
                                                        alt={stock.Ticker}
                                                        className="w-6 h-6 rounded-full"
                                                    />
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold">{stock.Ticker}</span>
                                                        <span className="text-gray-500 text-sm">
                                                            {stockMetadata[stock.Ticker]?.fullName || "Unknown"}
                                                        </span>
                                                    </div>
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
                                        <td colSpan="7" className="text-center text-gray-500 px-4">Loading...</td>
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
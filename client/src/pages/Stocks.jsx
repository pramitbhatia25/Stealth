import { useEffect, useState } from "react";
import { TickerTape } from "react-ts-tradingview-widgets";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import stockMetadata from "../data/stockMetadata.jsx"
import CustomTickerTape from "../components/CustomTickerTape.jsx";

function Stocks({ isSidebarOpen, setIsSidebarOpen }) {
    const [stockPrices, setStockPrices] = useState([]);
    const allStock = ["AAPL", "NVDA", "MSFT", "AMZN", "GOOG", "META", "TSLA", "AVGO", "LLY",
        "WMT", "JPM", "V", "XOM", "MA", "UNH", "HD", "PG", "CVX", "KO",
        "PEP", "MRK", "ABBV", "PFE", "BAC", "CSCO", "ACN", "NFLX", "INTC", "CMCSA",
        "T", "VZ", "ADBE", "CRM", "NKE", "ORCL", "ABT", "MCD", "DHR", "WFC",
        "MDT", "BMY", "TXN", "NEE", "PM", "LIN", "HON", "QCOM", "COST", "AMGN",
    ];

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await fetch("https://stock-data-1032123744845.us-central1.run.app/get-latest-prices");
                const data = await response.json();
                const stockFilteredData = data.filter(crypto => allStock.includes(crypto.Ticker));
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
                <div className="h-[45px] w-full overflow-hidden border-b-1 border-gray-200">
                    <CustomTickerTape />
                </div>
                <div className="w-full h-[calc(100dvh-95px)] p-3 space-y-2">
                    <div className="h-fit p-3 space-y-2">
                        <div className="text-lg md:text-2xl font-bold">All Stock Data</div>
                        <div className="text-sm items-center flex gap-2"><Sparkles className="text-purple-500 w-6 h-6" /> Click on a coin to learn more and perform a deep analysis.</div>
                    </div>
                    <div className="pb-2 text-xs md:text-sm w-full overflow-auto">
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
                                                onClick={() => { navigate(`/stocks/${stock.Ticker}`) }}
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

export default Stocks;

import { useEffect, useState } from "react";
import { TickerTape } from "react-ts-tradingview-widgets";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import cryptoMetadata from "../data/cryptoMetadata.jsx"
import CustomTickerTape from "../components/CustomTickerTape.jsx";
import CustomNavbar from "../components/Navbar.jsx";

function Crypto({ isSidebarOpen, setIsSidebarOpen }) {
    const [cryptoPrices, setCryptoPrices] = useState([]);
    const allCrypto = ['LTC-USD', 'ETH-USD', 'DOGE-USD', 'BTC-USD', 'BNB-USD', 'XRP-USD', 'ADA-USD', 'SOL-USD', 'DOT-USD', 'MATIC-USD', 'LTC-USD', 'BCH-USD', 'LINK-USD', 'XLM-USD', 'UNI1-USD', 'ATOM-USD', 'ALGO-USD', 'VET-USD', 'ICP-USD', 'FIL-USD', 'MANA-USD'];

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await fetch("https://stock-data-1032123744845.us-central1.run.app/get-latest-prices");
                const data = await response.json();
                const cryptoFilteredData = data.filter(crypto => allCrypto.includes(crypto.Ticker));
                setCryptoPrices(cryptoFilteredData);
            } catch (error) {
                console.error("Error fetching prices:", error);
            }
        };

        fetchPrices();
    }, []);

    const navigate = useNavigate();

    return (
        <div className="h-full w-full">
            <div className="">
                <CustomTickerTape />
            </div>
            <div className="h-[calc(100dvh-40px)] w-full flex flex-col overflow-y-auto">
                <div className="h-[55px] w-full overflow-hidden border-b-1 dark:border-white light:border-gray-200 flex items-center">
                    <CustomNavbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                </div>
                <div className="w-full h-[calc(100dvh-95px)] p-3 space-y-2 overflow-auto">
                    <div className="h-fit p-3 space-y-2">
                        <div className="text-lg md:text-2xl font-bold">All Crypto Data</div>
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
                            {cryptoPrices && cryptoPrices.length > 0 ? (
                                    cryptoPrices.map((crypto, index) => {
                                        return (
                                            <tr
                                                key={index}
                                                className={`cursor-pointer bg-purple-50 hover:bg-purple-100 hover:bg-gray-100`}
                                                onClick={() => { navigate(`/crypto/${crypto.Ticker}`) }}
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

                </div>
            </div>
        </div>
    );
}

export default Crypto;

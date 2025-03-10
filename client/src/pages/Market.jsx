import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import cryptoMetadata from "../data/cryptoMetadata.jsx"
import CustomNavbar from "../components/Navbar.jsx";
import { useCryptoData } from "../data/cryptoDataProvider.jsx";

function Market({ isDark, setIsDark, isSidebarOpen, setIsSidebarOpen }) {
    const {cryptoPrices, loading} = useCryptoData();

    const navigate = useNavigate();

    return (
        <div className="h-full w-full bgcustom2">
            <div className="h-[55px] w-full overflow-hidden flex items-center">
                <CustomNavbar isDark={isDark} setIsDark={setIsDark} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            </div>
            <div className="w-full h-[calc(100dvh-55px)] space-y-2 overflow-auto">
                <div className="h-fit p-3 space-y-2">
                    <div className="text-lg md:text-2xl font-bold">Market Data</div>
                    <div className="text-sm items-center flex gap-2"><Sparkles className="text-purple-500 w-6 h-6" /> Click on a coin to learn more and perform a deep analysis.</div>
                </div>
                <div className="pb-2 text-xs md:text-sm w-full overflow-auto">
                <table className="min-w-full" style={{ tableLayout: 'fixed' }}>
                        <thead>
                            <tr className="border-b">
                                <th className="px-4 py-2 text-left" style={{ width: '25%' }}>Ticker</th>
                                <th className="px-4 py-2 text-left" style={{ width: '12.5%' }}>Current Price</th>
                                <th className="hidden md:table-cell px-4 py-2 text-left" style={{ width: '12.5%' }}>Open</th>
                                <th className="hidden md:table-cell px-4 py-2 text-left" style={{ width: '12.5%' }}>High</th>
                                <th className="hidden md:table-cell px-4 py-2 text-left" style={{ width: '12.5%' }}>Low</th>
                                <th className="hidden md:table-cell px-4 py-2 text-left" style={{ width: '12.5%' }}>Volume</th>
                                <th className="hidden md:table-cell px-4 py-2 text-left" style={{ width: '12.5%' }}>Datetime</th>
                            </tr>
                        </thead>
                        <tbody>
                        {cryptoPrices && cryptoPrices.length > 0 ? (
                                cryptoPrices.map((crypto, index) => {
                                    return (
                                        <tr
                                            key={index}
                                            className={`cursor-pointer text-white bg-transparent hover:bg-gray-500 hover:text-black`}
                                            onClick={() => { navigate(`/market/${crypto.Ticker}`) }}
                                        >
                                            <td className="px-4 py-2 flex items-center gap-2">
                                                <img
                                                    src={cryptoMetadata[crypto.Ticker]?.image}
                                                    alt={crypto.Ticker}
                                                    className="w-6 h-6 rounded-full bg-white"
                                                />
                                                <div className="flex flex-col">
                                                    <span className="font-semibold">{crypto.Ticker}</span>
                                                    <span className="text-white text-sm">
                                                        {cryptoMetadata[crypto.Ticker]?.fullName || "Unknown"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2">${crypto.CurrentPrice.toFixed(2)}</td>
                                            <td className="hidden md:table-cell px-4 py-2">${crypto.Open.toFixed(2)}</td>
                                            <td className="hidden md:table-cell px-4 py-2">${crypto.High.toFixed(2)}</td>
                                            <td className="hidden md:table-cell px-4 py-2">${crypto.Low.toFixed(2)}</td>
                                            <td className="hidden md:table-cell px-4 py-2">{crypto.Volume}</td>
                                            <td className="hidden md:table-cell px-4 py-2">
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
    );
}

export default Market;

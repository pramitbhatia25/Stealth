import { useCryptoData } from "../data/cryptoDataProvider.jsx";
import cryptoMetadata from "../data/cryptoMetadata.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomTickerTape() {
  const [isPaused, setIsPaused] = useState(false);
  const { cryptoPrices, loading } = useCryptoData();
  const navigate = useNavigate();

  return (
    <div className="h-full w-full py-2 bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center overflow-hidden relative group">
      {loading ? (
        <div className="w-full text-center py-4 text-gray-500">Loading...</div>
      ) : (
        <div
          className={`flex animate-marquee items-center min-w-max ${isPaused ? "paused" : ""}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Double the content for seamless looping */}
          {[...cryptoPrices, ...cryptoPrices].map((crypto, index) => {
            const difference = crypto.CurrentPrice - crypto.Open;
            const percentage = (difference / crypto.Open) * 100;
            const isPositive = difference >= 0;

            return (
              <div
                key={`${crypto.Ticker}-${index}`}
                className="text-black cursor-pointer flex items-center gap-4 px-6 py-2 transition-all duration-200 hover:bg-gray-100 rounded-lg"
                onClick={() => navigate(`/crypto/${crypto.Ticker}`)}
              >
                <img
                  src={cryptoMetadata[crypto.Ticker]?.image}
                  alt={crypto.Ticker}
                  className="w-6 h-6 rounded-full"
                />
                <div className="font-bold min-w-[60px]">{crypto.Ticker}</div>
                <div className="min-w-[50px]">${crypto.CurrentPrice.toFixed(4)}</div>
                <div className={`flex items-center gap-1 ${isPositive ? "text-green-600" : "text-red-600"}`}>
                  <span>{isPositive ? "▲" : "▼"}</span>
                  <span>
                    {isPositive ? "+" : ""}
                    {difference.toFixed(3)} ({isPositive ? "+" : ""}
                    {percentage.toFixed(2)}%)
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Marquee animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-15%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .paused {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

export default CustomTickerTape;
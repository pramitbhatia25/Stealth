import { createContext, useContext, useEffect, useState } from "react";

const CryptoDataContext = createContext();

export function CryptoDataProvider({ children }) {
  const [cryptoPrices, setCryptoPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  const allCrypto = [
    "LTC-USD", "ETH-USD", "DOGE-USD", "BTC-USD", "BNB-USD",
    "XRP-USD", "ADA-USD", "SOL-USD", "DOT-USD", "MATIC-USD",
    "LTC-USD", "BCH-USD", "LINK-USD", "XLM-USD", "UNI1-USD",
    "ATOM-USD", "ALGO-USD", "VET-USD", "ICP-USD", "FIL-USD", "MANA-USD"
  ];


  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch("https://stock-data-1032123744845.us-central1.run.app/get-latest-prices");
        const data = await response.json();
        const cryptoFilteredData = data.filter(crypto => allCrypto.includes(crypto.Ticker));
        setCryptoPrices(cryptoFilteredData);
      } catch (error) {
        console.error("Error fetching prices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  return (
    <CryptoDataContext.Provider value={{ cryptoPrices, loading }}>
      {children}
    </CryptoDataContext.Provider>
  );
}

export function useCryptoData() {
  return useContext(CryptoDataContext);
}

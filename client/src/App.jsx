import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";
import CustomNavbar from "./components/Navbar";
import Chat from "./pages/Chat";
import Crypto from "./pages/Crypto";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { StarknetWalletConnectors } from "@dynamic-labs/starknet";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";
import { FlowWalletConnectors } from "@dynamic-labs/flow";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { EclipseWalletConnectors } from "@dynamic-labs/eclipse";
import { CosmosWalletConnectors } from "@dynamic-labs/cosmos";
import { BitcoinWalletConnectors } from "@dynamic-labs/bitcoin";
import { AlgorandWalletConnectors } from "@dynamic-labs/algorand";
import SpecificCrypto from "./pages/SpecificCrypto";
import Stocks from "./pages/Stocks";
import Overview from "./pages/Overview";
import { CryptoDataProvider } from "./data/cryptoDataProvider";


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <CryptoDataProvider>
      <DynamicContextProvider
        settings={{
          environmentId: "b729ee28-b174-4641-8419-f946ccc04243",
          walletConnectors: [
            AlgorandWalletConnectors,
            BitcoinWalletConnectors,
            CosmosWalletConnectors,
            EclipseWalletConnectors,
            EthereumWalletConnectors,
            FlowWalletConnectors,
            SolanaWalletConnectors,
            StarknetWalletConnectors,
          ],
        }}
      >
        <Router>
          <div className="flex w-full h-screen">
            <div className={`z-50 transition-all duration-300 ${isSidebarOpen ? "w-full md:w-[15dvw]" : "w-0"}`}>
              <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            </div>

            <div className={`transition-all duration-300 ${isSidebarOpen ? "w-full md:w-[85dvw]" : "w-full"}`}>
              <div className={`transition-all duration-300 h-full ${isSidebarOpen ? "w-full md:w-[85dvw]" : "w-full"}`}>
                <div className="">
                  <CustomNavbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                </div>
                <div className="">
                  <Routes>
                    <Route path="/" element={<Overview isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />} />
                    <Route path="/stocks" element={<Stocks isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />} />
                    <Route path="/crypto" element={<Crypto isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />} />
                    <Route path="/news" element={<Crypto isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />} />
                    <Route path="/chat" element={<Chat isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />} />
                    <Route path="/crypto/:symbol" element={<SpecificCrypto isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />} />
                    <Route path="/stocks/:symbol" element={<SpecificCrypto isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />} />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        </Router>
      </DynamicContextProvider>
    </CryptoDataProvider>
  );
}

export default App;

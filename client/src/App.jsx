import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";
import Chat from "./pages/Chat";
import Market from "./pages/Market";
import SpecificSymbol from "./pages/SpecificSymbol";
import LandingPage from "./pages/LandingPage";
import { CryptoDataProvider } from "./data/cryptoDataProvider";
import { useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import Error from "./pages/Error";
import ChatDemo from "./pages/ChatDemo";
import Home from "./pages/Home";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const isLoggedIn = useIsLoggedIn();
  
  return (
    <CryptoDataProvider>
        <Router>
          <div className={`flex w-full h-[100dvh]`}>
            <div className={`z-50 transition-all duration-300 ${isSidebarOpen ? "w-full md:w-[15dvw]" : "w-0"}`}>
              <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            </div>

            <div className={`transition-all duration-300 ${isSidebarOpen ? "w-full md:w-[85dvw]" : "w-full"}`}>
              <div className={`transition-all duration-300 h-full ${isSidebarOpen ? "w-full md:w-[85dvw]" : "w-full"}`}>
                <div className="">
                  <Routes>
                    <Route path="/" element={<LandingPage isDark={isDark} setIsDark={setIsDark} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />} />
                    <Route path="/chatdemo" element={<ChatDemo isDark={isDark} setIsDark={setIsDark} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />} />
                    {isLoggedIn && <>
                      <Route path="/home" element={<Home isDark={isDark} setIsDark={setIsDark} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />} />
                      <Route path="/market" element={<Market isDark={isDark} setIsDark={setIsDark} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />} />
                      <Route path="/chat" element={<Chat isDark={isDark} setIsDark={setIsDark} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />} />
                      <Route path="/market/:symbol" element={<SpecificSymbol isDark={isDark} setIsDark={setIsDark} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />} />
                    </>}
                    <Route path="*" element={<Error isDark={isDark} setIsDark={setIsDark} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />} />
                    </Routes>
                </div>
              </div>
            </div>
          </div>
        </Router>
    </CryptoDataProvider>
  );
}

export default App;

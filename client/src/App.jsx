import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import Home2 from "./pages/Home2";
import AIChart from "./pages/Test";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="flex w-screen h-screen">
        <div className={`z-50 transition-all duration-300 ${isSidebarOpen ? "w-[15dvw]" : "w-[0dvw]"}`}>
          <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
        </div>

        <div className={`transition-all duration-300 ${isSidebarOpen ? "w-full md:w-[85dvw]" : "w-full"}`}>
          <Routes>
            <Route path="/" element={<Home isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>} />
            <Route path="/ai" element={<AIChart isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>} />
            <Route path="/home2" element={<Home2 isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

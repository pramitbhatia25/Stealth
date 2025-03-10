import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import cryptoMetadata from "../data/cryptoMetadata.jsx"
import CustomNavbar from "../components/Navbar.jsx";
import { useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { useEffect } from "react";

function Error({ isDark, setIsDark, isSidebarOpen, setIsSidebarOpen }) {

    const isLoggedIn = useIsLoggedIn();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!isLoggedIn) {
        setIsSidebarOpen(false)
        navigate("/");
      }
    }, [isLoggedIn, navigate]);
  
  
    return (
        <div className="h-full w-full bg-[#0d0e10]">
            <div className="h-[55px] w-full overflow-hidden flex items-center">
                <CustomNavbar isDark={isDark} setIsDark={setIsDark} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            </div>
            <div className="w-full h-[calc(100dvh-55px)] p-3 flex items-center justify-center">
                404 not found!
            </div>
        </div>
    );
}

export default Error;

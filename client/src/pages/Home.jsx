import CustomNavbar from "../components/Navbar.jsx";

function Home({ isDark, setIsDark, isSidebarOpen, setIsSidebarOpen }) {  
  
    return (
        <div className="h-full w-full bg-[#0d0e10]">
            <div className="h-[55px] w-full overflow-hidden flex items-center">
                <CustomNavbar isDark={isDark} setIsDark={setIsDark} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            </div>
            <div className="w-full h-[calc(100dvh-55px)] p-3 flex items-center justify-center">
                This page is under development! Please check back soon. 😊
            </div>
        </div>
    );
}

export default Home;

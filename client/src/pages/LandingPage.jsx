import { useNavigate } from "react-router-dom";
import { Play, Sparkles } from "lucide-react";
import CustomNavbar from "../components/Navbar.jsx";
import { DynamicConnectButton } from "@dynamic-labs/sdk-react-core";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useState } from "react";

function LandingPage({ isDark, setIsDark, isSidebarOpen, setIsSidebarOpen }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    return (
        <div className="h-screen w-full dark:bg-gray-950 transition-colors duration-300">
            <div className="h-full w-full flex flex-col overflow-y-auto bg-white dark:bg-gray-950 transition-colors duration-300">
                
                {/* Light Mode Glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 blur-[100px] rounded-full 
                              bg-green-200/30 opacity-50 dark:bg-green-500/20 dark:opacity-30" />

                <CustomNavbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} isDark={isDark} setIsDark={setIsDark}/>

                <div className="px-6 py-20 max-w-7xl mx-auto text-center flex flex-col items-center justify-center relative z-10">
                    <h1 className="text-2xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                        Decoding the future of
                        <br />
                        <span className="bg-gradient-to-r from-green-400 to-green-600 dark:from-green-300 dark:to-green-500 
                                      bg-clip-text text-transparent">
                            Crypto Intelligence
                        </span>
                    </h1>

                    <p className="text-md md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed 
                                text-gray-600 dark:text-gray-400 transition-colors duration-300">
                        Master cryptocurrency markets with AI-powered analytics, real-time insights, and institutional-grade research tools.
                    </p>

                    <div className="px-6 py-3 rounded-lg font-medium border transition-colors duration-300
                                  bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300
                                  border-green-200 dark:border-green-800/50">
                        <Sparkles className="inline-block w-5 h-5 mr-2 text-green-600 dark:text-green-300" />
                        Free premium access for first 1,000 members
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <DynamicConnectButton>
                        <button 
                            className="px-8 py-4 hover:scale-105 bg-gradient-to-r from-green-400 to-green-600 dark:from-green-500 dark:to-green-700
                                      text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300
                                      hover:shadow-green-100 dark:hover:shadow-green-900/30"
                        >
                            Get Started
                        </button>
                    </DynamicConnectButton>
                        <button
                            onClick={() => {setIsModalOpen(true)}}
                            className="flex gap-4 px-8 py-4 bg-white dark:bg-gray-800 text-green-600 dark:text-green-300 rounded-lg font-semibold  hover:bg-green-50 dark:hover:bg-green-900/20 
                                    transition-colors duration-300 hover:border-[green] hover:border border dark:border-black light:border-gray-200"
                        >
                        <Play className="w-6 h-6" />
                            View Demo
                        </button>
                    </div>

                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} size={"full"} backdrop="blur">
                <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Demo</ModalHeader>
                    <ModalBody>
                        <div className="h-full w-full border">
                            <iframe
                                className="w-full h-full rounded-lg"
                                src="https://www.youtube.com/watch?si=hGPkLkd5wIDjUE00&"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
    );
}

export default LandingPage;
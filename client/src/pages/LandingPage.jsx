import { useNavigate } from "react-router-dom";
import { ArrowRight, MailIcon, Play, Rocket, Sparkles } from "lucide-react";
import CustomNavbar from "../components/Navbar.jsx";
import { DynamicConnectButton, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { Button, Chip, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";
import register from "../components/register";
import frame from "../assets/frame.png"
import Footer from "../components/Footer.jsx";
import { TypeAnimation } from 'react-type-animation';

function LandingPage({ isDark, setIsDark, isSidebarOpen, setIsSidebarOpen }) {

    const [isLoaded, setIsLoaded] = useState(false);
    const [registerLoading, setRegisterLoading] = useState(false);
    const [registerMessage, setRegisterMessage] = useState(false);
    const [value, setValue] = useState("");

    const toggleLoad = () => {
        setIsLoaded(!isLoaded);
    };

    const isLoggedIn = useIsLoggedIn();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (isLoggedIn) {
        navigate("/home");
      }
    }, [isLoggedIn, navigate]);


    useEffect(() => {
        const timer = setTimeout(() => {
            toggleLoad(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);


    async function registerUser() {
        setRegisterLoading(true)

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setRegisterMessage("Please enter a valid email address.");
            setRegisterLoading(false);
            return;
        }

        const regres = await register(value);

        if (regres === "Success") {
            setRegisterMessage("You have been registered successfully!")
            setRegisterLoading(false)
        }
        else {
            setRegisterMessage("Error with registration, please try again!")
            setRegisterLoading(false)
        }

    }


    return (
        <div className="dark h-full min-h-[100dvh] w-full bgcustom transition-colors duration-300">
            <div className="h-full w-full flex flex-col overflow-y-auto transition-colors duration-300">
                <div className="h-fit">
                    <CustomNavbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

                    <div className="min-h-[90dvh] h-fit md:flex-row flex-col flex">
                        <div className="px-5 py-20 max-w-[100%] md:max-w-[65%] flex flex-col items-center md:items-start justify-center relative z-10">

                            <Chip className="bg-gradient-to-r py-5 text-md from-green-900 to-green-700 text-white rounded-lg mb-8">
                                <Rocket className="inline-block w-5 h-5 mr-2 text-green-600 text-green-300" />
                                Free premium access for first 1,000 signups
                            </Chip>

                            <h1 className="text-4xl md:text-7xl font-semibold mb-6 text-center md:text-left text-gray-900 dark:text-gray-100 transition-colors duration-300">
                                Analyse the future of
                                <br />
                                <span className="bg-gradient-to-r from-green-400 to-green-600 dark:from-green-300 dark:to-green-500 
                                      bg-clip-text text-transparent">
                                    <TypeAnimation
                                        sequence={[
                                            'Crypto Intelligence', 1000,
                                            'Stock Markets', 1000,
                                            'Bitcoin', 1000,
                                            'NVDA', 1000,
                                            'Ethereum', 1000,
                                            'TSLA', 1000,
                                        ]}
                                        wrapper="span"
                                        speed={50}
                                        repeat={Infinity}
                                    />
                                </span>
                            </h1>

                            <p className="text-md md:text-xl mb-8 leading-relaxed 
                                text-gray-400 text-center md:text-left">
                                Master financial markets with AI-powered analytics, real-time insights, and institutional-grade research tools.
                            </p>


                            <div className="flex flex-col items-center md:items-start w-full gap-4">
                                <div className="flex flex-col md:flex-row gap-4 w-full items-center md:items-start text-white">
                                    <Input
                                        type="email"
                                        placeholder="you@example.com"
                                        labelPlacement="outside"
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                        startContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                                    />
                                    {registerLoading ? <>
                                        <div className="flex gap-4 m-auto w-fit ">
                                            <Button className="md:w-[150px] flex-shrink-0 w-fit text-sm p-3 bg-gradient-to-r from-green-900 to-green-700 hover:scale-105 duration-300 text-white rounded-lg font-semibold" >
                                                Loading...
                                            </Button>
                                        </div>
                                    </> : <>
                                        <button onClick={registerUser} className="md:w-[150px] flex-shrink-0 w-fit text-sm p-3 bg-gradient-to-r from-green-900 to-green-700 hover:scale-105 duration-300 text-white rounded-lg font-semibold">
                                            Join Waitlist
                                        </button>
                                    </>}
                                </div>
                                <div className="mt-4 text-gray-400 text-center md:text-left w-full">
                                    {registerMessage}
                                </div>

                            </div>

                        </div>
                        <div className="text-white w-[100%] md:w-[35%] flex justify-center items-center">
                            <div className="cursor-pointer w-[350px] flex-shrink-0">
                                <img src={frame} alt="Brand Logo" className="w-full" />
                            </div>
                        </div>
                    </div>

                </div>

                <Footer />
            </div>
        </div>
    );
}

export default LandingPage;
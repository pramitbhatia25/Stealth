import { useNavigate } from "react-router-dom";
import { MailIcon, Play, Rocket, Sparkles } from "lucide-react";
import CustomNavbar from "../components/Navbar.jsx";
import { DynamicConnectButton } from "@dynamic-labs/sdk-react-core";
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
        <div className="dark h-[100dvh] w-full bgcustom transition-colors duration-300">
            <div className="h-full w-full flex flex-col overflow-y-auto transition-colors duration-300">
                <div className="h-fit">
                    <CustomNavbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

                    <div className="min-h-[90dvh] h-fit md:flex-row flex-col flex">
                        <div className="px-5 py-20 max-w-[100%] md:max-w-[65%] flex flex-col items-center md:items-start justify-center relative z-10">

                            <Chip className="bg-gradient-to-r text-sm from-green-900 to-green-700 text-white rounded-lg mb-8">
                                <Rocket className="inline-block w-5 h-5 mr-2 text-green-600 text-green-300" />
                                Free premium access for first 1,000 signups
                            </Chip>

                            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center md:text-left text-gray-900 dark:text-gray-100 transition-colors duration-300">
                                Decoding the future of
                                <br />
                                <span className="bg-gradient-to-r from-green-400 to-green-600 dark:from-green-300 dark:to-green-500 
                                      bg-clip-text text-transparent">
                                    <TypeAnimation
                                        sequence={[
                                            'Crypto Intelligence', 1000,
                                            'Decentralized Finance (DeFi)', 1000,
                                            'On-Chain Analytics', 1000,
                                            'Bitcoin Halving Cycles', 1000,
                                            'Layer 2 Scaling Solutions', 1000,
                                            'Regulatory Trends in Crypto', 1000,
                                            'Smart Contract Security', 1000,
                                            'NFTs & Digital Ownership', 1000,
                                            'Crypto Market Sentiment', 1000,
                                            'Blockchain Gaming & Metaverse', 1000,
                                            'Institutional Adoption of Crypto', 1000,
                                            'Staking & Yield Farming', 1000,
                                            'Privacy Coins & Anonymity', 1000,
                                            'Central Bank Digital Currencies (CBDCs)', 1000,
                                            'AI & Blockchain Synergy', 1000
                                        ]}
                                        wrapper="span"
                                        speed={50}
                                        repeat={Infinity}
                                    />
                                </span>
                            </h1>

                            <p className="text-md md:text-xl mb-8 leading-relaxed 
                                text-gray-400 text-center md:text-left">
                                Master cryptocurrency markets with AI-powered analytics, real-time insights, and institutional-grade research tools.
                            </p>


                            <div className="flex flex-col items-center md:items-start w-full">
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
                                        <div className="flex gap-4 m-auto w-fit">
                                            <Button className="md:w-[20%] w-fit text-sm p-3 bg-gradient-to-r from-green-900 to-green-700 hover:scale-105 duration-300 text-white rounded-lg font-semibold" >
                                                Loading...
                                            </Button>
                                        </div>
                                    </> : <>
                                        <button onClick={registerUser} className="md:w-[20%] w-fit text-sm p-3 bg-gradient-to-r from-green-900 to-green-700 hover:scale-105 duration-300 text-white rounded-lg font-semibold">
                                            Get Started
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
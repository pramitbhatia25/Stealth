import { useParams } from 'react-router-dom';
import { useCryptoData } from '../data/cryptoDataProvider';
import cryptoMetadata from "../data/cryptoMetadata.jsx";
import { ActivityIcon, Bell, Briefcase, CheckCircle2, CpuIcon, LayoutGridIcon, Lightbulb, Lock, NewspaperIcon, Plus, Smile } from 'lucide-react';
import { Divider, Modal, ModalBody, ModalContent, ModalHeader, Tab, Tabs } from '@nextui-org/react';
import { CompanyProfile, FundamentalData, SymbolOverview, TechnicalAnalysis, Timeline } from 'react-ts-tradingview-widgets';
import { useState } from 'react';
import { CheckCircle, AlertTriangle } from "lucide-react";
import CustomNavbar from '../components/Navbar.jsx';
import CustomTickerTape from '../components/CustomTickerTape.jsx';

function SpecificCrypto({ isDark, setIsDark, isSidebarOpen, setIsSidebarOpen }) {
    const { symbol } = useParams();
    const cleanSymbol = symbol.replace(/-/g, '');

    const { cryptoPrices, loading } = useCryptoData();
    const crypto = cryptoPrices.find((c) => c.Ticker === symbol);

    const difference = crypto?.CurrentPrice - crypto?.Open;
    const percentage = (difference / crypto?.Open) * 100;
    const isPositive = difference >= 0;

    const [isModalOpen, setIsModalOpen] = useState(false);


    const checklistItems = [
        {
            title: "Growth Potential",
            subtitle: "HIGH ADOPTION",
            icon: <CheckCircle color="gray" className="w-3 h-3" />,
        },
        {
            title: "Market Stability",
            subtitle: "VOLATILE",
            icon: <AlertTriangle color="gray" className="w-3 h-3" />,
        },
        {
            title: "Risk Factor",
            subtitle: "MODERATE",
            icon: <AlertTriangle color="gray" className="w-3 h-3" />,
        },
        {
            title: "Institutional Interest",
            subtitle: "STRONG",
            icon: <Briefcase color="gray" className="w-3 h-3" />,
        },
        {
            title: "Market Sentiment",
            subtitle: "BULLISH",
            icon: <Smile color="gray" className="w-3 h-3" />,
        },
        {
            title: "Security",
            subtitle: "VERY HIGH",
            icon: <Lock color="gray" className="w-3 h-3" />,
        },
    ];
    


    return (
        <div className="h-full w-full">
            <div className="">
                <CustomTickerTape />
            </div>
            <div className="h-[calc(100dvh-40px)] w-full flex flex-col overflow-y-auto">
                <div className="h-[55px] w-full overflow-hidden border-b-1 dark:border-white light:border-gray-200 flex items-center">
                    <CustomNavbar isDark={isDark} setIsDark={setIsDark} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                </div>
                <div className="w-full h-[calc(100dvh-95px)] p-3 space-y-2 overflow-auto">
                    {loading ? (
                        <div className="w-full h-fit min-h-full flex items-center justify-center text-gray-500">Loading...</div>
                    ) : crypto ? (
                        <div className="flex flex-col h-fit min-h-full w-full px-5 py-2">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={cryptoMetadata[crypto.Ticker]?.image}
                                        alt={crypto.Ticker}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div className="text-2xl font-semibold">
                                        {crypto.Ticker}
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex gap-2 items-center text-sm font-semibold border border-black-500 p-2 m-1 rounded-xl hover:border-gray-200 hover:cursor-pointer">
                                        <Plus width={12} height={12} className='border rounded-xl border-black' />
                                        Watchlist
                                    </div>
                                    <div className="flex gap-2 items-center text-sm font-semibold border border-black-500 p-2 m-1 rounded-xl hover:border-gray-200 hover:cursor-pointer">
                                        <Bell width={12} height={12} />
                                        {crypto.Ticker}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center flex-wrap">
                                <div className="flex items-end gap-4 py-2 flex-wrap">
                                    <div className="text-3xl font-bold">
                                        ${crypto.CurrentPrice.toFixed(2)}
                                    </div>
                                    <div className="text-md font-semibold flex items-center gap-4">
                                        {isPositive ?
                                            <div className="text-green-500 flex gap-1 items-center">
                                                <span>▲</span>
                                                {difference.toFixed(2)}
                                                <div>
                                                    ({percentage.toFixed(2)}
                                                    %)
                                                </div>
                                            </div>
                                            :
                                            <div className="text-red-500 flex gap-1 items-center">
                                                <span>▼</span>
                                                {difference.toFixed(2)}
                                                <div>
                                                    ({percentage.toFixed(2)}
                                                    %)
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className="h-10">
                                        <Divider orientation="vertical" />
                                    </div>
                                    <div className="text-md font-semibold flex flex-col">
                                        <div className="text-gray-500 text-xs items-center">
                                            Volume
                                        </div>
                                        <div className="">
                                            {crypto?.Volume}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-end gap-2 py-2 flex-wrap">
                                    <div>
                                        <Lightbulb color={"green"} width={20} height={20} />
                                    </div>
                                    <div className="text-sm font-semibold">
                                        Turned $100 to $1,130 in the last 5 years
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col-reverse md:flex-col'>
                                <div className='flex flex-col'>
                                    <div className="flex justify-between items-center my-3">
                                        <div className="text-md font-semibold">
                                            Investment Checklist
                                        </div>
                                        <div className="text-sm font-semibold text-purple-500 underline">
                                            How to read checklist?
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap space-y-2 md:space-y-0 gap-2 justify-between my-3 ">
                                        {checklistItems.map((item, index) => (
                                            <div
                                                key={index}
                                                className="relative w-[16%] min-w-[180px] sm:w-[48%] md:w-[30%] lg:w-[18%] xl:w-[16%] p-2 min-h-[80px] h-fit border border-gray-300 rounded-xl pt-5"
                                            >
                                                <div className="absolute -top-3 left-[5%] w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center">
                                                    {item.icon}
                                                </div>
                                                <div className="text-xs">{item.title}</div>
                                                <div className="text-black font-semibold text-sm">{item.subtitle}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="relative border rounded-xl overflow-hidden h-[280px] mt-3">
                                    <button
                                        className="absolute top-2 right-2 bg-gray-200 text-black px-3 py-1 text-xs rounded-md hover:bg-gray-400"
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        Fullscreen
                                    </button>
                                    <SymbolOverview autosize={true} symbols={[cleanSymbol]} chartOnly={"true"} scalePosition='left' />
                                </div>
                            </div>

                            <div
                                className={`flex flex-col px-3 pt-3 w-full min-h-[500px]`}
                            >
                                <Tabs
                                    aria-label="Options"
                                    classNames={{
                                        tabList: "gap-6 w-full relative rounded-none p-0 border-divider",
                                        cursor: "w-full bg-[#2763fb]",
                                        tab: "max-w-fit px-0 h-12",
                                        tabContent: "group-data-[selected=true]:text-[#2763fb]",
                                    }}
                                    color="primary"
                                    variant="underlined"
                                >
                                    <Tab
                                        key="overview"
                                        title={
                                            <div className="flex items-center space-x-2 text-xs">
                                                <LayoutGridIcon className="w-4 h-4" />
                                                <span>Overview</span>
                                            </div>
                                        }
                                    >
                                        <div className="py-4">
                                            <div className="text-3xl font-bold">Overview</div>
                                            <div className="text-sm my-3 border border-gray-200 rounded-xl overflow-hidden">
                                                <CompanyProfile symbol={cleanSymbol} isTransparent="true" colorTheme="light" height={300} width="100%" />
                                            </div>
                                        </div>
                                    </Tab>

                                    <Tab
                                        key="technicals"
                                        title={
                                            <div className="flex items-center space-x-2 text-xs">
                                                <ActivityIcon className="w-4 h-4" />
                                                <span>Technicals</span>
                                            </div>
                                        }
                                    >
                                        <div className="py-4">
                                            <div className="text-3xl font-bold">Technicals</div>
                                            <div className="text-sm my-3 flex flex-col md:flex-row gap-4">
                                                <div className="flex-1 flex-col border border-gray-200 rounded-xl overflow-hidden">
                                                    <FundamentalData symbol={cleanSymbol} colorTheme="light" height={300} width="100%" />
                                                </div>
                                                <div className="flex-1 flex-col border border-gray-200 rounded-xl overflow-hidden">
                                                    <TechnicalAnalysis symbol={cleanSymbol} colorTheme="light" height={300} width="100%" />
                                                </div>
                                            </div>
                                        </div>
                                    </Tab>

                                    <Tab
                                        key="news"
                                        title={
                                            <div className="flex items-center space-x-2 text-xs cursor-pointer">
                                                <NewspaperIcon className="w-4 h-4" />
                                                <span>News</span>
                                            </div>
                                        }
                                    >
                                        <div className="py-4">
                                            <div className="text-3xl font-bold">News</div>
                                            <div className="text-sm my-3 border border-gray-200 rounded-xl overflow-hidden">
                                                <Timeline feedMode='symbol' symbol={cleanSymbol} colorTheme="light" height={300} width="100%" />
                                            </div>
                                        </div>
                                    </Tab>

                                    <Tab
                                        key="ai-summary"
                                        title={
                                            <div className="flex items-center space-x-2 text-xs">
                                                <CpuIcon className="w-4 h-4" />
                                                <span>AI Summary</span>
                                            </div>
                                        }
                                    >
                                        <div className="py-4">
                                            <div className="text-3xl font-bold">AI Summary</div>
                                            <div className="text-sm my-3">
                                                AI haha
                                            </div>
                                        </div>
                                    </Tab>
                                </Tabs>
                            </div>

                            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="full">
                                <ModalContent>
                                    <ModalHeader className="flex justify-between items-center">
                                        <span>Price Chart</span>
                                    </ModalHeader>
                                    <ModalBody>
                                        <div className="w-full h-[80vh]">
                                            <SymbolOverview autosize={true} symbols={[cleanSymbol]} scalePosition='left' />
                                        </div>
                                    </ModalBody>
                                </ModalContent>
                            </Modal>


                        </div>
                    ) : (
                        <div className="text-gray-500">Crypto not found</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SpecificCrypto;
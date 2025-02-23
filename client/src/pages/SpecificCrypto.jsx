import { useParams } from 'react-router-dom';
import { AdvancedRealTimeChart, CompanyProfile, FundamentalData, SymbolInfo, SymbolOverview } from 'react-ts-tradingview-widgets';
import { useState, useEffect } from 'react';
import HistoricalChart from './Test2';
import { Sparkles } from 'lucide-react';

function SpecificCrypto({ isSidebarOpen, setIsSidebarOpen }) {
    const { symbol } = useParams();
    const cleanSymbol = symbol.replace(/-/g, '');
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newsDataSummary, setNewsDataSummary] = useState([]);

    useEffect(() => {
        const searchTerm = cleanSymbol.substring(0, 3);
        fetchNews(searchTerm);
    }, [cleanSymbol]);

    const fetchNews = async (search) => {
        setLoading(true);
        try {
            const response = await fetch(`https://stock-data-1032123744845.us-central1.run.app/get-news/${search}`);
            const data = await response.json();
            setNewsData(data);
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false);
        }
    };

    const generateSummary = async () => {
        try {
            setNewsDataSummary("Loading");
            const response = await fetch(`https://stock-data-1032123744845.us-central1.run.app/news_summary/${symbol}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: `Generate a summary of the latest news for ${symbol}`,
                }),
            });

            const data = await response.json();
            setNewsDataSummary(data.text);
        } catch (error) {
            console.error('Error generating summary:', error);
            setNewsDataSummary("Error generating summary.")
        }
    };

    return (
        <div className="h-full w-full">
            <div className="h-[calc(100dvh-50px)] w-full flex flex-col overflow-y-auto scrollbar-hide">
                <div className="w-full h-fit p-5">
                    <div className="border-l-5 border-purple-500 px-5 h-fit">
                        <div className="text-lg md:text-lg font-bold h-fit mb-1">
                            Crypto Details: {symbol}
                        </div>
                        <div className="flex gap-4 h-fit">
                            <div className="h-fit w-[60%]">
                                <div className='h-[250px] overflow-hidden flex justify-around'>
                                    <div className='w-[45%]'>
                                        <SymbolInfo theme="light" allow_symbol_change={false} symbol={cleanSymbol} autosize></SymbolInfo>
                                    </div>
                                    <div className='w-[45%]'>
                                        <CompanyProfile theme="light" allow_symbol_change={false} symbol={cleanSymbol} autosize></CompanyProfile>
                                    </div>
                                </div>
                                <div className='mt-0'>
                                    <HistoricalChart symbol={symbol}/>
                                </div>
                            </div>
                            <div className="w-[40%] h-fit overflow-auto scrollbar-hide">
                                <h2 className="text-lg font-semibold mb-4">Latest News</h2>
                                <div className="flex flex-col gap-3 my-5">
                                    <button
                                        onClick={() => generateSummary()}
                                        className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                                    >
                                        <Sparkles className="h-5 w-5" />
                                        Generate Summary
                                    </button>
                                    {newsDataSummary != "" && (
                                        <div className="mt-3 flex gap-2">
                                            <Sparkles className='h-6 w-6 text-purple-500 flex-shrink-0' />
                                            <div className='text-sm'>
                                                {newsDataSummary}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {loading ? (
                                    <div className="text-center">Loading news...</div>
                                ) : (
                                    <div className="space-y-4">
                                        {newsData
                                            .sort((a, b) => new Date(b.time_published) - new Date(a.time_published))
                                            .map((news, index) => (
                                                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                                                    <div className="text-gray-500 flex flex-row gap-3 items-center text-xs">
                                                        <div>{news.source}</div>
                                                        <div className="border w-1 h-1 mt-1 bg-[gray] rounded-full" />
                                                        <div>{new Date(news.time_published).toLocaleString()}</div>
                                                    </div>
                                                    <a href={news.url} target="_blank" rel="noopener noreferrer" className='mt-4 hover:underline font-semibold text-md'>
                                                        {news.title}
                                                    </a>
                                                    <div className="mt-2 text-gray-500 text-sm">
                                                        {news.sentiment_label} -{" "}
                                                        {news.sentiment_score.toFixed(2)}
                                                    </div>
                                                    <p className="text-xs text-gray-400 mt-2">{new Date(news.time_published).toLocaleDateString()}</p>
                                                </div>
                                            ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpecificCrypto;
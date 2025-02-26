import { useParams } from 'react-router-dom';
import { AdvancedRealTimeChart, CompanyProfile, FundamentalData, SymbolInfo, SymbolOverview, TickerTape } from 'react-ts-tradingview-widgets';
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
            <div className="h-[calc(100dvh-50px)] w-full flex flex-col overflow-y-auto">
                <div className="h-[80px] md:h-[45px] w-full overflow-hidden border-b-2 border-gray-200">
                    <TickerTape />
                </div>
                <div className="w-full h-[calc(100dvh-140px)] md:h-[calc(100dvh-95px)] p-3 flex md:flex-row flex-col md:space-y-0 space-y-2 overflow-auto">
                    <div className="w-full md:h-full md:overflow-auto md:scrollbar-auto md:scrollbar-hide md:w-[50%] h-fit">
                        <div className='h-[250px] md:h-[220px] border-b-2 md:border-r-2 border-gray-200 overflow-hidden flex justify-between'>
                            <div className='w-[100%]'>
                                <SymbolInfo theme="light" allow_symbol_change={false} symbol={cleanSymbol} autosize></SymbolInfo>
                            </div>
                        </div>
                        <div className='mt-0'>
                            <HistoricalChart symbol={symbol} />
                        </div>
                    </div>
                    <div className="w-full md:h-full md:overflow-auto md:scrollbar-auto md:scrollbar-hide md:w-[50%] h-fit p-3">
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
    )
}

export default SpecificCrypto;
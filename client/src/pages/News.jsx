import { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";

function News({ isSidebarOpen, setIsSidebarOpen }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null); // New state for selected news

    const getFormattedDate = () => {
        const date = new Date();
        const day = date.getDate();
        const suffix = ['th', 'st', 'nd', 'rd'][(day % 10 > 3 || [11, 12, 13].includes(day % 100)) ? 0 : day % 10];
        const options = { month: 'long', year: 'numeric' };
        return `${day}${suffix} ${date.toLocaleDateString('en-US', options)}`;
    };

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

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            fetchNews(searchQuery);
        }
    };

    const handleNewsClick = (newsItem) => {
        setSelectedNews(newsItem); // Set the clicked news to be displayed in the summary
    };

    return (
        <div className="h-full w-full">
            <div className="h-[calc(100dvh-50px)] w-full flex flex-col overflow-y-auto">
                <div className="p-5 w-full h-full flex flex-col md:flex-row">
                    <div className="w-full h-full md:w-[40%] flex-shrink-0">
                        <div className="border-l-5 h-full border-purple-500 px-5 w-full">
                            <div className="h-[15%]">
                                <div className="text-lg md:text-xl font-bold">
                                    Overall Market
                                </div>
                                <form
                                    className="relative w-full mt-5 flex-shrink-0"
                                    onSubmit={handleSearchSubmit}
                                >
                                    <button
                                        type="submit"
                                        className="absolute left-2 top-1 text-purple-500 p-1 rounded-full transition-colors"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle cx="11" cy="11" r="8"></circle>
                                            <line x1="16" y1="16" x2="22" y2="22"></line>
                                        </svg>
                                    </button>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search a company or market..."
                                        className="w-full bg-white text-black rounded-lg py-2 pl-10 pr-4 text-xs border focus:outline-none focus:ring-0"
                                    />
                                </form>
                            </div>

                            <div className="h-[85%] overflow-auto scrollbar-hide">
                                {loading ? (
                                    <p className="mt-5 text-gray-500 tracking-normal">Loading news...</p>
                                ) : (
                                    <div className="pt-4 pb-2 flex items-start flex-col gap-y-5 tracking-tighter">
                                        {newsData.length > 0 ? (
                                            newsData.map((newsItem, index) => (
                                                <div
                                                    key={index}
                                                    className="p-5 border w-full h-fit rounded-lg flex flex-col cursor-pointer"
                                                    onClick={() => handleNewsClick(newsItem)} // Click to display full content
                                                >
                                                    <div className="text-gray-500 flex flex-row gap-3 items-center text-xs">
                                                        <div>{newsItem.source}</div>
                                                        <div className="border w-1 h-1 mt-1 bg-[gray] rounded-full" />
                                                        <div>{new Date(newsItem.time_published).toLocaleString()}</div>
                                                    </div>
                                                    <div className="mt-2 font-semibold text-md">
                                                        {newsItem.title}
                                                    </div>
                                                    <div className="mt-2 text-gray-500 text-sm">
                                                        {newsItem.sentiment_label} -{" "}
                                                        {newsItem.sentiment_score.toFixed(2)}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="mt-5 text-gray-500 tracking-normal">
                                                {searchQuery === "" ? (
                                                    "Enter a search query to view results"
                                                ) : (
                                                    "No results found for your search query"
                                                )}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="w-full mt-10 md:mt-0 md:w-[50%] ">
                        <div className="border-l-5 border-purple-500 px-5 h-full overflow-auto">
                            <div className="text-lg md:text-xl font-bold ">Summary & Impact</div>
                            {selectedNews && (
                                <div className="mt-5 p-6 space-y-6 bg-white rounded-lg shadow-lg">
                                    <div className="font-semibold text-2xl text-gray-800">{selectedNews.title}</div>

                                    <div className="flex flex-wrap gap-4">
                                        {/* Sentiment Response */}
                                        <div className="w-full p-4 border rounded-lg shadow-sm bg-teal-50">
                                            <div className="text-sm text-gray-500">Sentiment Response</div>
                                            <div className="font-semibold text-gray-700">
                                                {selectedNews.sentiment_score > 0.5 ? (
                                                    <div className="text-green-600">
                                                        The market sentiment seems very positive, reflecting optimism and growth potential. Investors are generally hopeful and expect future gains.
                                                    </div>
                                                ) : selectedNews.sentiment_score > 0.2 ? (
                                                    <div className="text-green-500">
                                                        The sentiment is cautiously optimistic. There is some positive outlook, but investors remain a bit cautious about volatility in the near term.
                                                    </div>
                                                ) : selectedNews.sentiment_score > 0 ? (
                                                    <div className="text-yellow-500">
                                                        The sentiment is neutral-to-positive, indicating that the market is stable, but investors are waiting for more data to make definitive decisions.
                                                    </div>
                                                ) : selectedNews.sentiment_score > -0.2 ? (
                                                    <div className="text-orange-500">
                                                        The sentiment is somewhat neutral, with minimal fluctuations. Investors are not overly enthusiastic, but there’s no panic either.
                                                    </div>
                                                ) : selectedNews.sentiment_score > -0.5 ? (
                                                    <div className="text-red-500">
                                                        The sentiment is slightly negative, with concerns around the market's short-term direction. Investors may be wary of further declines.
                                                    </div>
                                                ) : (
                                                    <div className="text-red-600">
                                                        The market sentiment is quite negative, reflecting concerns about a significant downturn. Investors are cautious and avoiding riskier positions.
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Ticker Sentiment Response */}
                                        <div className="w-full p-4 border rounded-lg shadow-sm bg-indigo-50">
                                            <div className="text-sm text-gray-500">Ticker Sentiment</div>
                                            <div className="font-semibold text-gray-700">
                                                {selectedNews.ticker_sentiment_label.includes("Bullish") ? (
                                                    <div className="text-green-600">
                                                        Investors are highly optimistic about this ticker, signaling strong potential for positive movement and growth in the near future.
                                                    </div>
                                                ) : selectedNews.ticker_sentiment_label.toLowerCase() === "neutral" ? (
                                                    <div className="text-yellow-600">
                                                        The ticker sentiment is neutral, with investors taking a wait-and-see approach. There are no strong biases either for or against this ticker.
                                                    </div>
                                                ) : selectedNews.ticker_sentiment_label.includes("Bearish") ? (
                                                    <div className="text-red-600">
                                                        Sentiment around this ticker is negative, with investors expressing caution and concerns over its short-term prospects. A decline in value might be expected.
                                                    </div>
                                                ) : (
                                                    <div className="text-gray-600">
                                                        The ticker sentiment could not be categorized, suggesting mixed opinions among investors about its future direction.
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Additional Card Information */}
                                        <div className="flex flex-wrap gap-4">
                                            {/* Card for Source */}
                                            <div className="flex-1 min-w-[200px] p-4 border rounded-lg shadow-sm bg-blue-50">
                                                <div className="text-sm text-gray-500">Source</div>
                                                <div className="font-semibold text-gray-700">{selectedNews.source}</div>
                                            </div>

                                            {/* Card for Published Time */}
                                            <div className="flex-1 min-w-[200px] p-4 border rounded-lg shadow-sm bg-green-50">
                                                <div className="text-sm text-gray-500">Published</div>
                                                <div className="font-semibold text-gray-700">
                                                    {new Date(selectedNews.time_published).toLocaleString()}
                                                </div>
                                            </div>

                                            {/* Card for URL */}
                                            <div className=" min-w-[200px] p-4 border rounded-lg shadow-sm bg-yellow-50">
                                                <div className="text-sm text-gray-500">URL</div>
                                                <div className="font-semibold text-gray-700 flex flex-wrap">
                                                    <a href={selectedNews.url} target="_blank" rel="noopener noreferrer" className=" text-blue-500 hover:underline">
                                                        {selectedNews.url}
                                                    </a>
                                                </div>
                                            </div>

                                            {/* Card for Sentiment Score */}
                                            <div className="flex-1 min-w-[200px] p-4 border rounded-lg shadow-sm bg-purple-50">
                                                <div className="text-sm text-gray-500">Sentiment Score</div>
                                                <div className="font-semibold text-gray-700">{selectedNews.sentiment_score}</div>
                                            </div>

                                            {/* Card for Sentiment Label */}
                                            <div className="flex-1 min-w-[200px] p-4 border rounded-lg shadow-sm bg-pink-50">
                                                <div className="text-sm text-gray-500">Sentiment Label</div>
                                                <div className="font-semibold text-gray-700">{selectedNews.sentiment_label}</div>
                                            </div>

                                            {/* Card for Ticker Sentiment Label */}
                                            <div className="flex-1 min-w-[200px] p-4 border rounded-lg shadow-sm bg-indigo-50">
                                                <div className="text-sm text-gray-500">Ticker Sentiment Label</div>
                                                <div className="font-semibold text-gray-700">{selectedNews.ticker_sentiment_label}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default News;

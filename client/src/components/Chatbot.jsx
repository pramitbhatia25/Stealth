import { Copy, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import Markdown from 'react-markdown'
import { PulseLoader } from "react-spinners";

const MessageActions = ({ text }) => {
    const [liked, setLiked] = useState(null);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="flex gap-3 text-gray-500 text-sm p-2">
            <button onClick={handleCopy} className="hover:text-gray-700">
                <Copy size={16} />
            </button>
            <button onClick={() => setLiked('like')} className={`hover:text-green-600 ${liked === 'like' && 'text-green-600'}`}>
                <ThumbsUp size={16} />
            </button>
            <button onClick={() => setLiked('dislike')} className={`hover:text-red-600 ${liked === 'dislike' && 'text-red-600'}`}>
                <ThumbsDown size={16} />
            </button>
        </div>
    );
};


const Chatbot = ({ extraWidgets, setExtraWidgets }) => {
    const [messages, setMessages] = useState([
    ]);

    const [inputText, setInputText] = useState('');
    const [aiTyping, setAiTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null)

    const aiResponse = [
        {
            type: 'text',
            text: "Hey Pramit! It looks like you're tackling some cool classification problems in your assignment! You're diving into song popularity on Spotify and how consumers respond to marketing campaigns. Here's a quick snapshot of what you’re working on: -  based on streaming counts. - You're analyzing how demographic and behavioral data influences consumer responses. - You're using algorithms like Neural Networks, K-Nearest Neighbors, and Support Vector Machines to draw insights. Ready to chat about your findings?",
        }
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useLayoutEffect(() => {
        scrollToBottom();
    }, [messages, aiTyping]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        // Add user message
        setMessages((prev) => [...prev, { id: prev.length + 1, text: inputText, isUser: true }]);
        setInputText('');

        // Make API call to fetch AI response
        setAiTyping(true);

        console.log("A")

        try {
            const response = await fetch('https://stock-data-1032123744845.us-central1.run.app/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: inputText }),
            });

            console.log("A")

            const data = await response.json();
            console.log(data)

            // Add AI message
            setMessages((prev) => [
                ...prev,
                { id: prev.length + 1, text: data.text, isUser: false }
            ]);

            const { graph } = data;
            setExtraWidgets((prevWidgets) => [...prevWidgets, ...(graph || [])]);
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);

        } catch (error) {
            console.error('Error fetching AI response:', error);
            setMessages((prev) => [
                ...prev,
                { id: prev.length + 1, text: 'Sorry, there was an error fetching the response.', isUser: false }
            ]);
        } finally {
            setAiTyping(false);
        }
    };

    return (
        <div className="flex flex-col h-full w-full">
            <div style={{ lineHeight: '1.8' }} className="flex-1 overflow-y-auto p-4 overflow-auto flex flex-col items-center">
            <div className="bg-blue-50 p-4  my-4 rounded-lg text-sm text-blue-800 w-fit self-center">
                <p className="font-semibold mb-2">Available Chart Types:</p>
                <ul className="list-disc list-inside">
                    <li>Symbol Info (with price and basic info)</li>
                    <li>Advanced Real-Time Charts</li>
                    <li>Cryptocurrency Market Overview</li>
                    <li>Ticker Tape</li>
                    <li>News Timeline</li>
                    <li>Forex Cross Rates</li>
                    <li>Crypto Coins Heatmap</li>
                </ul>
            </div>

                <div className='max-w-[800px] w-full'>
                    {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                            <div className={`w-fit ${message.isUser ? '' : 'pr-12'}`}>
                                <div className={`rounded-xl p-2 ${message.isUser ? 'bg-[#f2f2f2] text-black' : 'text-black'}`}>
                                    <p className="text-sm"><Markdown>{message.text}</Markdown></p>
                                </div>
                                {!message.isUser && <MessageActions text={message.text} />}
                            </div>
                        </div>
                    ))}
                    {aiTyping &&
                        <div className="flex items-center flex-col justify-center w-fit h-fit">
                            <PulseLoader className="mb-4" color="#a754f5" size="5" />
                            <MessageActions text={"Loading"} />
                        </div>
                    }
                </div>
                <div className="max-w-[800px]" ref={messagesEndRef} />
            </div>

            <div className="pb-5 px-4 max-w-[800px] w-full mx-auto">
                <form onSubmit={handleSubmit} className="relative">
                    <input
                        type="text"
                        ref={inputRef}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Ask about any stock or market..."
                        className="w-full bg-white text-black rounded-lg py-2 pl-4 pr-16 text-sm border border-gray-200 focus:outline-none focus:ring-0 shadow-md rounded-bottom-shadow"
                        disabled={aiTyping}
                    />
                    <button
                        type="submit"
                        className="absolute right-2 top-2 bg-purple-500 text-white p-1 rounded-full transition-colors"
                        disabled={aiTyping}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chatbot;
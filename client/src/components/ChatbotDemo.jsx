import { Select, SelectItem } from '@nextui-org/react';
import { Copy, Sparkle, Sparkles, ThumbsDown, ThumbsUp } from 'lucide-react';
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


const ChatbotDemo = ({ extraWidgets, setExtraWidgets }) => {

    const [messages, setMessages] = useState([
    ]);


    const [aiTyping, setAiTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null)

    const [value, setValue] = useState("");

    const handleSelectionChange = (e) => {
        setValue(e.target.value);
    };

    const placeholderOptions = [
        { key: "1", label: 'Which stock had the largest price variation today?' },
        { key: "2", label: 'What are the latest trends in the crypto market?' },
        { key: "3", label: 'How is Bitcoin performing today?' },
        { key: "4", label: 'Tell me about the latest news in Ethereum.' },
        { key: "5", label: 'What’s the current market status of NVDA?' },
        { key: "6", label: 'What is the latest stock news for TSLA?' },
        { key: "7", label: 'Show me the top 5 trending cryptocurrencies right now.' },
    ];


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useLayoutEffect(() => {
        scrollToBottom();
    }, [messages, aiTyping]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log(value)

        if (!value.trim()) return;

        // Add user message
        setMessages((prev) => [...prev, { id: prev.length + 1, text: value, isUser: true }]);

        // Make API call to fetch AI response
        setAiTyping(true);

        console.log("A")

        try {
            const response = await fetch('https://stock-data-1032123744845.us-central1.run.app/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: value }),
            });


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
                <div className="bg-blue-50 p-4  my-5 rounded-lg text-sm text-blue-800 w-fit self-center">
                    <p className="font-semibold mb-2">Try asking for these charts:</p>
                    <ul className="list-disc list-inside">
                        <li>Symbol Info (with price and basic info)</li>
                        <li>Advanced Real-Time Charts</li>
                        <li>Cryptocurrency Market Overview</li>
                        <li>News Timeline</li>
                        <li>Forex Cross Rates</li>
                        <li>Crypto Coins Heatmap</li>
                    </ul>
                </div>

                <div className='max-w-[800px] w-full'>
                    {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                            <div className={`w-fit ${message.isUser ? '' : 'pr-12'}`}>
                                <div className={`rounded-xl p-2 ${message.isUser ? 'bg-[#f2f2f2] text-black' : 'text-white'}`}>
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

            <div className="pb-5 px-4 max-w-[800px] gap-4 w-full mx-auto flex">
                <Select
                    className="w-[70%]"
                    placeholder="Select a query"
                    selectedKeys={[value]}
                    variant="bordered"
                    onChange={handleSelectionChange}
                >
                    {placeholderOptions.map((option) => (
                        <SelectItem key={option.key}>{option.label}</SelectItem>
                    ))}
                </Select>

                <button
                    onClick={handleSubmit}
                    className="w-fit max-w-[30%] bg-purple-500 text-white p-1 px-3 rounded-lg transition-colors flex items-center gap-2"
                    disabled={aiTyping}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default ChatbotDemo;
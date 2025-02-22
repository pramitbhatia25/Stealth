import { useState, useEffect } from "react";
import {
    ResponsiveContainer,
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

function HistoricalChart() {
    const [historicalData, setHistoricalData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistoricalData = async () => {
            try {
                const response = await fetch(
                    "https://stock-data-1032123744845.us-central1.run.app/get-full-history/BTC-USD"
                );
                const data = await response.json();
                // Transform the data for Recharts
                const transformedData = data.history.map((item) => ({
                    date: new Date(item.datetime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                    }),
                    price: item.price,
                    volume: item.volume,
                }));
                const prices = transformedData.map(d => d.price);
                const minPrice = Math.min(...prices);
                const maxPrice = Math.max(...prices);

                setHistoricalData({
                    ...data,
                    history: transformedData,
                    minPrice,
                    maxPrice,
                });
            } catch (err) {
                setError("Failed to fetch historical data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchHistoricalData();
    }, []);

    if (loading)
        return (
            <div className="flex items-center justify-center h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            </div>
        );

    if (error)
        return (
            <div className="flex items-center justify-center h-[400px] text-red-500">
                {error}
            </div>
        );

    if (!historicalData) return null;

    const formatCurrency = (value) => {
        return `$${value.toLocaleString()}`;
    };

    const formatVolume = (value) => {
        return value.toLocaleString();
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 border rounded-lg shadow-lg">
                    <p className="text-sm font-semibold mb-2">{label}</p>
                    {payload.map((entry, index) => (
                        <p
                            key={index}
                            className={`text-sm ${entry.dataKey === "price" ? "text-purple-600" : "text-blue-600"
                                }`}
                        >
                            {entry.name}: {entry.dataKey === "price" ? formatCurrency(entry.value) : formatVolume(entry.value)}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="mb-4">
                <h2 className="text-xl font-bold">Bitcoin Historical Data</h2>
                <p className="text-sm text-gray-500">
                    Total data points: {historicalData.count}
                </p>
            </div>

            {/* Price Chart */}
            <div className="h-[300px] mb-8">
                <h3 className="text-lg font-semibold">Price History</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        data={historicalData.history}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis
                            domain={[historicalData.minPrice, historicalData.maxPrice]} // Set scale dynamically
                            tickFormatter={formatCurrency}
                            tick={{ fontSize: 12 }}
                            label={{
                                value: "Price (USD)",
                                angle: -90,
                                position: "insideLeft",
                                style: { textAnchor: "middle" },
                            }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="price"
                            name="Price"
                            stroke="#a754f5"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4 }}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            {/* Volume Chart */}
            <div className="h-[300px]">
                <h3 className="text-lg font-semibold">Volume History</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        data={historicalData.history}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis
                            tickFormatter={formatVolume}
                            tick={{ fontSize: 12 }}
                            label={{
                                value: "Volume",
                                angle: -90,
                                position: "insideLeft",
                                style: { textAnchor: "middle" },
                            }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar
                            dataKey="volume"
                            name="Volume"
                            fill="#3b82f6"
                            opacity={0.3}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default HistoricalChart;

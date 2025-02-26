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

function HistoricalChart({ symbol }) {
    const [historicalData, setHistoricalData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistoricalData = async () => {
            try {
                const response = await fetch(
                    `https://stock-data-1032123744845.us-central1.run.app/get-full-history/${symbol}`
                );
                const data = await response.json();
                // Transform data for Recharts
                const transformedData = data.history.map((item) => ({
                    date: new Date(new Date(item.datetime).getTime() - (5 * 60 * 60 * 1000)).toLocaleTimeString([], {
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
    }, [symbol]);

    if (loading)
        return (
            <div className="flex items-center justify-center h-[200px] md:h-[300px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            </div>
        );

    if (error)
        return (
            <div className="flex items-center justify-center h-[200px] md:h-[300px] text-red-500">
                {error}
            </div>
        );

    if (!historicalData) return null;

    const formatCurrency = (value) => `$${value.toLocaleString()}`;
    const formatVolume = (value) => value.toLocaleString();

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 border rounded-lg shadow-lg">
                    <p className="text-sm font-semibold mb-2">{label}</p>
                    {payload.map((entry, index) => (
                        <p
                            key={index}
                            className={`text-sm ${entry.dataKey === "price" ? "text-purple-600" : "text-blue-600"}`}
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
        <div className="bg-white p-4">
            <h2 className="text-lg font-semibold">Historical Data</h2>

            <div className="h-[200px] md:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                        data={historicalData.history}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis
                            yAxisId="left"
                            domain={[historicalData.minPrice, historicalData.maxPrice]}
                            tickFormatter={formatCurrency}
                            tick={{ fontSize: 12 }}
                            label={{
                                angle: -90,
                                position: "insideLeft",
                                style: { textAnchor: "middle" },
                            }}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            tickFormatter={formatVolume}
                            tick={{ fontSize: 12 }}
                            label={{
                                angle: 90,
                                position: "insideRight",
                                style: { textAnchor: "middle" },
                            }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar
                            yAxisId="right"
                            dataKey="volume"
                            name="Volume"
                            fill="#3b82f6"
                            opacity={0.3}
                        />
                        <Line
                            yAxisId="left"
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
        </div>
    );
}

export default HistoricalChart;

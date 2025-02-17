import React, { useState } from "react";
import axios from "axios";
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ScatterChart, Scatter,
    XAxis, YAxis, Tooltip, CartesianGrid, Legend
} from "recharts";

const CHART_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AIChart = () => {
    const [query, setQuery] = useState("");
    const [chartData, setChartData] = useState([]);
    const [chartType, setChartType] = useState(""); // Stores the AI's suggested chart type

    const fetchChartData = async () => {
        try {
            const aiResponse = {
                "sql": "SELECT month, SUM(revenue) AS value FROM sales_data GROUP BY month;",
                "chartType": "line"
            }

            // const response = await axios.post("http://localhost:5000/query", { sql: aiResponse.sql });
            setChartData([
                { "month": "Jan", "value": 5000 },
                { "month": "Feb", "value": 7000 },
                { "month": "Mar", "value": 6500 }
            ]
            );
            setChartType(aiResponse.chartType); // AI decides chart type
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const renderChart = () => {
        switch (chartType) {
            case "line":
                return (
                    <LineChart width={600} height={300} data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    </LineChart>
                );

            case "bar":
                return (
                    <BarChart width={600} height={300} data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#82ca9d" />
                    </BarChart>
                );

            case "pie":
                return (
                    <PieChart width={400} height={400}>
                        <Pie data={chartData} dataKey="value" nameKey="category" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                            {chartData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                );

            case "scatter":
                return (
                    <ScatterChart width={600} height={300}>
                        <CartesianGrid />
                        <XAxis type="number" dataKey="x" name="X" />
                        <YAxis type="number" dataKey="y" name="Y" />
                        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                        <Scatter name="Data Points" data={chartData} fill="#8884d8" />
                    </ScatterChart>
                );

            default:
                return <p>No chart available. Enter a query to generate a visualization.</p>;
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter your query..."
            />
            <button onClick={fetchChartData}>Generate Chart</button>
            {chartData.length > 0 && renderChart()}
        </div>
    );
};

export default AIChart;

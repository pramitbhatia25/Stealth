import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CryptoChart = () => {
  const [data, setData] = useState([]);

  // Parse the CSV file
  useEffect(() => {
    Papa.parse('cryptoprediction.csv', {
      download: true,
      header: true,
      complete: (result) => {
        // Transform data into usable format
        const formattedData = result.data.map(item => ({
          date: item.date,
          open: parseFloat(item.open),
          high: parseFloat(item.high),
          low: parseFloat(item.low),
          close: parseFloat(item.close),
          volume: parseFloat(item.volume),
          marketCap: parseFloat(item.marketCap),
          crypto_name: item.crypto_name,
        }));
        setData(formattedData);
      },
    });
  }, []);

  // Filter data by coin
  const filterDataByCoin = (coin) => data.filter(item => item.crypto_name === coin);

  return (
    <div>
      <h2>Crypto Predictions</h2>
      
      {/* Bitcoin Chart */}
      <h3>Bitcoin</h3>
      <ResponsiveContainer width="80%" height={300}>
        <LineChart data={filterDataByCoin("Bitcoin")}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="close" stroke="#8884d8" name="Bitcoin Close" />
        </LineChart>
      </ResponsiveContainer>
      
      {/* Litecoin Chart */}
      <h3>Litecoin</h3>
      <ResponsiveContainer width="80%" height={300}>
        <LineChart data={filterDataByCoin("Litecoin")}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="close" stroke="#82ca9d" name="Litecoin Close" />
        </LineChart>
      </ResponsiveContainer>
      
      {/* XRP Chart */}
      <h3>XRP</h3>
      <ResponsiveContainer width="80%" height={300}>
        <LineChart data={filterDataByCoin("Xrp")}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="close" stroke="#ffc658" name="XRP Close" />
        </LineChart>
      </ResponsiveContainer>
      
      {/* Dogecoin Chart */}
      <h3>Dogecoin</h3>
      <ResponsiveContainer width="80%" height={300}>
        <LineChart data={filterDataByCoin("Dogecoin")}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="close" stroke="#ff7300" name="Dogecoin Close" />
        </LineChart>
      </ResponsiveContainer>
      
      {/* Monero Chart */}
      <h3>Monero</h3>
      <ResponsiveContainer width="80%" height={300}>
        <LineChart data={filterDataByCoin("Monero")}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="close" stroke="#387908" name="Monero Close" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CryptoChart;

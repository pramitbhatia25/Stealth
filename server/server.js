// server.js
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const APIResponse = z.object({
  text: z.string(),
  graph: z.array(
    z.object({
      graph_type: z.string(),
      symbol: z.string(),
    })
  ),
});

// Endpoint to generate chat completions
app.post('/analyze', async (req, res) => {
  console.log("REceivied requ")
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  // Define the context for the AI to use
  const context = `
    You are a helpful Stock Analyst AI. Based on the given prompt, return a JSON response with the following structure:
    {
      "text": "Response to the query",
      "graph": [{"graph_type", "symbol"}, {"graph_type", "symbol"}],
    }
    Here are the components and symbols that you can use:

    Components:
    SymbolInfo: A symbol info component with default props (colorTheme: "light", autosize: true)
    AdvancedRealTimeChart: A real-time stock chart with default props (symbol, theme: "light", height: 500)
    CryptoCurrencyMarket: A cryptocurrency market chart with default props (colorTheme: "light", width: "100%")
    TickerTape: A ticker tape with default props (colorTheme: "light")
    Timeline: A component showing news stories about given symbol. (colorTheme: "light")
    StockHeatmap: A component showing a stock heatmap representing all stocks.
    ForexCrossRates: A component showing a grpah of all Forex currencies and their cross rates to other currencies.
    CryptoCoinsHeatmap: A component showing a heatmap only for crypto currencies.

    Symbols:
    ["BTCUSD", "ETHUSD", "XRPUSD", "LTCUSD", "DOGEUSD", "ADAUSD"]

    Example Input:
    Hi! What's up!
    Example Output:
    {
      text: "Good Morning! How can I help you today? 🙂",
      graph: [],
    }

    Example Input:
    Tell me how's BTC doing today?
    Example Output:
    {
      text: "Sure, I'll share a graph about Crypto Currency Market. From the current data, it looks like Bitcoin is performing well. Let me know if there is anything more I can help with!",
      graph: [{"SymbolInfo", "BTCUSD"}, {"AdvancedRealTimeChart", "BTCUSD"}],
    }

    If the user asks in general about a cryptocurrency, return SymbolInfo as the graph with that symbol.
  `;

  console.log("Tryinh")

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      response_format: "json",
      messages: [
        { role: 'system', content: context },
        { role: 'user', content: prompt },
      ],
      response_format: zodResponseFormat(APIResponse, "apiresponse"),
    });

    const responseContent = completion.choices[0].message.content;

    try {
      // Try to parse the AI response as JSON

      const responseJson = JSON.parse(responseContent);
      console.log("Googd")
      console.log(responseJson)
      res.status(200).json(responseJson);
    } catch (jsonError) {
      console.error('Error parsing response as JSON:', jsonError);
      console.log(responseContent)
      res.status(500).json({ error: 'Failed to parse the response as JSON' });
    }
  } catch (error) {
    console.error('Error generating completion:', error);
    console.log(responseContent)
    res.status(500).json({ error: 'Failed to generate completion' });
  }

  console.log("Bye")
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

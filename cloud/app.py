import yfinance as yf
import pandas as pd
from datetime import datetime
from flask import Flask, request, jsonify
import os
from flask_cors import CORS
from google.cloud import bigquery
from google.oauth2 import service_account
import json
from pydantic import BaseModel, ValidationError
from typing import List
from openai import OpenAI
import requests
from pinecone import Pinecone

pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
openai = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
app = Flask(__name__)
TABLE_ID = os.environ.get("TABLE_ID")
TABLE_NEWS_ID = os.environ.get("TABLE_NEWS_ID")
PROJECT_ID = os.environ.get("PROJECT_ID")
SERVICE_ACCOUNT = os.environ.get("SERVICE_ACCOUNT")
ALPHAVANTAGE_API_KEY=os.environ.get("ALPHAVANTAGE_API_KEY")
app = Flask(__name__)
CORS(app)

index = pc.Index("news-data-embeddings")

class GraphItem(BaseModel):
    graph_type: str
    symbol: str

class LLMAPIResponse(BaseModel):
    text: str
    graph: List[GraphItem]


def fetch_current_crypto_data(tickers):
    data_list = []
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    for ticker in tickers:
        try:
            stock = yf.Ticker(ticker)
            data = stock.history(period="1d").iloc[-1]  # Get the latest row
            data_dict = {
                "Ticker": ticker,
                "Datetime": timestamp,
                "CurrentPrice": float(data["Close"]),
                "Open": float(data["Open"]),
                "High": float(data["High"]),
                "Low": float(data["Low"]),
                "Volume": float(data["Volume"])
            }
            data_list.append(data_dict)
        except Exception as e:
            print(f"Error fetching data for {ticker}: {e}")
    
    df = pd.DataFrame(data_list)
    
    # Explicitly convert the types to ensure compatibility with BigQuery
    df["CurrentPrice"] = df["CurrentPrice"].astype("float32")
    df["Open"] = df["Open"].astype("float32")
    df["High"] = df["High"].astype("float32")
    df["Low"] = df["Low"].astype("float32")
    df["Volume"] = df["Volume"].astype("float32")
    
    # Convert 'Datetime' column to string in the format BigQuery expects
    df["Datetime"] = pd.to_datetime(df["Datetime"]).dt.strftime('%Y-%m-%d %H:%M:%S')
    
    return df


def fetch_current_crypto_news(tickers):
    all_data = []

    for crypto in tickers:
        try:
            url = f"https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=CRYPTO:{crypto}&apikey={ALPHAVANTAGE_API_KEY}"
            response = requests.get(url)
            response.raise_for_status()  # Raise an error for bad responses
            data = response.json()
            
            if "feed" in data:
                for article in data["feed"]:
                    news_data = {
                        "url": article.get("url", "No data"),
                        "title": article.get("title", "No data"),
                        "summary": article.get("summary", "No data"),
                        "time_published": article.get("time_published", "No data"),
                        "sentiment_score": article.get("overall_sentiment_score", "No data"),
                        "sentiment_label": article.get("overall_sentiment_label", "No data"),
                        "source": article.get("source", "No data"),
                        "ticker_sentiment_score": article.get("ticker_sentiment", [{}])[0].get("ticker_sentiment_score", "No data"),
                        "ticker_sentiment_label": article.get("ticker_sentiment", [{}])[0].get("ticker_sentiment_label", "No data")
                    }
                    all_data.append(news_data)
        except requests.exceptions.RequestException as e:
            print(f"Error fetching data for {crypto}: {e}")
        except Exception as e:
            print(f"Unexpected error: {e}")
        
    df = pd.DataFrame(all_data)
    print(df.head())
    
    # Explicitly convert the types to ensure compatibility with BigQuery
    df["time_published"] = pd.to_datetime(df["time_published"]).dt.strftime('%Y-%m-%d %H:%M:%S')
    df["sentiment_score"] = df["sentiment_score"].astype("float32")
    df["ticker_sentiment_score"] = df["ticker_sentiment_score"].astype("float32")
        
    print(df.head())
    return df


def check_or_create_table_news(client, table_id, df):
    try:
        # Check if the table exists
        client.get_table(table_id)
        print(f"Table {table_id} already exists.")
    except Exception:
        print(f"Table {table_id} does not exist. Creating a new table.")

        # Define schema based on the DataFrame columns
        schema = []
        for col in df.columns:
            dtype = df[col].dtype

            if dtype == "float32" or dtype == "float64":
                schema.append(bigquery.SchemaField(col, "FLOAT"))
            elif dtype == "datetime64[ns]":
                schema.append(bigquery.SchemaField(col, "DATETIME"))
            elif dtype == "object":  # Strings are usually detected as 'object'
                schema.append(bigquery.SchemaField(col, "STRING"))
            else:
                # In case of other types, you can add more conditions as necessary
                schema.append(bigquery.SchemaField(col, "STRING"))

        # Create the table with schema
        table = bigquery.Table(table_id, schema=schema)
        client.create_table(table)
        print(f"Table {table_id} created successfully.")


def check_or_create_table(client, table_id, df):
    try:
        # Check if the table exists
        client.get_table(table_id)
        print(f"Table {table_id} already exists.")
    except Exception:
        print(f"Table {table_id} does not exist. Creating a new table.")

        # Define schema based on the DataFrame columns
        schema = []
        for col in df.columns:
            dtype = df[col].dtype

            if dtype == "float32" or dtype == "float64":
                schema.append(bigquery.SchemaField(col, "FLOAT"))
            elif dtype == "datetime64[ns]":
                schema.append(bigquery.SchemaField(col, "DATETIME"))
            elif dtype == "object":  # Strings are usually detected as 'object'
                schema.append(bigquery.SchemaField(col, "STRING"))
            else:
                # In case of other types, you can add more conditions as necessary
                schema.append(bigquery.SchemaField(col, "STRING"))

        # Create the table with schema
        table = bigquery.Table(table_id, schema=schema)
        client.create_table(table)
        print(f"Table {table_id} created successfully.")


def parse_and_upload_data_to_bq(df, TABLE_ID):
    try:
        print("Data ready for BigQuery upload")

        # Load credentials from JSON string
        credentials = service_account.Credentials.from_service_account_info(json.loads(SERVICE_ACCOUNT))
        
        # Initialize BigQuery client
        client = bigquery.Client(credentials=credentials, project=PROJECT_ID)

        # Configure job for uploading data
        job_config = bigquery.LoadJobConfig(
            write_disposition=bigquery.WriteDisposition.WRITE_APPEND,
            autodetect=True
        )

        check_or_create_table(client, TABLE_ID, df)

        # Upload the DataFrame
        load_job = client.load_table_from_dataframe(
            df,
            TABLE_ID,
            job_config=job_config
        )

        # Wait for the load job to complete
        load_job.result()

        print(f"DataFrame uploaded to {PROJECT_ID}:{TABLE_ID}")

    except Exception as e:
        print(f"Error while processing data for BigQuery upload: {e}")


def get_existing_news_urls(table_id):
    """Query BigQuery for existing news article URLs."""
    credentials = service_account.Credentials.from_service_account_info(json.loads(SERVICE_ACCOUNT))
    client = bigquery.Client(credentials=credentials, project=PROJECT_ID)
    
    query = f"SELECT DISTINCT url FROM `{table_id}`"
    
    query_job = client.query(query)
    result = query_job.result()
    
    existing_urls = {row.url for row in result}
    return existing_urls


@app.route("/fetch-crypto-data", methods=["GET"])
def get_crypto_data():

    symbols = [
        "AAPL", "NVDA", "MSFT", "AMZN", "GOOG", "META", "TSLA", "AVGO", "LLY",
        "WMT", "JPM", "V", "XOM", "MA", "UNH", "HD", "PG", "CVX", "KO",
        "PEP", "MRK", "ABBV", "PFE", "BAC", "CSCO", "ACN", "NFLX", "INTC", "CMCSA",
        "T", "VZ", "ADBE", "CRM", "NKE", "ORCL", "ABT", "MCD", "DHR", "WFC",
        "MDT", "BMY", "TXN", "NEE", "PM", "LIN", "HON", "QCOM", "COST", "AMGN",
        "BTC-USD", "ETH-USD", "BNB-USD", "XRP-USD", "ADA-USD", "SOL-USD", "DOGE-USD", "DOT-USD", "MATIC-USD", "LTC-USD",
        "BCH-USD", "LINK-USD", "XLM-USD", "UNI1-USD", "ATOM-USD", "ALGO-USD", "VET-USD", "ICP-USD", "FIL-USD", "MANA-USD"
    ];


    
    
    data = fetch_current_crypto_data(symbols)
    parse_and_upload_data_to_bq(data, TABLE_ID)

    return jsonify(data.to_dict(orient="records"))


@app.route("/fetch-crypto-news", methods=["GET"])
def get_crypto_news():
    cryptos = ["BTC", "ETH", "BNB", "XRP", "ADA", "SOL", "DOGE", "DOT", "MATIC", "LTC", 
               "BCH", "LINK", "XLM", "UNI", "ATOM", "ALGO", "VET", "ICP", "FIL", "MANA"]
    
    # Fetch new crypto news data
    new_data = fetch_current_crypto_news(tickers=cryptos)
    
    # Get existing URLs from BigQuery
    existing_urls = get_existing_news_urls(TABLE_NEWS_ID)

    # Filter out articles with URLs that already exist
    new_data_filtered = [entry for entry in new_data if entry["url"] not in existing_urls]
    
    # If there are new unique articles, upload to BigQuery
    if new_data_filtered:
        try:
            df = pd.DataFrame(new_data_filtered)
            parse_and_upload_data_to_bq(df, TABLE_NEWS_ID)            
            print(f"Saved {len(new_data_filtered)} new articles.")
        except Exception as e:
            print(f"Error saving data to BigQuery: {e}")
    else:
        print("No new unique articles to save.")

    return jsonify(df.to_dict(orient="records")) if not df.empty else jsonify([])


def get_price_from_bq(symbol):
    try:
        # Load credentials from JSON string
        credentials = service_account.Credentials.from_service_account_info(json.loads(SERVICE_ACCOUNT))
        client = bigquery.Client(credentials=credentials, project=PROJECT_ID)
        
        query = f'''
            SELECT CurrentPrice, Datetime 
            FROM `{TABLE_ID}`
            WHERE Ticker = "{symbol}"
            ORDER BY Datetime DESC
            LIMIT 1
        '''
        
        query_job = client.query(query)
        result = query_job.result()
        
        row = list(result)[0] if result.total_rows > 0 else None
        if row:
            return {"Ticker": symbol, "CurrentPrice": row.CurrentPrice, "Datetime": row.Datetime}
        else:
            return {"error": "No data found for symbol"}
    except Exception as e:
        return {"error": str(e)}


@app.route("/get-price/<symbol>", methods=["GET"])
def get_price(symbol):
    result = get_price_from_bq(symbol)
    return jsonify(result)


@app.route("/get-full-history/<symbol>", methods=["GET"])
def get_full_history(symbol):
    try:
        credentials = service_account.Credentials.from_service_account_info(json.loads(SERVICE_ACCOUNT))
        client = bigquery.Client(credentials=credentials, project=PROJECT_ID)
        
        query = f"""
            SELECT 
                Datetime,
                CurrentPrice,
                Open,
                High,
                Low,
                Volume
            FROM `{TABLE_ID}`
            WHERE Ticker = '{symbol}'
            ORDER BY Datetime ASC;
        """
        
        query_job = client.query(query)
        result = query_job.result()
        
        history = [{
            "datetime": row.Datetime,
            "price": row.CurrentPrice,
            "open": row.Open,
            "high": row.High,
            "low": row.Low,
            "volume": row.Volume
        } for row in result]
        
        return jsonify({
            "symbol": symbol,
            "history": history,
            "count": len(history)
        })
        
    except Exception as e:
        return jsonify({
            "error": f"Failed to fetch history for {symbol}",
            "details": str(e)
        }), 500


def get_all_latest_prices():
    credentials = service_account.Credentials.from_service_account_info(json.loads(SERVICE_ACCOUNT))
    client = bigquery.Client(credentials=credentials, project=PROJECT_ID)
    
    query = f"""
        SELECT Ticker, CurrentPrice, Datetime, Open, High, Low, Volume
        FROM `{TABLE_ID}`
        QUALIFY ROW_NUMBER() OVER (PARTITION BY Ticker ORDER BY Datetime DESC) = 1;
    """
    
    query_job = client.query(query)
    result = query_job.result()
    
    # Create a list of dictionaries containing all the fields
    prices = [
        {
            "Ticker": row.Ticker,
            "CurrentPrice": row.CurrentPrice,
            "Datetime": row.Datetime,
            "Open": row.Open,
            "High": row.High,
            "Low": row.Low,
            "Volume": row.Volume
        }
        for row in result
    ]

    return prices


@app.route("/get-latest-prices", methods=["GET"])
def get_latest_prices():
    prices = get_all_latest_prices()
    return jsonify(prices)


@app.route("/get-news/<symbol>", methods=["GET"])
def get_news(symbol):
    # Load credentials and create BigQuery client
    credentials = service_account.Credentials.from_service_account_info(json.loads(SERVICE_ACCOUNT))
    client = bigquery.Client(credentials=credentials, project=PROJECT_ID)
    
    # Define the query using the symbol as the search query
    query = f"""
        SELECT 
            url, 
            title, 
            time_published, 
            sentiment_score, 
            sentiment_label, 
            source, 
            ticker_sentiment_score, 
            ticker_sentiment_label
        FROM `{TABLE_NEWS_ID}`
        WHERE 
            LOWER(url) LIKE LOWER('%{symbol}%')
            OR LOWER(title) LIKE LOWER('%{symbol}%')
        LIMIT 10
    """
    
    # Execute the query and retrieve results
    query_job = client.query(query)
    result = query_job.result()
    
    # Convert the result into a list of dictionaries
    news_list = [dict(row) for row in result]

    # Return the results as JSON
    return jsonify(news_list)


@app.route("/get-price-history/<symbol>", methods=["GET"])
def get_price_history(symbol):
    credentials = service_account.Credentials.from_service_account_info(json.loads(SERVICE_ACCOUNT))
    client = bigquery.Client(credentials=credentials, project=PROJECT_ID)
    query = f"""
        SELECT Datetime, CurrentPrice FROM `{TABLE_ID}`
        WHERE Ticker = '{symbol}'
        ORDER BY Datetime DESC;
    """
    query_job = client.query(query)
    result = query_job.result()
    history = [{"Datetime": row.Datetime, "CurrentPrice": row.CurrentPrice} for row in result]
    return jsonify({"symbol": symbol, "history": history})


def retrieve_documents(query, top_k=5):
    try:
        # Generate query embedding
        query_embedding = openai.embeddings.create(
            input=query,
            model="text-embedding-ada-002"
        ).data[0].embedding

        # Query Pinecone
        query_response = index.query(
            vector=query_embedding,
            top_k=top_k,
            include_metadata=True
        )

        # Extract relevant documents
        documents = []
        for match in query_response["matches"]:
            documents.append({
                "news_title": match["metadata"].get("title", "N/A"),
                "news_url": match["metadata"].get("url", "N/A"),
                "news_source": match["metadata"].get("source", "N/A"),
                "news_ticker_sentiment_label": match["metadata"].get("ticker_sentiment_label", "N/A"),
                "news_ticker_sentiment_score": match["metadata"].get("ticker_sentiment_score", "N/A"),
                "news_time_published": match["metadata"].get("time_published", "N/A"),
                "news_sentiment_label": match["metadata"].get("sentiment_label", "N/A"),
                "news_sentiment_score": match["metadata"].get("sentiment_score", "N/A")
            })
        
        return documents
    except Exception as e:
        print(f"Error retrieving documents: {str(e)}")
        return []


@app.route('/news_summary/<symbol>', methods=['POST'])
def news_summary(symbol):
    print("Received Request")
    
    # Parse request JSON
    data = request.get_json()
    prompt = data.get("prompt")
    price_context = get_all_latest_prices()
    print(price_context)

    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400

    # Step 1: Retrieve relevant documents
    documents = retrieve_documents(prompt)
    print(f"Retrieved {len(documents)} documents.")

    news_context = "\n\n".join([
        f"""News Information:
        - Title: {doc['news_title']}
        - URL: {doc['news_url']}
        - Source: {doc['news_source']}
        - Ticker Sentiment Label: {doc['news_ticker_sentiment_label']}
        - Ticker Sentiment Score: {doc['news_ticker_sentiment_score']}  
        - Time Published: {doc['news_time_published']}
        - Sentiment Label: {doc['news_sentiment_label']}
        - Sentiment Score: {doc['news_sentiment_score']}"""
        for doc in documents
    ])


    # Define system context
    context = f"""
    You are a Crypto News Summarizer. Based on the given prompt and context and your knowledge, return a JSON response with the following structure:
    {{
      "text": "Summary of the most recent crypto news for this symbol: {symbol}",
    }}

    Here is the current live price context:
    ${price_context}

    Here are the latest news events that you can cite:
    ${news_context}

    Your response should not contain bolded or highlighted words. Write plain text summary. Keep the summary to 100 words and cite specific news articles and current live prices.
    """

    print("Fetching Data")

    try:
        completion = openai.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": context},
                {"role": "user", "content": prompt},
            ]
        )

        response_content = completion.choices[0].message.content
        
        # Parse the response content as JSON
        parsed_response = json.loads(response_content)
        return jsonify(parsed_response), 200  # Return the parsed JSON response

    except Exception as error:
        print("Error generating completion:", error)
        return jsonify({"error": "Failed to generate completion", "text": ""}), 500


@app.route('/chat', methods=['POST'])
def chat():
    print("Received Request")
    
    # Parse request JSON
    data = request.get_json()
    prompt = data.get("prompt")
    price_context = get_all_latest_prices()
    print(price_context)

    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400

    # Step 1: Retrieve relevant documents
    documents = retrieve_documents(prompt)
    print(f"Retrieved {len(documents)} documents.")

    news_context = "\n\n".join([
        f"""News Information:
        - Title: {doc['news_title']}
        - URL: {doc['news_url']}
        - Source: {doc['news_source']}
        - Ticker Sentiment Label: {doc['news_ticker_sentiment_label']}
        - Ticker Sentiment Score: {doc['news_ticker_sentiment_score']}  
        - Time Published: {doc['news_time_published']}
        - Sentiment Label: {doc['news_sentiment_label']}
        - Sentiment Score: {doc['news_sentiment_score']}"""
        for doc in documents
    ])


    # Define system context
    context = f"""
    You are a helpful Crypto Analyst AI. Based on the given prompt and context and your knowledge, return a JSON response with the following structure:
    {{
      "text": "Response to the query",
      "graph": [{{"graph_type", "symbol"}}, {{"graph_type", "symbol"}}],
    }}
    Here are the components and symbols that you can use:

    Components:
    SymbolInfo: A symbol info component with default props (colorTheme: "light", autosize: true)
    AdvancedRealTimeChart: A real-time stock chart with default props (symbol, theme: "light", height: 500)
    CryptoCurrencyMarket: A cryptocurrency market chart with default props (colorTheme: "light", width: "100%")
    TickerTape: A ticker tape with default props (colorTheme: "light")
    Timeline: A component showing news stories about given symbol. (colorTheme: "light")
    ForexCrossRates: A component showing a graph of all Forex currencies and their cross rates to other currencies.
    CryptoCoinsHeatmap: A component showing a heatmap only for crypto currencies.

    Symbols:

    ["BTCUSD", "ETHUSD", "BNBUSD", "XRPUSD", "ADAUSD", "SOLUSD", "DOGEUSD", "DOTUSD", "MATICUSD","LTCUSD", 
    "BCHUSD", "LINKUSD", "XLMUSD", "UNIUSD", "ATOMUSD", "ALGOUSD", "VETUSD", "ICPUSD", "FILUSD", "MANAUSD"]

    Example Input:
    Hi! What's up!
    Example Output:
    {{
      "text": "Good Morning! How can I help you today? 🙂",
      "graph": []
    }}

    Example Input:
    Tell me how's BTC doing today?
    Example Output:
    {{
      "text": "Bitcoin looks to be at $96000 according to my context. For real time information, I'll share a graph about Crypto Currency Market. Let me know if there is anything more I can help with!",
      "graph": [{{"graph_type": "SymbolInfo", "symbol": "BTCUSD"}}, {{"graph_type": "AdvancedRealTimeChart", "symbol": "BTCUSD"}}]
    }}

    If the user asks in general about a cryptocurrency, return SymbolInfo as the graph with that symbol.

    Here is the current live price context:
    ${price_context}

    Here are the latest news events that you can cite:
    ${news_context}

    Always use the price context to answer the user's question. Try to include 200 words in your response. Include the price of the symbol in your response.
    Also, try to cite news specific to that cryptocurrency to answer user's queries, if the user asks for it.
    If users ask for overview, provide a comprehensive overview citing news sources, showing important graphs and current price data that you have.
    """

    print("Fetching Data")

    try:
        # Call OpenAI API
        completion = openai.beta.chat.completions.parse(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": context},
                {"role": "user", "content": prompt},
            ],
            response_format=LLMAPIResponse,
        )

        response_content = completion.choices[0].message.content

        try:
            # Parse AI response as JSON
            response_json = json.loads(response_content)

            # Validate response with Pydantic
            validated_response = LLMAPIResponse(**response_json)

            print("Got response")
            print(validated_response.dict())

            return jsonify(validated_response.dict()), 200

        except (json.JSONDecodeError, ValidationError) as json_error:
            print("Error parsing response as JSON:", json_error)
            return jsonify({"error": "Failed to parse the response as JSON"}), 500

    except Exception as error:
        print("Error generating completion:", error)
        return jsonify({"error": "Failed to generate completion"}), 500

    print("Completed")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)




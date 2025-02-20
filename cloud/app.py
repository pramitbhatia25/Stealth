import yfinance as yf
import pandas as pd
from datetime import datetime
from flask import Flask, jsonify
import os
from google.cloud import bigquery
from google.oauth2 import service_account
import json

app = Flask(__name__)
TABLE_ID = os.environ.get("TABLE_ID")
PROJECT_ID = os.environ.get("PROJECT_ID")
SERVICE_ACCOUNT = os.environ.get("SERVICE_ACCOUNT")


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


@app.route("/fetch-crypto-data", methods=["GET"])
def get_crypto_data():
    crypto_symbols = [
        "BTC-USD", "ETH-USD", "BNB-USD", "XRP-USD", "ADA-USD", "SOL-USD", "DOGE-USD", "DOT-USD", "MATIC-USD", "LTC-USD",
        "BCH-USD", "LINK-USD", "XLM-USD", "UNI-USD", "ATOM-USD", "ALGO-USD", "VET-USD", "ICP-USD", "FIL-USD", "MANA-USD"
    ]
    crypto_data = fetch_current_crypto_data(crypto_symbols)
    parse_and_upload_data_to_bq(crypto_data, TABLE_ID)
    return jsonify(crypto_data.to_dict(orient="records"))


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


@app.route("/get-all-prices", methods=["GET"])
def get_all_prices():
    credentials = service_account.Credentials.from_service_account_info(json.loads(SERVICE_ACCOUNT))
    client = bigquery.Client(credentials=credentials, project=PROJECT_ID)
    query = f"""
        SELECT Ticker, CurrentPrice FROM `{TABLE_ID}`
        ORDER BY Datetime DESC;
    """
    query_job = client.query(query)
    result = query_job.result()
    prices = {row.Ticker: row.CurrentPrice for row in result}
    return jsonify(prices)


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


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)




from pinecone import Pinecone, ServerlessSpec
from openai import OpenAI
import json

from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv('../.env')



with open('portfolio_data_with_embeddings.json', 'r') as file:
    portfolio_data_w_embedding = json.load(file)

# Initialize Pinecone client
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

# Initialize OpenAI client
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Create a serverless index
index_name = "portfolio-data-embeddings"

# Check if the index already exists
if index_name not in pc.list_indexes().names():
    # Create a new index
    pc.create_index(
        name=index_name,
        dimension=1536,  # OpenAI embeddings have 1536 dimensions
        metric="cosine",  # Use cosine similarity for search
        spec=ServerlessSpec(cloud='aws', region='us-east-1')  # Serverless configuration
    )

# Connect to the index
index = pc.Index(index_name)

for account in portfolio_data_w_embedding["accounts"]:
    for stock in account["stocks"]:
        vector = stock["embedding"]
        
        # Generate a unique ID for the vector
        # Example: Combine account number and ticker symbol
        unique_id = f"{account['account_number']}_{stock['ticker_symbol']}"
        
        # Convert the list of prices to a comma-separated string
        last_30_days_prices_str = ",".join(map(str, stock["last_30_days_prices"]))

        # Upsert your vector embedding(s)
        upsert_response = index.upsert(
            vectors=[
                {
                    "id": unique_id,  # Use the unique ID
                    "values": vector,  # Use the generated embedding vector
                    "metadata": { 
                        "stock_name": stock["stock_name"], 
                        "ticker_symbol": stock["ticker_symbol"],
                        "dividend_yield": stock["dividend_yield"],
                        "current_price": stock["current_price"],
                        "market_value": stock["market_value"],
                        "cost_basis": stock["cost_basis"],
                        "unrealized_gain_loss": stock["unrealized_gain_loss"],
                        "pe_ratio": stock["pe_ratio"],
                        "52_week_range": stock["52_week_range"],
                        "days_change": stock["days_change"],
                        "last_30_days_prices": last_30_days_prices_str,  # Store as a string
                        "shares_owned": stock["shares_owned"],
                        "account_number": account["account_number"],
                        "profile_name": portfolio_data_w_embedding["profile_name"]
                    }
                }
            ]
        )

        print("Upsert response:", upsert_response)
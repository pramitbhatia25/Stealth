from openai import OpenAI
import json

from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()



# Initialize the OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))  

# Step 1: Open the JSON file
with open('portfolio_data.json', 'r') as file:
    # Step 2: Load the JSON data into a Python dictionary
    portfolio_data = json.load(file)

# Generate embeddings for each stock
for account in portfolio_data["accounts"]:
    for stock in account["stocks"]:
        # Create a text description for the stock
        description = (
            f"{stock['stock_name']} ({stock['ticker_symbol']}) is currently priced at {stock['current_price']}. "
            f"It has a market value of {stock['market_value']} and a dividend yield of {stock['dividend_yield']}. "
            f"It has a cost basis of {stock['cost_basis']} and an unrealized gain/loss of {stock['unrealized_gain_loss']}. "
            f"It has a P/E ratio of {stock['pe_ratio']} and a 52-week range of {stock['52_week_range']}. "
            f"It has a days change of {stock['days_change']} and a last 30 days prices of {stock['last_30_days_prices']}. "
            f"It has {stock['shares_owned']} shares owned and is in account {account['account_number']}. "
            f"The profile name is {portfolio_data['profile_name']}."
            f"The account number is {account['account_number']}."
        )

        # Generate embedding using the new API
        response = client.embeddings.create(
            input=description,
            model="text-embedding-ada-002"
        )
        # Correct way to access the embedding
        embedding = response.data[0].embedding

        # Add embedding to the stock data
        stock["embedding"] = embedding

# Print the updated portfolio data with embeddings
print(json.dumps(portfolio_data, indent=2))

# Save the updated portfolio data with embeddings to a new JSON file
with open('portfolio_data_with_embeddings.json', 'w') as file:
    json.dump(portfolio_data, file, indent=2)
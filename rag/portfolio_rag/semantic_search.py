from openai import OpenAI
import numpy as np
import json

from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv('../.env')



with open('portfolio_data_with_embeddings.json', 'r') as file:
    portfolio_data_w_embedding = json.load(file)

# Initialize the OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
# Function to calculate cosine similarity
def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# Example user query
user_query = "Which stock has the highest dividend yield?"

# Generate embedding for the user query
query_embedding = client.embeddings.create(
    input=user_query,
    model="text-embedding-ada-002"
).data[0].embedding

# Compare the query embedding with stock embeddings
best_match = None
best_similarity = -1

for account in portfolio_data_w_embedding["accounts"]:
    for stock in account["stocks"]:
        stock_embedding = stock["embedding"]
        similarity = cosine_similarity(query_embedding, stock_embedding)
        if similarity > best_similarity:
            best_similarity = similarity
            best_match = stock

# Print the best match
if best_match:
    print(f"Best match: {best_match['stock_name']} ({best_match['ticker_symbol']})")
    print(f"Dividend Yield: {best_match['dividend_yield']}")
else:
    print("No match found.")
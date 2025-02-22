import json
from pinecone import Pinecone, ServerlessSpec
from openai import OpenAI
import pandas as pd
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv('../.env')

# Initialize Pinecone client
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

# Initialize OpenAI client
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Pinecone index name
index_name = "news-data-embeddings"

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

# Debug: Check the type and value of the index
print(f"Index type: {type(index)}")
print(f"Index value: {index}")

# Read the CSV file
try:
    news_data = pd.read_csv('news_with_embeddings.csv')
    print("Successfully loaded news data")
except FileNotFoundError:
    print("Error: news_with_embeddings.csv file not found")
    exit(1)
except pd.errors.EmptyDataError:
    print("Error: news_with_embeddings.csv file is empty")
    exit(1)
except Exception as e:
    print(f"Error loading news_with_embeddings.csv: {str(e)}")
    exit(1)

# Convert embeddings from string to list of floats
news_data['embedding'] = news_data['embedding'].apply(lambda x: json.loads(x))

# Upsert data into Pinecone
for idx, row in news_data.iterrows():  # Use `idx` instead of `index` to avoid overwriting
    # Extract metadata
    metadata = {
        "url": row["url"],
        "title": row["title"],
        "time_published": row["time_published"],
        "sentiment_score": row["sentiment_score"],
        "sentiment_label": row["sentiment_label"],
        "source": row["source"],
        "ticker_sentiment_score": row["ticker_sentiment_score"],
        "ticker_sentiment_label": row["ticker_sentiment_label"]
    }

    # Generate a unique ID for the vector
    unique_id = f"news_{idx}"

    # Upsert the vector into Pinecone
    upsert_response = index.upsert(
        vectors=[
            {
                "id": unique_id,  # Unique ID for the vector
                "values": row["embedding"],  # Embedding vector
                "metadata": metadata  # Metadata
            }
        ]
    )

    print(f"Upserted vector {unique_id}: {upsert_response}")

print("All data has been uploaded to Pinecone.")
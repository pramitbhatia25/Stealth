# This file generates news data embeddings

from openai import OpenAI
import pandas as pd
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Initialize the OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Read the CSV file
try:
    news_data = pd.read_csv('news.csv')
    print("Successfully loaded news data")
except FileNotFoundError:
    print("Error: news.csv file not found")
    exit(1)
except pd.errors.EmptyDataError:
    print("Error: news.csv file is empty")
    exit(1)
except Exception as e:
    print(f"Error loading news.csv: {str(e)}")
    exit(1)

# Initialize the 'embedding' column
if 'embedding' not in news_data.columns:
    news_data['embedding'] = None

# Create embeddings for each news article
for index, row in news_data.iterrows():
    # Create a text description combining title, time, and sentiment
    description = (
        f"Title: {row['title']}. "
        f"Published on: {row['time_published']}. "
        f"The sentiment is {row['sentiment_label']}."
    )

    try:
        # Generate embedding using OpenAI API
        response = client.embeddings.create(
            input=description,
            model="text-embedding-ada-002"
        )
        embedding = response.data[0].embedding

        # Add embedding to the news data
        news_data.at[index, 'embedding'] = embedding  # Store as a list of floats
    except Exception as e:
        print(f"Error generating embedding for row {index}: {str(e)}")
        news_data.at[index, 'embedding'] = None  # Set embedding to None if there's an error

# Save the updated news data with embeddings to a new CSV file
try:
    news_data.to_csv('news_with_embeddings.csv', index=False)
    print("Successfully generated and saved embeddings for news data")
except Exception as e:
    print(f"Error saving news_with_embeddings.csv: {str(e)}")
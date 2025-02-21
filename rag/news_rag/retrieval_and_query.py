from pinecone import Pinecone
from openai import OpenAI
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv('../.env')

# Initialize Pinecone and OpenAI clients
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Connect to the Pinecone index
index = pc.Index("news-data-embeddings")

# Function to retrieve relevant documents
def retrieve_documents(query, top_k=5):
    try:
        # Generate query embedding
        query_embedding = openai_client.embeddings.create(
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
                "news_title": match["metadata"].get("title", "N/A"),  # Ensure keys match upsert metadata
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

# Function to generate a response using OpenAI
def generate_response(query, documents):
    try:
        # Format the retrieved documents as context
        context = "\n\n".join([
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

        # Combine the query and context
        prompt = f"""
        User Query: {query}

        Relevant Stocks:
        {context}

        Based on the above information, answer the user's query.
        """

        # Generate a response using OpenAI
        response = openai_client.chat.completions.create(
            model="gpt-3.5-turbo",  # Use GPT-3.5 if GPT-4 is not available
            messages=[
                {"role": "system", "content": "Don't "},
                {"role": "system", "content": "You are a helpful investment news reporter assistant."},
                {"role": "user", "content": prompt}
            ]
        )

        return response.choices[0].message.content
    except Exception as e:
        print(f"Error generating response: {str(e)}")
        return "Sorry, I couldn't generate a response. Please try again later."

# RAG pipeline
def rag_pipeline(query):
    # Step 1: Retrieve relevant documents
    documents = retrieve_documents(query)
    print(f"Retrieved {len(documents)} documents.")  # Debug statement

    # Step 2: Generate a response using OpenAI
    response = generate_response(query, documents)
    return response

# Example user query
user_query = "What is the latest news on Apple?"

# Get the response
response = rag_pipeline(user_query)
print("Response:", response)
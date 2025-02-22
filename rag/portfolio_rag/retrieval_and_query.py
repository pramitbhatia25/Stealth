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
index = pc.Index("portfolio-data-embeddings")

# Function to retrieve relevant documents
def retrieve_documents(query, top_k=5):
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
            "stock_name": match["metadata"]["stock_name"],
            "ticker_symbol": match["metadata"]["ticker_symbol"],
            "dividend_yield": match["metadata"].get("dividend_yield", "N/A"),
            "similarity_score": match["score"],
            "current_price": match["metadata"].get("current_price", "N/A"),
            "market_value": match["metadata"].get("market_value", "N/A"),
            "cost_basis": match["metadata"].get("cost_basis", "N/A"),
            "unrealized_gain_loss": match["metadata"].get("unrealized_gain_loss", "N/A"),
            "pe_ratio": match["metadata"].get("pe_ratio", "N/A"),
            "52_week_range": match["metadata"].get("52_week_range", "N/A"),
            "days_change": match["metadata"].get("days_change", "N/A"),
            "last_30_days_prices": match["metadata"].get("last_30_days_prices", "N/A"),
            "shares_owned": match["metadata"].get("shares_owned", "N/A"),
            "account_number": match["metadata"].get("account_number", "N/A"),
            "profile_name": match["metadata"].get("profile_name", "N/A")
        })
    
    return documents


    # Function to generate a response using OpenAI
def generate_response(query, documents):
    # Format the retrieved documents as context
    context = "\n\n".join([
        f"""Stock Information:
        - Name: {doc['stock_name']} ({doc['ticker_symbol']})
        - Dividend Yield: {doc['dividend_yield']}
        - Current Price: {doc['current_price']}
        - Market Value: {doc['market_value']}
        - Cost Basis: {doc['cost_basis']}
        - Unrealized Gain/Loss: {doc['unrealized_gain_loss']}
        - P/E Ratio: {doc['pe_ratio']}
        - 52-Week Range: {doc['52_week_range']}
        - Days Change: {doc['days_change']}
        - Last 30 Days Prices: {doc['last_30_days_prices']}
        - Shares Owned: {doc['shares_owned']}
        - Account Number: {doc['account_number']}
        - Profile Name: {doc['profile_name']}"""
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
        model="gpt-4",  # Use GPT-4 or GPT-3.5
        messages=[
            {"role": "system", "content": "You are a helpful investment assistant."},
            {"role": "user", "content": prompt}
        ]
    )

    return response.choices[0].message.content


def rag_pipeline(query):
    # Step 1: Retrieve relevant documents
    documents = retrieve_documents(query)
    # Step 2: Generate a response using OpenAI
    response = generate_response(query, documents)

    return response


    # Example user query
user_query = "How much my portfolio is worth?"

# Get the response
response = rag_pipeline(user_query)
print(response)
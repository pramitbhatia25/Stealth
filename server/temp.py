import requests

# Define the server URL and prompt
url = "https://stearn-backend.vercel.app/gen"
data = {
    "prompt": "Search the latest news about Cross-chain liquidity in crypto space. Focus more on BTC but you can cover matters about eth and solana if needed. Now create a concise X post that i could share to my followers. Make it in informal, friendly tone yet a professional undertone. Focus on cross-chain trends. Make it more human-like. Your content typically looks AI generated with all these emojis and hashtags. A good idea is to Cut the emojis and formatting Add a CTA to sign up on our website stearn.link. Also, remove all references, and make sure you get the latest of trends. i hope you know today's date. Make sure you stick to X's character limit of 240"
}

# Make the POST request
response = requests.post(url, json=data)

# Check the response
if response.status_code == 200:
    print("Response from server:", response.json())
    res = response.json()
else:
    print("Failed to fetch:", response.status_code, response.text)
    res = "Error!"

print("************************")
print(res['completion'])
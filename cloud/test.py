import yfinance as yf

print("S")
news = yf.Search("Bitcoin", news_count=10).news
print("T")

print(news)
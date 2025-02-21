# setup virtual environment
python3 -m venv myenv
source myenv/bin/activate (for windows use myenv\Scripts\activate)

# install the requirements
pip install -r requirements.txt

# run the retrieval and query -> type in question in teh function to run it.
python3 retrieval_and_query.py

# run the semantic search
python3 semantic_search.py






from flask import Flask, request, render_template
from elasticsearch import Elasticsearch
from sentence_transformers import SentenceTransformer
from typing import List

app = Flask(__name__) 
es_index = "pdf_documents"

try:
   es = Elasticsearch(
    "https://localhost:9200",
    basic_auth=["elastic","uxVFMV452qfPJkXeYlVW"],
    ca_certs="C:\\Users\\aonno\\Downloads\\elasticsearch-8.13.4-windows-x86_64\\elasticsearch-8.13.4\\config\\certs\\http_ca.crt"
    )

except ConnectionError as e:
    print("Connection Error:", e)
    
if es.ping():
    print("Succesfully connected to ElasticSearch!!")
else:
    print("Oops!! Can not connect to Elasticsearch!")

def search_with_highlights(input_keyword):
    
    vector_of_input_keyword = input_keyword
    print("searching...")
    print(vector_of_input_keyword)

    input_keywords = input_keyword.split(" ")

    should_clauses = [{"multi_match": {"query": keyword, "fields": ["content", "file_name", "location"]}} for keyword in input_keywords]

    body = {
        "query": {
            "bool": {
                "should": should_clauses
            }
        }
    }
    res = es.search(index=es_index, body=body)

    results = res["hits"]["hits"]

    return results

def highlight_text(content: str, keyword:str) -> str:
    highlighted_content = content.replace(keyword, f"<span style='background-color: yellow;'>{keyword}</span>")
    return highlighted_content

def get_context_around_keyword(text, keyword, window_size=50):
    words = text.split()
    for i, word in enumerate(words):
        if keyword.lower() in word.lower():
            start = max(i - window_size, 0)
            end = min(i + window_size + 1, len(words))
            context = " ".join(words[start:end])
            return context
    return None

@app.route("/", methods=["GET", "POST"])
def index():
    results = []
    if request.method == "POST":
        input_keyword = request.form["query"]
        if input_keyword:
            search_results = search_with_highlights(input_keyword)
            for result in search_results:
                highlighted_file_name = highlight_text(f"File Name: {result['_source']['file_name']}", input_keyword)
                highlighted_location = highlight_text(f"Location: {result['_source']['location']}", input_keyword)
                context = get_context_around_keyword(result['_source']['content'], input_keyword)
                highlighted_content = highlight_text(f"Content: {context}", input_keyword)
                results.append({
                    "highlighted_file_name": highlighted_file_name,
                    "highlighted_location": highlighted_location,
                    "highlighted_content": highlighted_content
                })

    return render_template("index.html", results=results)

if __name__ == "__main__":
    app.run(debug=True)
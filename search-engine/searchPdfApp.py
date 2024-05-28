import streamlit as st
from elasticsearch import Elasticsearch
from sentence_transformers import SentenceTransformer
from typing import List

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

    body = {
        "size" : 100, 
        "query": {
            "multi_match": {
                "query": input_keyword,
                "fields": ["content", "file_name","location"]
            }
        },
       }
    res = es.search(index=es_index, body=body)

    results = res["hits"]["hits"]

    return results

def highlight_text(content: str, keyword:str) -> str:
    highlighted_content = content.replace(keyword, f":orange[{keyword}]")
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

def main():
    st.title("PDF document search")

    
    # Input: User enters search query
    input_keyword = st.text_input("Enter your search query")

    # Button: User triggers the search
    if st.button("Search"):
        if input_keyword:
    
            results = search_with_highlights(str(input_keyword))
            st.write(f"Found {len(results)} results.")
            st.divider()
            for result in results:
                st.markdown(highlight_text(f"**File Name**: {result['_source']['file_name']}", input_keyword))
                st.markdown(highlight_text(f"**Location**: {result['_source']['location']}", input_keyword))
                st.markdown(highlight_text(f"**Context**: {get_context_around_keyword(result['_source']['content'],input_keyword)}", input_keyword))
                st.divider()
    else:
        st.write("Please enter a search query.")

                    
if __name__ == "__main__":
    main()

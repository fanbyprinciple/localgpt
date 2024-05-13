import gradio as gr
import fitz  # PyMuPDF
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.vectorstores import Chroma
import ollama

# Function to load, split, and retrieve documents from a PDF
def load_and_retrieve_docs_from_pdf(pdf_path):
    # Open the PDF file
    print("here")
    doc = fitz.open(pdf_path)
    
    # Extract text from each page
    full_text = "\n".join([page.get_text() for page in doc])
    doc.close()
    
    
    
    # Split the text into manageable chunks
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    splits = text_splitter.split_text(full_text)

   
    
    # Generate embeddings
    embeddings = OllamaEmbeddings(model="mistral")
    vectorstore = Chroma.from_documents(documents=[{"content": split} for split in splits], embedding=embeddings)
    
    return vectorstore.as_retriever()

# Function to format documents
def format_docs(docs):
    return "\n\n".join(doc['content'] for doc in docs)

pdf_path = "cybersec.pdf"  # Replace with your actual PDF path
retriever = load_and_retrieve_docs_from_pdf(pdf_path)
print("data loaded")

# Function that defines the RAG chain
def rag_chain(question):
    retrieved_docs = retriever.invoke(question)
    formatted_context = format_docs(retrieved_docs)

    formatted_prompt = f"Question: {question}\n\nContext: {formatted_context}"
    response = ollama.chat(model='mistral', messages=[{'role': 'user', 'content': formatted_prompt}])
    return response['message']['content']

# Gradio interface
iface = gr.Interface(
    fn=rag_chain,
    inputs=["text"],
    outputs="text",
    title="HQST GPT",
    description="Enter a question."
)

# Launch the app
iface.launch()
import os
import pandas as pd
import geopandas as gpd

from langchain_community.document_loaders import PyPDFLoader, TextLoader
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.docstore.document import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter

from sentence_transformers import SentenceTransformer, InputExample, losses
from torch.utils.data import DataLoader

from config import DATA_DIR, VECTOR_STORE_DIR


# Step 1: Load files into documents
docs = []

for file in os.listdir(DATA_DIR):
    path = os.path.join(DATA_DIR, file)

    try:
        if file.endswith('.pdf'):
            loader = PyPDFLoader(path)
            docs.extend(loader.load())

        elif file.endswith('.txt') or file.endswith('.md'):
            loader = TextLoader(path)
            docs.extend(loader.load())

        elif file.endswith('.csv'):
            df = pd.read_csv(path)
            for _, row in df.iterrows():
                text = '\n'.join([f"{k}: {v}" for k, v in row.items()])
                docs.append(Document(page_content=text, metadata={"source": file}))

        elif file.endswith('.geojson'):
            gdf = gpd.read_file(path)
            for _, row in gdf.iterrows():
                text = '\n'.join([f"{k}: {v}" for k, v in row.items()])
                docs.append(Document(page_content=text, metadata={"source": file}))

        else:
            print(f"⚠️ Skipped unsupported file: {file}")

    except Exception as e:
        print(f"❌ Error loading {file}: {e}")

print(f"✅ Loaded {len(docs)} documents.")


# Step 2: Split text into chunks
splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=150)
split_docs = splitter.split_documents(docs)
print(f"✅ Split into {len(split_docs)} chunks.")


# Step 3: Fine-tune SentenceTransformer on chunks
print("🔧 Starting fine-tuning...")
base_model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

train_examples = []
for i in range(0, len(split_docs) - 1, 2):
    train_examples.append(InputExample(texts=[
        split_docs[i].page_content,
        split_docs[i + 1].page_content
    ]))
if len(split_docs) % 2 == 1:
    text = split_docs[-1].page_content
    train_examples.append(InputExample(texts=[text, text]))

train_loader = DataLoader(train_examples, shuffle=True, batch_size=16)
train_loss = losses.MultipleNegativesRankingLoss(base_model)

base_model.fit(train_objectives=[(train_loader, train_loss)], epochs=1, show_progress_bar=True)
base_model.save('fine_tuned_model')
print("✅ Model fine-tuned and saved.")


# Step 4: Generate embeddings using fine-tuned model
print("📦 Building vector store with fine-tuned model...")
embeddings = HuggingFaceEmbeddings(model_name='fine_tuned_model')

vectordb = FAISS.from_documents(split_docs, embeddings)
vectordb.save_local(VECTOR_STORE_DIR)
print("✅ Vector store saved at:", VECTOR_STORE_DIR)

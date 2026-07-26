<div align="center">

# 🚀 AskPDF AI

### Intelligent PDF Assistant powered by AI

Upload PDFs, chat with your documents, generate AI-powered summaries, and retrieve contextual answers using **Google Gemini Embeddings**, **Groq LLM**, and **FAISS Semantic Search**.

<p>
  <a href="https://askpdf-ai-ochre.vercel.app">
    <img src="https://img.shields.io/badge/🌐 Live Demo-Visit-blue?style=for-the-badge">
  </a>
  <a href="https://github.com/Lalitsaraswat001/askpdf-ai">
    <img src="https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github">
  </a>
</p>

<img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white">
<img src="https://img.shields.io/badge/Vite-Frontend-646CFF?logo=vite">
<img src="https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js">
<img src="https://img.shields.io/badge/Express.js-API-black?logo=express">
<img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb">
<img src="https://img.shields.io/badge/Google-Gemini-blue">
<img src="https://img.shields.io/badge/Groq-LLM-orange">
<img src="https://img.shields.io/badge/FAISS-Vector Search-purple">

</div>

---

# 📖 Overview

AskPDF AI is a full-stack AI application that allows users to upload PDF documents and interact with them using natural language.

Instead of manually reading lengthy documents, users can simply ask questions, generate concise summaries, and navigate directly to relevant information using semantic search powered by vector embeddings.

---

# ✨ Features

- 🔐 Secure JWT Authentication
- 📂 Upload PDF Documents
- 📖 Interactive PDF Viewer
- 🤖 AI-powered Question Answering
- 📝 Instant AI Summaries
- 🔍 Semantic Search with FAISS
- 🧠 Google Gemini Embeddings
- ⚡ Groq LLM Integration
- 💬 Persistent Chat History
- 🌙 Modern Responsive UI
- ☁️ Cloud Deployment (Vercel + Render)

---

# 🖥️ Live Demo

### Frontend

https://askpdf-ai-ochre.vercel.app

### Backend API

https://askpdf-backend-qjpr.onrender.com

# ⚙️ Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- Axios
- Framer Motion
- React PDF

---

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Multer

---

## AI Stack

- Google Gemini Embeddings
- Groq LLM
- LangChain
- FAISS Vector Search

---

# 🏗️ Architecture

```
                User
                  │
                  ▼
         React Frontend (Vercel)
                  │
          REST API Requests
                  │
                  ▼
        Express Backend (Render)
                  │
      ┌───────────┼────────────┐
      ▼           ▼            ▼
 MongoDB      Gemini API     Groq API
  Atlas      Embeddings        LLM
      │
      ▼
 FAISS Vector Search
      │
      ▼
 AI Response
```

---

# 🔄 Workflow

```text
Upload PDF
      │
      ▼
Extract Text
      │
      ▼
Split into Chunks
      │
      ▼
Generate Embeddings
      │
      ▼
Store in MongoDB
      │
      ▼
Semantic Search using FAISS
      │
      ▼
Relevant Context
      │
      ▼
Groq LLM
      │
      ▼
Answer / Summary
```

---

# 📂 Project Structure

```
askpdf-ai/

│
├── frontend/
│   ├── public/
│   ├── src/
│   │
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── services/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   ├── utils/
│   └── server.js
│
└── README.md
```

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/Lalitsaraswat001/askpdf-ai.git
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Backend

```bash
cd backend
npm install
npm run dev
```

---

# 🔑 Environment Variables

## Backend

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_jwt_secret

GOOGLE_API_KEY=your_google_api_key

GROQ_API_KEY=your_groq_api_key
```

---

## Frontend

```env
VITE_API_URL=https://askpdf-backend-qjpr.onrender.com/api
```

---

# 🎯 Key Learning Outcomes

- Building scalable MERN applications
- Authentication using JWT
- AI integration with LLMs
- Semantic Search
- Vector Embeddings
- FAISS Indexing
- Cloud Deployment
- REST API Design
- MongoDB Data Modelling

---

# 🚀 Future Enhancements

- Multi-PDF Chat
- OCR for Scanned PDFs
- Citation-based Responses
- Voice Chat
- PDF Annotation
- Team Workspaces
- AI Flashcards
- AI Quiz Generation
- Export Chat as PDF
- Dark Mode Persistence

---

# 👨‍💻 Developer

## Lalit Kumar Saraswat

B.Tech CSE (AI)

Interested in

- Artificial Intelligence
- Full Stack Development
- Backend Engineering
- Machine Learning

### GitHub

https://github.com/Lalitsaraswat001

---

# ⭐ Show your support

If you found this project useful,

⭐ **Star this repository**

It motivates me to build more AI-powered open-source projects.

---

<div align="center">

## Thank you for visiting ❤️

Made with React • Node.js • MongoDB • Gemini • Groq

</div>

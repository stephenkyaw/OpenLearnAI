# OpenLearnAI

OpenLearnAI is an **open-source, AI-powered learning platform** designed to help users learn efficiently from uploaded educational documents.  
It converts PDFs, DOCX, or text files into **structured courses** with **units, chapters, and topics**, enriches content using AI, generates **quizzes and exercises**, and provides **personalized feedback**.

This project leverages **PostgreSQL for structured data**, **Qdrant for semantic search**, and **LangChain for AI content generation**.  

---

## **Features**

### Core Features (Phase 1)
- User registration and login  
- Upload educational documents (PDF/DOCX)  
- AI-generated course structure: units, chapters, topics  
- Enriched content with examples and recommended free resources  
- AI-generated quizzes and exercises per chapter  
- Track user progress with AI-generated feedback  

### Planned Features (Phase 2)
- Adaptive learning recommendations  
- Voice-based exercises for speaking practice  
- Performance analytics dashboard  
- Mobile-friendly PWA interface  
- Collaborative learning and discussion features  

---

## **Architecture & Tech Stack**

**Backend**
- Python + FastAPI  
- PostgreSQL + SQLAlchemy ORM  
- Qdrant for vector embeddings & semantic search  
- LangChain for AI-powered content generation, quizzes, and feedback  
- Celery + RabbitMQ for asynchronous AI tasks  

**Frontend**
- React + TypeScript  
- Redux Toolkit + React Query  
- TailwindCSS + shadcn/ui  
- Vite  

**Microservices**
1. `document-service` → handles document upload, chunking, and embeddings  
2. `course-service` → generates structured courses using LangChain  
3. `quiz-service` → generates AI quizzes and exercises  
4. `user-service` → authentication and progress tracking  
5. `feedback-service` → AI feedback and adaptive learning recommendations  

---

## **Database Architecture**

### **PostgreSQL** (Structured Data)
- Tables: `users`, `courses`, `units`, `chapters`, `quizzes`, `user_progress`  
- JSONB fields for AI-enriched content (chapter text, examples, free resources)  

### **Qdrant** (Vector Database)
- Stores embeddings of document chunks, chapters, and quizzes  
- Used for semantic search, AI recommendations, and adaptive learning  

**Workflow Example:**
1. User uploads document → PostgreSQL stores metadata  
2. LangChain processes document → generates structured course content → saved in PostgreSQL JSONB  
3. AI embeddings generated → stored in Qdrant  
4. User queries or progresses → semantic search in Qdrant → relevant content & adaptive recommendations  

---

## **AI Agents & LangChain Roles**

| Agent | Role |
|-------|------|
| Document Analyzer | Chunk documents and generate embeddings |
| Course Generator | Create course units, chapters, topics using LangChain |
| Content Improver | Enhance text clarity, add examples, summarize |
| Resource Finder | Suggest free learning resources (YouTube, articles) |
| Quiz Generator | Generate interactive quizzes & exercises |
| Feedback Agent | Provide AI feedback on quiz/exercise answers |
| Adaptive Learning Agent | Recommend next lessons based on performance and similarity search |

---

* **Frontend:** React-based web client for user interaction
* **Backend Services:** Microservices handle document upload, course generation, quizzes, user progress, and adaptive learning
* **Databases:** PostgreSQL stores structured & JSONB data; Qdrant stores embeddings for semantic search
* **AI Layer (LangChain):** Manages LLM pipelines for content parsing, enrichment, quizzes, and recommendations

---

## **Getting Started**

### Prerequisites

* Python 3.11+
* Node.js 18+
* PostgreSQL 15+
* Docker & Docker Compose

### Installation

1. Clone the repository:

```bash
git clone https://github.com/stephenkyaw/OpenLearnAI.git
cd OpenLearnAI
```

2. Setup backend:

```bash
cd backend
pip install -r requirements.txt
```

3. Setup frontend:

```bash
cd frontend
npm install
```

4. Start services with Docker Compose:

```bash
docker-compose up
```

* Qdrant runs on `http://localhost:6333`
* PostgreSQL connection via Docker Compose

---

## **Contribution**

OpenLearnAI is **community-driven** and welcomes contributions:

* Add AI features or new LangChain pipelines
* Improve UI/UX with React/Tailwind
* Create additional microservices
* Optimize database design or workflow

Please open issues or pull requests on GitHub.

---

## **License**

OpenLearnAI is licensed under the **MIT License** – free to use, modify, and distribute.

---

## **Contact**

* GitHub: [https://github.com/stephenkyaw](https://github.com/stephenkyaw)
* Email: [info.kyawmyo@gmail.com](mailto:info.kyawmyo@gmail.com)


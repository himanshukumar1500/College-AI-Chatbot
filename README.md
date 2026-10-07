# 🎓 College AI Chatbot

An AI-powered college assistant that allows students to ask questions about college facilities, departments, fees, timings, hostels, academics, and other college-related information.

The application uses a **React + Vite frontend**, **Node.js + Express backend**, **MongoDB database**, and **OpenAI API** to generate conversational answers based on a college knowledge base.

---

## 🚀 Features

### 👨‍🎓 Student Features

- Student registration and login
- JWT-based authentication
- AI-powered college chatbot
- Conversational follow-up questions
- Persistent chat conversations
- Create multiple conversations
- View previous conversations
- Clear conversations
- Delete conversations
- Student-specific conversation history
- Responsive React interface

### 🤖 AI Features

- OpenAI-powered responses
- College-specific knowledge retrieval
- Keyword-based knowledge search
- Context-aware follow-up questions
- Uses previous conversation messages for context
- Prevents the AI from inventing official college information
- Provides a fallback when requested information is unavailable
- Configurable OpenAI model

### 🔐 Admin Features

- Admin authentication
- Admin dashboard
- View registered users
- Manage college information
- Add new FAQ/knowledge entries
- Edit existing entries
- Delete knowledge entries
- Seed sample college information
- Automatically create an admin account from environment variables

---

## 🛠️ Tech Stack

### Frontend

- React 18
- Vite
- React Router
- Axios
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS
- dotenv

### AI

- OpenAI API
- Configurable OpenAI model
- Retrieval-based college knowledge context

---

## 📁 Project Structure

```text
college-chatbot/
│
├── package.json
├── README.md
├── .gitignore
│
├── client/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── public/
│   │   └── favicon.svg
│   │
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       ├── main.jsx
│       │
│       ├── components/
│       │   ├── ChatWindow.jsx
│       │   ├── ChatMessage.jsx
│       │   ├── Sidebar.jsx
│       │   ├── Navbar.jsx
│       │   └── Loading.jsx
│       │
│       ├── pages/
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── Chat.jsx
│       │   └── Admin.jsx
│       │
│       ├── context/
│       │   └── AuthContext.jsx
│       │
│       └── services/
│           └── api.js
│
└── server/
    ├── package.json
    ├── server.js
    ├── .env.example
    │
    ├── config/
    │   ├── db.js
    │   └── seed.js
    │
    ├── controllers/
    │   ├── authController.js
    │   ├── chatController.js
    │   └── adminController.js
    │
    ├── middleware/
    │   ├── authMiddleware.js
    │   └── errorMiddleware.js
    │
    ├── models/
    │   ├── User.js
    │   ├── Conversation.js
    │   └── CollegeInfo.js
    │
    ├── routes/
    │   ├── authRoutes.js
    │   ├── chatRoutes.js
    │   └── adminRoutes.js
    │
    ├── services/
    │   ├── openaiService.js
    │   └── knowledgeService.js
    │
    └── data/
        └── collegeData.js
```

---

## ⚙️ Prerequisites

Before running the project, install:

- **Node.js 18+**  
- **npm**
- **MongoDB** — MongoDB Atlas or local MongoDB
- **OpenAI API key**

Node.js 20 LTS is recommended.

---

# 🔧 Installation

Clone the repository:

```bash
git clone <your-repository-url>
cd college-chatbot
```

Install all dependencies:

```bash
npm run install:all
```

This installs dependencies for:

- Root project
- Backend
- Frontend

---

# 🔐 Environment Configuration

## Backend

Create the environment file:

### Windows PowerShell

```powershell
copy server\.env.example server\.env
```

### macOS / Linux

```bash
cp server/.env.example server/.env
```

Then update `server/.env`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/college-chatbot

OPENAI_API_KEY=your_openai_api_key

JWT_SECRET=your_long_random_secret

PORT=5000

OPENAI_MODEL=gpt-4o-mini

COLLEGE_NAME=Sample Institute of Technology

CLIENT_URL=http://localhost:5173

JWT_EXPIRES_IN=7d

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

### Environment Variables

| Variable | Required | Description |
|---|---|---|
| `MONGO_URI` | Yes | MongoDB connection string |
| `OPENAI_API_KEY` | Yes for AI | OpenAI API key |
| `JWT_SECRET` | Yes | Secret used to sign JWT tokens |
| `PORT` | No | Backend port, defaults to `5000` |
| `OPENAI_MODEL` | No | OpenAI model used for responses |
| `COLLEGE_NAME` | No | College name used by the AI |
| `CLIENT_URL` | No | Frontend URL used for CORS |
| `JWT_EXPIRES_IN` | No | JWT expiration time |
| `ADMIN_EMAIL` | No | Email for automatically created admin |
| `ADMIN_PASSWORD` | No | Password for automatically created admin |

Generate a secure JWT secret using:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

> ⚠️ Never commit `.env` files or API keys to GitHub.

---

# 🗄️ MongoDB Setup

You can use either **MongoDB Atlas** or a local MongoDB installation.

### Local MongoDB

Use:

```env
MONGO_URI=mongodb://127.0.0.1:27017/college-chatbot
```

### MongoDB Atlas

Create a cluster and use your MongoDB connection string:

```env
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/college-chatbot
```

Make sure your IP address is allowed in MongoDB Atlas Network Access.

---

# 🤖 OpenAI Setup

1. Create an OpenAI API account.
2. Create an API key.
3. Add the key to:

```env
OPENAI_API_KEY=your_api_key
```

The API key is used **only on the backend** and is never exposed directly to the React frontend.

---

# ▶️ Running the Application

The easiest way to run both frontend and backend is:

```bash
npm run dev
```

The application will run at:

### Frontend

```text
http://localhost:5173
```

### Backend

```text
http://localhost:5000
```

### Backend Health Check

```text
http://localhost:5000/api/health
```

Expected response:

```json
{
  "status": "ok"
}
```

---

## Running Frontend and Backend Separately

### Backend

```bash
npm run server
```

or:

```bash
cd server
npm run dev
```

### Frontend

```bash
npm run client
```

or:

```bash
cd client
npm run dev
```

---

# 🌱 Database Seeding

The server automatically inserts the sample college information when the knowledge collection is empty.

To manually reset the knowledge base using:

```text
server/data/collegeData.js
```

run:

```bash
npm run seed
```

> ⚠️ The seed command resets the existing college knowledge entries.

---

# 👨‍💼 Admin Account

To automatically create an admin account, configure:

```env
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

Then restart the backend.

The admin account is created automatically if it does not already exist.

Students registering through the website are always assigned the:

```text
student
```

role.

The admin dashboard is available after logging in with an admin account.

---

# 🧠 How the Chatbot Works

The chatbot follows a retrieval-based architecture.

```text
Student
   │
   ▼
React Frontend
   │
   ▼
Express API
   │
   ├── Authentication
   │
   ├── Conversation History
   │
   ▼
Knowledge Retrieval
   │
   ▼
Relevant College Information
   │
   ▼
OpenAI API
   │
   ▼
AI Response
   │
   ▼
MongoDB
   │
   ▼
React Chat Interface
```

### Step-by-step

1. A student enters a question.
2. The frontend sends the question to the backend.
3. The backend verifies the student's JWT.
4. Relevant college information is retrieved from MongoDB.
5. The retrieved information is added to the AI system prompt.
6. Previous conversation messages are included for context.
7. OpenAI generates the response.
8. The question and answer are saved in MongoDB.
9. The response is returned to the React application.

---

# 📚 Knowledge Retrieval

The project currently uses a simple keyword-based retrieval system.

For example:

```text
Student:
"What are the hostel timings?"
```

The system extracts relevant keywords such as:

```text
hostel
timing
```

It then searches the college knowledge base and ranks matching entries.

Knowledge entries contain:

```json
{
  "category": "Hostel",
  "question": "What are the hostel timings?",
  "answer": "The hostel is open from ...",
  "keywords": [
    "hostel",
    "timings",
    "hostel timing"
  ]
}
```

The most relevant entries are supplied to the OpenAI model.

For a larger knowledge base, this can later be upgraded to:

- MongoDB text search
- Vector embeddings
- Semantic search
- RAG with a vector database

---

# 🔒 Authentication

The application uses JWT authentication.

### Authentication Flow

```text
Register/Login
      │
      ▼
Backend validates credentials
      │
      ▼
JWT token generated
      │
      ▼
Frontend stores token
      │
      ▼
Axios sends:
Authorization: Bearer <token>
      │
      ▼
Backend verifies token
```

Passwords are hashed using `bcryptjs`.

Students can only access their own conversations.

Admin-only endpoints are protected by role-based authorization.

---

# 🗃️ Database Models

## User

Stores user authentication and role information.

```text
User
├── name
├── email
├── password
├── role
└── createdAt
```

Roles:

```text
student
admin
```

---

## Conversation

Stores student conversations.

```text
Conversation
├── user
├── title
├── messages[]
├── createdAt
└── updatedAt
```

Each message contains:

```text
role
content
timestamp
```

---

## CollegeInfo

Stores the college's knowledge base.

```text
CollegeInfo
├── category
├── question
├── answer
├── keywords[]
├── createdAt
└── updatedAt
```

---

# 🔌 API Endpoints

Base URL:

```text
http://localhost:5000/api
```

## Authentication

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/auth/register` | Public | Register student |
| POST | `/auth/login` | Public | Login |
| GET | `/auth/me` | User | Get current user |

---

## Chat

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/chat` | User | Ask chatbot |
| POST | `/chat/conversations` | User | Create conversation |
| GET | `/chat/conversations` | User | List conversations |
| GET | `/chat/conversations/:id` | User | Get conversation |
| PUT | `/chat/conversations/:id/clear` | User | Clear messages |
| DELETE | `/chat/conversations/:id` | User | Delete conversation |

---

## Admin

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/admin/users` | Admin | List users |
| GET | `/admin/college-info` | Admin | List knowledge entries |
| POST | `/admin/college-info` | Admin | Add knowledge |
| PUT | `/admin/college-info/:id` | Admin | Update knowledge |
| DELETE | `/admin/college-info/:id` | Admin | Delete knowledge |

---

# 🧪 Example API Request

### Ask the chatbot

```http
POST /api/chat
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

Request:

```json
{
  "message": "What are the hostel timings?"
}
```

Example response:

```json
{
  "conversationId": "6660a1...",
  "title": "What are the hostel timings?",
  "reply": {
    "role": "assistant",
    "content": "The hostel timings are ...",
    "timestamp": "2025-01-01T10:00:00.000Z"
  }
}
```

---

# 🎨 Frontend Pages

The React application contains the following major pages:

### Login

Allows existing students and administrators to authenticate.

### Register

Allows new students to create an account.

### Chat

Main AI chatbot interface with:

- Chat messages
- Conversation sidebar
- New conversation
- Conversation history
- Loading state

### Admin

Admin dashboard for managing:

- Users
- College information
- FAQs
- Knowledge-base entries

---

# 🏗️ Production Build

Build the frontend using:

```bash
npm run build
```

The production frontend is generated inside:

```text
client/dist/
```

To start the backend in production:

```bash
npm start
```

---

# 🔧 Troubleshooting

### MongoDB connection error

Check:

```env
MONGO_URI=
```

Make sure MongoDB is running or your Atlas IP access is configured.

---

### AI service is not configured

Make sure:

```env
OPENAI_API_KEY=your_key
```

is present in:

```text
server/.env
```

Restart the backend after changing environment variables.

---

### JWT_SECRET error

Make sure:

```env
JWT_SECRET=your_secret
```

is configured.

You can generate one with:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

---

### Frontend cannot connect to backend

Make sure both applications are running:

```bash
npm run dev
```

The development Vite configuration proxies `/api` requests to the backend.

---

### Admin dashboard is not visible

Make sure the logged-in account was created with:

```text
role: admin
```

Set:

```env
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

and restart the server.

---

# 🔐 Security Notes

For a production deployment, consider adding:

- HTTP-only cookies instead of localStorage JWT storage
- Rate limiting
- Email verification
- Password reset
- Input validation
- API request logging
- HTTPS
- Stronger CORS configuration
- Account lockout / brute-force protection
- OpenAI usage limits
- MongoDB indexes
- Automated tests
- Environment-specific configurations

---

# 🚀 Future Improvements

Possible enhancements include:

- 🔍 Semantic/vector search
- 🧠 Advanced RAG pipeline
- 💬 Streaming AI responses
- 📄 PDF/document knowledge ingestion
- 📱 Improved mobile UI
- 🔔 Notifications
- 📊 Admin analytics dashboard
- 👥 Advanced user management
- 📝 Markdown support for AI responses
- 🧪 Unit and integration tests
- 🐳 Docker support
- ☁️ Cloud deployment
- 📈 Chatbot usage analytics

---

# 📄 License

This project is intended for educational and academic purposes.

Add your preferred license here if the project is being distributed publicly.

---

# 👨‍💻 Author

**College AI Chatbot**

Built using:

**React + Node.js + Express + MongoDB + OpenAI**

---

## ⭐ Project Summary

The College AI Chatbot provides students with a centralized conversational interface for accessing college-related information. It combines a structured college knowledge base with OpenAI to provide natural-language responses while restricting official answers to information available in the college database.

The architecture is designed to be simple enough for an academic project while providing a foundation for future improvements such as semantic search, RAG, document processing, analytics, and production deployment.

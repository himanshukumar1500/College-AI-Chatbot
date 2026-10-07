# College AI Chatbot

An AI-powered college assistance chatbot built using React, Node.js, Express.js, MongoDB, and the OpenAI API. The application provides students with a centralized interface to ask questions related to college information, manage conversations, and receive AI-generated responses based on stored college information.

The system also includes authentication, conversation management, and an administrative dashboard for managing college-related knowledge.

---

## 1. Project Overview

The College AI Chatbot is a full-stack web application designed to provide students with quick access to college-related information through a conversational interface.

Instead of manually searching through different college resources, students can interact with the chatbot and ask questions in natural language.

The application consists of two major parts:

- A React-based frontend for user interaction
- An Express.js backend responsible for authentication, database operations, knowledge retrieval, and AI response generation

The application uses MongoDB to store users, conversations, and college information. The OpenAI API is used to generate natural-language responses using the retrieved college information and conversation context.

---

## 2. Key Features

### Student Features

- Student registration and login
- JWT-based authentication
- Protected chat interface
- AI-powered college information chatbot
- Natural-language question answering
- Conversation history
- Create new conversations
- Clear conversation messages
- Delete conversations
- Follow-up questions using previous conversation context
- Automatic handling of authentication errors

### Admin Features

- Admin authentication
- Admin dashboard
- Manage college information
- Add college information
- Edit college information
- Delete college information
- Search and filter college information
- View registered users
- Separate admin and student access control

### Application Features

- Responsive React interface
- REST API architecture
- MongoDB database integration
- OpenAI API integration
- Secure password hashing
- JWT token-based authorization
- Environment-based configuration
- Vite development environment
- Axios-based API communication

---

## 3. Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React, JavaScript, CSS |
| Build Tool | Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| AI | OpenAI API |
| Authentication | JSON Web Token, bcryptjs |
| HTTP Client | Axios |
| Routing | React Router |
| Development | Nodemon, Concurrently |
| Version Control | Git, GitHub |
| IDE | Visual Studio Code |

### Frontend Dependencies

The frontend uses React, React DOM, React Router, Axios, Vite, and the Vite React plugin.

### Backend Dependencies

The backend uses Express.js, Mongoose, OpenAI, JSON Web Token, bcryptjs, CORS, dotenv, and Nodemon.

---

## 4. System Architecture

```text
                         User
                           |
                           v
                +---------------------+
                |   React Frontend    |
                |      + Vite         |
                +----------+----------+
                           |
                    HTTP / Axios
                           |
                           v
                +---------------------+
                |   Express Backend   |
                |      REST API       |
                +----------+----------+
                           |
             +-------------+-------------+
             |                           |
             v                           v
     +---------------+           +---------------+
     |    MongoDB    |           |  OpenAI API   |
     |   Database    |           | AI Responses  |
     +---------------+           +---------------+
             |
             +-----------------------+
             |
             v
      Users / Conversations /
      College Information
```

### Request Flow

```text
User Question
      |
      v
React Chat Interface
      |
      v
POST /api/chat
      |
      v
Authentication Middleware
      |
      v
Conversation Validation
      |
      v
Knowledge Retrieval
      |
      v
Relevant College Information
      |
      v
OpenAI API
      |
      v
AI Generated Response
      |
      v
MongoDB Conversation Storage
      |
      v
Response to React Frontend
```

---

## 5. Project Structure

```text
College-AI-Chatbot/
│
└── college-chatbot/
    │
    ├── client/
    │   ├── public/
    │   │
    │   └── src/
    │       ├── components/
    │       │   ├── ChatMessage.jsx
    │       │   ├── ChatWindow.jsx
    │       │   ├── Loading.jsx
    │       │   ├── Navbar.jsx
    │       │   └── Sidebar.jsx
    │       │
    │       ├── context/
    │       │   └── AuthContext.jsx
    │       │
    │       ├── pages/
    │       │   ├── Admin.jsx
    │       │   ├── Chat.jsx
    │       │   ├── Login.jsx
    │       │   └── Register.jsx
    │       │
    │       ├── services/
    │       │   └── api.js
    │       │
    │       ├── App.jsx
    │       ├── App.css
    │       ├── index.css
    │       └── main.jsx
    │
    ├── server/
    │   ├── config/
    │   │   ├── db.js
    │   │   └── seed.js
    │   │
    │   ├── controllers/
    │   │   ├── adminController.js
    │   │   ├── authController.js
    │   │   └── chatController.js
    │   │
    │   ├── data/
    │   │   └── collegeData.js
    │   │
    │   ├── middleware/
    │   │   ├── authMiddleware.js
    │   │   └── errorMiddleware.js
    │   │
    │   ├── models/
    │   │   ├── CollegeInfo.js
    │   │   ├── Conversation.js
    │   │   └── User.js
    │   │
    │   ├── routes/
    │   │   ├── adminRoutes.js
    │   │   ├── authRoutes.js
    │   │   └── chatRoutes.js
    │   │
    │   ├── services/
    │   │   ├── knowledgeService.js
    │   │   └── openaiService.js
    │   │
    │   ├── .env.example
    │   ├── package.json
    │   └── server.js
    │
    ├── .gitignore
    ├── package.json
    ├── package-lock.json
    └── README.md
```

---

## 6. Frontend Implementation

The frontend is developed using React and Vite.

The main application routes are handled using React Router.

### Main Frontend Pages

#### Login

Provides a login interface where registered users can authenticate using their email and password.

#### Register

Allows new students to create an account by providing:

- Name
- Email
- Password

New registrations are assigned the `student` role.

#### Chat

The chat page provides the main chatbot interface.

Students can:

- Ask questions
- Receive AI-generated responses
- Create conversations
- View previous conversations
- Clear conversations
- Delete conversations
- Continue previous conversations

#### Admin Dashboard

The admin dashboard provides separate functionality for managing college information and viewing users.

### Frontend Architecture

```text
App.jsx
   |
   +-- Login
   |
   +-- Register
   |
   +-- Chat
   |
   +-- Admin
         |
         +-- College Information
         |
         +-- Users
```

### API Communication

The frontend communicates with the backend using Axios.

During development, Vite proxies `/api` requests to the Express server running on port `5000`.

---

## 7. Backend Implementation

The backend is developed using Node.js and Express.js.

The Express server provides REST API endpoints for:

- Authentication
- Chat functionality
- Conversation management
- Admin functionality
- College information management

### Backend Responsibilities

- Process HTTP requests
- Authenticate users
- Authorize admin operations
- Validate request data
- Retrieve college information
- Generate AI responses
- Store conversations
- Handle database operations
- Return appropriate API responses

---

## 8. Authentication and Authorization

The application uses JSON Web Tokens for authentication.

### Registration Flow

```text
User Registration
       |
       v
Validate Input
       |
       v
Check Existing Email
       |
       v
Hash Password using bcrypt
       |
       v
Create User
       |
       v
Return Authentication Response
```

### Login Flow

```text
Email + Password
       |
       v
Find User
       |
       v
Compare Password
       |
       v
Generate JWT
       |
       v
Return Token
```

The JWT contains the user's ID and has a configurable expiration period.

The frontend stores the authentication token and sends it with protected API requests using the `Authorization: Bearer <token>` header.

### Role-Based Authorization

The application supports two roles:

```text
student
admin
```

Students can access the chatbot and their conversations.

Administrators can additionally access the admin dashboard and manage college information.

---

## 9. AI Chatbot

The chatbot uses the OpenAI API to generate natural-language responses.

The application does not currently use a vector database, embeddings, RAG pipeline, or LangChain.

Instead, it uses a custom keyword-based knowledge retrieval system.

### Knowledge Retrieval

The `knowledgeService.js` service searches stored college information using keyword scoring.

The retrieval process considers:

- Exact keyword matches
- Individual keyword matches
- Question matches
- Category matches
- Answer matches

Relevant results are ranked and the top results are provided as context to the AI response generation service.

### AI Response Flow

```text
User Question
      |
      v
Extract Search Terms
      |
      v
Search College Information
      |
      v
Calculate Relevance Scores
      |
      v
Select Relevant Information
      |
      v
Build AI Context
      |
      v
OpenAI API
      |
      v
Generate Response
      |
      v
Return Response
```

### Conversation Context

The chatbot also considers previous messages from the current conversation.

This allows users to ask follow-up questions without repeating the complete context.

The system uses recent conversation messages when generating the AI response.

### AI Response Rules

The backend system prompt instructs the AI to:

- Use provided college information for official college facts
- Avoid inventing unsupported information
- State when requested information is unavailable
- Consider previous conversation context
- Ask for clarification when a question is ambiguous
- Provide concise and understandable responses
- Redirect unrelated questions when appropriate

---

## 10. Database

MongoDB is used as the application's primary database.

Mongoose is used as the Object Data Modeling library.

### Database Models

The application contains three primary models.

### User

Stores user account information.

```text
User
├── name
├── email
├── password
├── role
└── createdAt
```

Passwords are hashed using bcrypt before being stored.

### Conversation

Stores user conversations and messages.

```text
Conversation
├── user
├── title
├── messages
│   ├── role
│   ├── content
│   └── timestamp
├── createdAt
└── updatedAt
```

### CollegeInfo

Stores college-related knowledge.

```text
CollegeInfo
├── category
├── question
├── answer
├── keywords
├── createdAt
└── updatedAt
```

Supported categories include:

- Admissions
- Academics
- CSE Department
- Examination
- Library
- Hostel
- Fees
- Campus
- Student Services
- Contact

---

## 11. Admin Functionality

The application provides a dedicated admin dashboard.

### College Information Management

Administrators can:

- View college information
- Add new information
- Edit existing information
- Delete information
- Search information
- Filter information

### User Management

Administrators can view registered users through the admin dashboard.

The application restricts administrative endpoints using authentication middleware and role-based authorization.

---

## 12. API Overview

### Authentication APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new student |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get authenticated user |

### Chat APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/chat` | Send a chat message |
| POST | `/api/chat/conversations` | Create conversation |
| GET | `/api/chat/conversations` | Get user conversations |
| GET | `/api/chat/conversations/:id` | Get specific conversation |
| PUT | `/api/chat/conversations/:id/clear` | Clear conversation |
| DELETE | `/api/chat/conversations/:id` | Delete conversation |

### Admin APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin/users` | Get users |
| GET | `/api/admin/college-info` | Get college information |
| POST | `/api/admin/college-info` | Add college information |
| PUT | `/api/admin/college-info/:id` | Update college information |
| DELETE | `/api/admin/college-info/:id` | Delete college information |

### Health Check

```text
GET /api/health
```

The health endpoint can be used to verify that the backend server is running.

---

## 13. Environment Variables

The backend uses environment variables for configuration.

Create a `.env` file inside the `server` directory.

Example:

```env
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_jwt_secret
PORT=5000
OPENAI_MODEL=gpt-4o-mini
COLLEGE_NAME=Sample Institute of Technology
CLIENT_URL=http://localhost:5173
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

### Environment Variable Description

| Variable | Purpose |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `OPENAI_API_KEY` | OpenAI API authentication |
| `JWT_SECRET` | Secret used to sign JWT tokens |
| `PORT` | Backend server port |
| `OPENAI_MODEL` | OpenAI model used for responses |
| `COLLEGE_NAME` | College name used by the application |
| `CLIENT_URL` | Frontend URL |
| `JWT_EXPIRES_IN` | JWT expiration period |
| `ADMIN_EMAIL` | Admin account email |
| `ADMIN_PASSWORD` | Admin account password |

Do not commit the `.env` file or API keys to GitHub.

The repository includes `.env.example` as a template.

---

## 14. Installation and Setup

### Prerequisites

Install the following before running the project:

- Node.js
- npm
- MongoDB or MongoDB Atlas account
- OpenAI API key
- Git
- Visual Studio Code

### Clone the Repository

```bash
git clone https://github.com/himanshukumar1500/College-AI-Chatbot.git
```

Navigate to the project directory:

```bash
cd College-AI-Chatbot/college-chatbot
```

### Install Dependencies

Install root dependencies:

```bash
npm install
```

Install server and client dependencies:

```bash
npm run install:all
```

Alternatively, dependencies can be installed separately:

```bash
cd server
npm install
```

```bash
cd ../client
npm install
```

---

## 15. Configure Environment Variables

Create:

```text
server/.env
```

Copy the structure from:

```text
server/.env.example
```

Add the required MongoDB connection string, OpenAI API key, JWT secret, and other configuration values.

Do not upload `server/.env` to GitHub.

---

## 16. Running the Application

### Start Frontend and Backend Together

From the root `college-chatbot` directory:

```bash
npm run dev
```

The application will start:

```text
Frontend:
http://localhost:5173

Backend:
http://localhost:5000
```

### Start Backend Only

```bash
npm run server
```

### Start Frontend Only

```bash
npm run client
```

### Production Build

Build the frontend using:

```bash
npm run build
```

---

## 17. Application Pages

The application contains the following primary pages:

```text
/login
/register
/chat
/admin
```

### Student Flow

```text
Register
   |
   v
Login
   |
   v
Chat Dashboard
   |
   +---- Create Conversation
   |
   +---- Ask Question
   |
   +---- Receive AI Response
   |
   +---- View Conversation History
```

### Admin Flow

```text
Admin Login
     |
     v
Admin Dashboard
     |
     +---- Manage College Information
     |
     +---- View Users
```

---

## 18. Screenshots

Screenshots can be added to this section after capturing the application interface.

Recommended screenshots:

1. Login Page
2. Registration Page
3. Student Chat Interface
4. Conversation Sidebar
5. AI Chat Response
6. Admin Dashboard
7. College Information Management
8. User Management

Recommended project structure:

```text
college-chatbot/
└── screenshots/
    ├── login.png
    ├── register.png
    ├── chatbot.png
    ├── conversation.png
    ├── admin-dashboard.png
    └── user-management.png
```

After adding screenshots, they can be displayed in this README using:

```markdown
![Login Page](screenshots/login.png)
```

---

## 19. Security Considerations

The project implements several security-related practices:

- Passwords are hashed using bcryptjs
- Authentication is implemented using JWT
- Protected API routes require authentication
- Admin APIs require administrator authorization
- Environment variables are used for sensitive configuration
- `.env` files are excluded from version control
- User passwords are not returned in public user responses
- Conversation access is validated against the authenticated user
- Input validation is performed during registration and chat requests

Sensitive credentials such as database passwords, API keys, JWT secrets, and administrator passwords should never be committed to GitHub.

---

## 20. Error Handling

The backend includes error handling for common application failures.

Examples include:

- Invalid authentication
- Missing authentication token
- Invalid JWT
- Unauthorized access
- Invalid request data
- Missing OpenAI API key
- OpenAI API errors
- Database connection errors
- Invalid conversation access
- Resource not found errors

The frontend also handles authentication failures and API errors through the Axios service layer.

---

## 21. Future Improvements

Potential improvements for future versions include:

- Vector database integration
- Embedding-based semantic search
- Retrieval-Augmented Generation (RAG)
- Improved natural-language search
- Streaming AI responses
- File and document-based knowledge ingestion
- PDF college document processing
- Improved admin analytics
- Role-based permission management
- Chat export functionality
- Conversation search
- More advanced response evaluation
- Deployment using cloud infrastructure
- Automated testing
- CI/CD integration

These features are considered future improvements and are not part of the current implementation unless explicitly added.

---

## 22. Development Commands

### Install All Dependencies

```bash
npm run install:all
```

### Start Development Environment

```bash
npm run dev
```

### Start Backend

```bash
npm run server
```

### Start Frontend

```bash
npm run client
```

### Build Frontend

```bash
npm run build
```

### Seed Database

```bash
npm run seed
```

---

## 23. Repository

GitHub Repository:

https://github.com/himanshukumar1500/College-AI-Chatbot

---

## 24. Author

### Himanshu Kumar

Computer Science and Engineering Student

GitHub:

https://github.com/himanshukumar1500

---

## 25. License

No separate open-source license file is currently included in the repository.

This project is primarily intended for educational and academic purposes.

---

## 26. Project Summary

The College AI Chatbot demonstrates a complete full-stack application combining:

- React frontend development
- REST API development
- Node.js and Express.js backend development
- MongoDB database management
- JWT authentication
- Role-based authorization
- AI integration using OpenAI API
- Knowledge retrieval using keyword scoring
- Conversation management
- Administrative functionality
- Environment-based configuration

The project provides a foundation for developing an intelligent college information assistant and can be extended with semantic search, RAG, document processing, and cloud deployment in future versions.
College AI Chatbot
1. Project Overview
College AI Chatbot is a full-stack web application designed to help students obtain college-related information through an AI-powered conversational interface. The application provides student registration and login, personalized chat conversations, college-information management, and an administrator dashboard.
The system combines a React and Vite frontend with a Node.js and Express backend, MongoDB for persistent data storage, and the OpenAI API for generating chatbot responses. GitHub
2. Key Features
- Student registration and login
- JWT-based authentication
- Protected student and administrator routes
- AI-powered college information chatbot
- Persistent conversation history
- Create, view, clear, and delete conversations
- Context-aware follow-up questions
- College information knowledge base
- Keyword-based information retrieval
- Administrator dashboard
- Add, edit, search, filter, and delete college information
- User management view for administrators
- MongoDB database integration
- OpenAI API integration
- Environment-based configuration
- Development setup using Vite and Nodemon
3. Technology Stack
Category	Technologies
Frontend	React.js, Vite, JavaScript, CSS
Backend	Node.js, Express.js
Database	MongoDB, Mongoose
AI	OpenAI API
Authentication	JWT, bcryptjs
HTTP Client	Axios
Routing	React Router
Development Tools	Git, GitHub, npm, Visual Studio Code


The frontend dependencies include React, React DOM, React Router, Axios, Vite, and the Vite React plugin. The backend uses Express, Mongoose, OpenAI, JSON Web Tokens, bcryptjs, CORS, dotenv, and Nodemon. GitHub
4. System Architecture
                         Student / Administrator
                                  |
                                  v
                    +---------------------------+
                    |     React + Vite Client   |
                    |                           |
                    | Login / Register         |
                    | Chat Interface            |
                    | Admin Dashboard           |
                    +-------------+-------------+
                                  |
                             HTTP / Axios
                                  |
                                  v
                    +---------------------------+
                    |    Node.js + Express      |
                    |                           |
                    | Authentication            |
                    | Chat Routes               |
                    | Admin Routes              |
                    | Middleware                |
                    +------+--------------+-----+
                           |              |
                           |              |
                           v              v
                  +---------------+  +---------------+
                  |    MongoDB    |  |  OpenAI API   |
                  |   Mongoose    |  | AI Responses  |
                  +---------------+  +---------------+

The frontend communicates with the Express backend through /api routes. During development, Vite proxies /api requests to the backend running on port 5000. GitHub
5. Project Structure
College-AI-Chatbot/
└── college-chatbot/
    ├── client/
    │   ├── public/
    │   │   └── favicon.svg
    │   ├── src/
    │   │   ├── components/
    │   │   │   ├── ChatMessage.jsx
    │   │   │   ├── ChatWindow.jsx
    │   │   │   ├── Loading.jsx
    │   │   │   ├── Navbar.jsx
    │   │   │   └── Sidebar.jsx
    │   │   ├── context/
    │   │   │   └── AuthContext.jsx
    │   │   ├── pages/
    │   │   │   ├── Admin.jsx
    │   │   │   ├── Chat.jsx
    │   │   │   ├── Login.jsx
    │   │   │   └── Register.jsx
    │   │   ├── services/
    │   │   │   └── api.js
    │   │   ├── App.css
    │   │   ├── App.jsx
    │   │   └── main.jsx
    │   ├── index.html
    │   ├── package.json
    │   └── vite.config.js
    │
    ├── server/
    │   ├── config/
    │   │   ├── db.js
    │   │   └── seed.js
    │   ├── controllers/
    │   │   ├── adminController.js
    │   │   ├── authController.js
    │   │   └── chatController.js
    │   ├── data/
    │   │   └── collegeData.js
    │   ├── middleware/
    │   │   ├── authMiddleware.js
    │   │   └── errorMiddleware.js
    │   ├── models/
    │   │   ├── CollegeInfo.js
    │   │   ├── Conversation.js
    │   │   └── User.js
    │   ├── routes/
    │   │   ├── adminRoutes.js
    │   │   ├── authRoutes.js
    │   │   └── chatRoutes.js
    │   ├── services/
    │   │   ├── knowledgeService.js
    │   │   └── openaiService.js
    │   ├── .env.example
    │   ├── package.json
    │   └── server.js
    │
    ├── package.json
    ├── package-lock.json
    └── README.md

6. Frontend Implementation
The frontend is implemented using React and Vite.
Main Application
App.jsx uses React Router to provide routes for:
- /login
- /register
- /chat
- /admin
Protected routing ensures that authenticated users can access the chat application and only administrators can access the admin dashboard. GitHub
Authentication Context
AuthContext.jsx manages:
- Current user state
- Login
- Registration
- Logout
- JWT token persistence
- Authentication state restoration
The JWT is stored in browser local storage and automatically attached to API requests through Axios interceptors. GitHub
Chat Interface
Chat.jsx manages:
- Conversation list
- Active conversation
- Message history
- Sending messages
- Creating new conversations
- Loading previous conversations
- Clearing conversations
- Deleting conversations
- Error handling
The interface is composed of the Navbar, Sidebar, ChatWindow, ChatMessage, and Loading components. GitHub
Admin Dashboard
Admin.jsx provides administrator functionality for:
- Managing college information
- Adding questions and answers
- Editing existing information
- Deleting information
- Searching information
- Filtering information by category
- Viewing registered users GitHub
7. Backend Implementation
The backend uses Node.js and Express.js.
The main server initializes Express, configures CORS and JSON parsing, connects to MongoDB, initializes college information, and registers authentication, chat, and admin routes. GitHub
Controllers
The project separates application logic into:
- authController.js
- chatController.js
- adminController.js
This separation keeps authentication, chatbot processing, and administrative operations organized.
Middleware
The authentication middleware verifies JWT bearer tokens and attaches the authenticated user to the request. An additional adminOnly middleware restricts administrator functionality to users whose role is admin. GitHub
Services
The backend contains two main services:
- knowledgeService.js for finding relevant college information
- openaiService.js for generating AI responses
8. Authentication
The application implements JWT-based authentication.
Registration
A new registration requires:
- Name
- Email
- Password
Newly registered accounts receive the default student role. The role is not accepted from the registration request, preventing users from registering themselves as administrators. GitHub
Password Security
Passwords are hashed using bcryptjs before being stored in MongoDB. The password field is also excluded from normal database queries. GitHub
JWT
After successful login or registration, the server generates a JWT containing the user's ID. The token has a configurable expiration period, with seven days used by default. GitHub
Protected Routes
Protected routes require:
Authorization: Bearer <token>

Chat routes require authentication, while admin routes require both authentication and the administrator role. GitHub
9. AI Chatbot
The chatbot uses the OpenAI API to generate responses.
When a student submits a question:
1. The backend validates the message.
2. The user's conversation history is retrieved.
3. Relevant college information is searched using keyword-based scoring.
4. Relevant information is included in the AI system prompt.
5. The OpenAI API generates the response.
6. The user message and AI response are saved to MongoDB.
7. The response is returned to the frontend.
The OpenAI service limits conversation history to the most recent ten messages when constructing the request. GitHub
The project does not currently implement RAG embeddings, a vector database, or LangChain. Its knowledge retrieval uses a custom keyword-scoring approach before passing selected college information to the OpenAI model. GitHub
The default OpenAI model configured by the project is gpt-4o-mini, although it can be changed through the environment configuration. GitHub
10. Knowledge Retrieval
The knowledgeService.js service performs simple keyword-based retrieval.
The process includes:
- Tokenizing the student's question
- Removing common stop words
- Comparing tokens with stored keywords
- Comparing tokens with questions, categories, and answers
- Assigning relevance scores
- Returning the highest-scoring entries
The service returns up to six relevant college information entries. GitHub
11. Database
MongoDB is used as the primary database through Mongoose.
User Model
Stores:
- Name
- Email
- Password hash
- Role
- Creation date
Supported roles are:
student
admin
``` :chatgpt-content-reference{index="17"}


### Conversation Model

Stores:

- User reference
- Conversation title
- User messages
- Assistant messages
- Message timestamps
- Conversation creation and update timestamps :chatgpt-content-reference{index="18"}


### CollegeInfo Model

Stores:

- Category
- Question
- Answer
- Keywords
- Creation and update timestamps

Supported categories include:

```text
Admissions
Academics
CSE Department
Examination
Library
Hostel
Fees
Campus
Student Services
Contact
``` :chatgpt-content-reference{index="19"}


## 12. Admin Functionality

The administrator dashboard is protected using both authentication and role-based authorization.

Administrators can:

- View registered users
- View college information
- Add college information
- Edit college information
- Delete college information
- Search knowledge-base entries
- Filter entries by category :chatgpt-content-reference{index="20"}


## 13. Environment Variables

Create a `.env` file inside the `server` directory.

Use the following structure:

```env
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET=your_random_jwt_secret

PORT=5000
OPENAI_MODEL=gpt-4o-mini
COLLEGE_NAME=Your College Name
CLIENT_URL=http://localhost:5173
JWT_EXPIRES_IN=7d

ADMIN_EMAIL=
ADMIN_PASSWORD=

MONGO_URI, OPENAI_API_KEY, and JWT_SECRET are required for the complete application. OPENAI_MODEL, COLLEGE_NAME, CLIENT_URL, JWT_EXPIRES_IN, and optional administrator credentials are configurable through the environment. GitHub
Never commit the .env file, MongoDB credentials, passwords, or API keys to GitHub.
14. Installation and Setup
Clone the Repository
git clone https://github.com/himanshukumar1500/College-AI-Chatbot.git

Navigate to the Application
cd College-AI-Chatbot/college-chatbot

Install Dependencies
The root project provides an installation script for the root, server, and client dependencies:
npm run install:all

The root project also provides development scripts for running the client and server together. GitHub
Configure Environment Variables
Create:
server/.env

Copy the required variables from:
server/.env.example

Then add your MongoDB connection string, OpenAI API key, and JWT secret.
15. Running the Application
From the college-chatbot directory:
npm run dev

This starts both the backend and frontend development servers. GitHub
Frontend
http://localhost:5173

Backend
http://localhost:5000

Health Check
http://localhost:5000/api/health

The backend exposes a health endpoint returning the server status. GitHub
16. Screenshots
Login Page
screenshots/login.png

Registration Page
screenshots/register.png

Chatbot Interface
screenshots/chatbot.png

Admin Dashboard
screenshots/admin.png

Replace these placeholders with actual screenshots from the application.
17. API Overview
Authentication
Method	Endpoint	Purpose
POST	/api/auth/register	Register a student
POST	/api/auth/login	Authenticate a user
GET	/api/auth/me	Get the authenticated user's information


Chat
Method	Endpoint	Purpose
POST	/api/chat	Send a question and receive an AI response
POST	/api/chat/conversations	Create a new conversation
GET	/api/chat/conversations	List the user's conversations
GET	/api/chat/conversations/:id	Get a specific conversation
PUT	/api/chat/conversations/:id/clear	Clear messages from a conversation
DELETE	/api/chat/conversations/:id	Delete a conversation


All chat endpoints require authentication. GitHub
Administration
Method	Endpoint	Purpose
GET	/api/admin/users	Retrieve registered users
GET	/api/admin/college-info	Retrieve college information
POST	/api/admin/college-info	Add college information
PUT	/api/admin/college-info/:id	Update college information
DELETE	/api/admin/college-info/:id	Delete college information


All administration endpoints require an authenticated administrator account. GitHub
18. Security Considerations
The application includes several security-related measures:
- JWT authentication for protected routes
- Role-based administrator authorization
- Password hashing using bcryptjs
- Password exclusion from normal user queries
- Environment variables for secrets and credentials
- Server-side validation of authentication data
- User-specific conversation access
- Protected administrator endpoints
- CORS configuration for allowed frontend origins
- Input length validation for chat messages
The chat controller also verifies that a requested conversation belongs to the authenticated user before allowing access, modification, or deletion. GitHub
19. Future Improvements
The following are proposed improvements and are not currently implemented:
- Document-based knowledge retrieval
- Embedding-based semantic search
- Vector database integration
- Improved multilingual support
- Voice-based chatbot interaction
- Advanced analytics for administrators
- Improved chatbot response evaluation
- Production deployment
- Automated testing
- More detailed role and permission management
- Mobile-focused interface improvements
20. Author
Himanshu Kumar
GitHub:
https://github.com/himanshukumar1500
21. License
No dedicated license file is currently included in the repository.
This project is developed for educational and academic purposes. If the project is intended for redistribution or open-source use, an appropriate license should be added to the repository.

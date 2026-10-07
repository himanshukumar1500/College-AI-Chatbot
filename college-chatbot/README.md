# College AI Chatbot

## 1. Overview

College AI Chatbot is a full-stack web app where students ask questions about their college (admissions, courses, exams, fees, library, hostel, contacts) and get answers from an OpenAI-powered assistant. The assistant answers **only from college information stored in MongoDB**, so administrators can update what it knows without touching code.

> ## Sample data notice
> All college information in `server/data/collegeData.js` (names, fees, timings, phone numbers, faculty, policies) is **invented demo data**. It is **not** real information about any college. Replace it before real use (see "Replacing the sample data").

## 2. Features

- Student registration, login, logout (JWT + bcrypt)
- Chat interface with message bubbles, typing indicator, error messages, suggested questions
- Conversation history: create, continue, clear, delete (saved per student in MongoDB)
- Follow-up understanding ("What about weekends?" after a hostel question)
- College knowledge base in MongoDB with keyword-based retrieval
- Admin dashboard: view users, add / edit / delete college FAQs (role-based access)
- Responsive layout for desktop, tablet and mobile
- The OpenAI key lives only on the server

## 3. Technology stack

| Layer | Tools |
|---|---|
| Frontend | React 18, Vite, JavaScript, CSS, Axios, React Router |
| Backend | Node.js, Express 4, REST API |
| Database | MongoDB, Mongoose |
| AI | OpenAI API (`openai` npm package) |
| Auth | JWT (`jsonwebtoken`), `bcryptjs` |
| Tools | Git, VS Code, Postman, dotenv, concurrently, nodemon |

## 4. Architecture

```
React (Vite, :5173) --/api--> Express (:5000) --> MongoDB (users, conversations, college info)
                                        \--> OpenAI API
```

One chat message:
1. React sends `POST /api/chat` with the JWT.
2. Express verifies the token and validates the message.
3. `knowledgeService` scores all `CollegeInfo` entries against the question (plus the previous question for follow-ups) and picks the top 6.
4. `openaiService` builds a system prompt (rules + those entries), adds the last 10 messages of the conversation and calls OpenAI.
5. Question and answer are saved in the `Conversation` document; the reply goes back to React.

In development Vite proxies `/api` to the backend, so no CORS setup is needed. In production, CORS only allows `CLIENT_URL`.

## 5. Folder structure

```
college-chatbot/
├── package.json            root scripts (run both apps)
├── .gitignore
├── README.md
├── client/
│   ├── index.html, vite.config.js, package.json, .env.example
│   ├── public/favicon.svg
│   └── src/
│       ├── main.jsx, App.jsx, App.css
│       ├── components/  ChatWindow, ChatMessage, Sidebar, Navbar, Loading
│       ├── pages/       Login, Register, Chat, Admin
│       ├── context/     AuthContext.jsx
│       └── services/    api.js
└── server/
    ├── server.js, package.json, .env.example
    ├── config/       db.js, seed.js
    ├── controllers/  authController, chatController, adminController
    ├── middleware/   authMiddleware, errorMiddleware
    ├── models/       User, Conversation, CollegeInfo
    ├── routes/       authRoutes, chatRoutes, adminRoutes
    ├── services/     openaiService, knowledgeService
    └── data/         collegeData.js  (SAMPLE DATA)
```

## 6. Prerequisites

- Node.js 18 or newer (20 LTS recommended), npm
- A MongoDB database (Atlas free tier or local)
- An OpenAI API key with billing credit (the API is billed separately from ChatGPT)

## 7. Installation

```bash
cd college-chatbot
npm run install:all
```

This installs the root, `server/` and `client/` dependencies.

## 8. Environment variables

```bash
# macOS / Linux / Git Bash
cp server/.env.example server/.env
# Windows PowerShell
copy server\.env.example server\.env
```

Edit `server/.env`:

| Variable | Required | Meaning |
|---|---|---|
| `MONGO_URI` | yes | MongoDB connection string |
| `OPENAI_API_KEY` | yes (for chat) | Your OpenAI key |
| `JWT_SECRET` | yes | Long random string used to sign tokens |
| `PORT` | no | Server port (default 5000) |
| `OPENAI_MODEL` | no | Default `gpt-4o-mini` |
| `COLLEGE_NAME` | no | Used in the AI prompt |
| `CLIENT_URL` | no | Allowed frontend origin(s), default `http://localhost:5173` |
| `JWT_EXPIRES_IN` | no | Default `7d` |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | no | If both set, an admin account is created at startup |

Generate a JWT secret: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`

`.env` is ignored by Git. Never commit real keys.

## 9. MongoDB setup

**Atlas (recommended):** create a free cluster, add a database user, under *Network Access* allow your IP, click *Connect > Drivers* and copy the string, e.g.
`mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/college-chatbot?retryWrites=true&w=majority`
(URL-encode special characters in the password).

**Local:** install MongoDB Community Server and use `mongodb://127.0.0.1:27017/college-chatbot`.

On first start the server seeds the sample college data automatically (only if the collection is empty).

## 10. OpenAI API setup

1. Sign in at https://platform.openai.com, add billing credit.
2. Create a key under *API keys* and put it in `server/.env` as `OPENAI_API_KEY`.
3. Restart the server after changing `.env`.

## 11. Running the project

Whole project (backend + frontend):
```bash
npm run dev
```
Backend only: `npm run server` (http://localhost:5000, health check at `/api/health`)
Frontend only: `npm run client` (http://localhost:5173)

Production build of the frontend: `npm run build` (output in `client/dist`).

### Creating an admin

Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `server/.env` and restart. The account is created on startup. Registration through the website always creates **students** (roles cannot be chosen by the client). The admin link appears in the navbar after you log in as admin.

### Replacing the sample data

- Quick: log in as admin and edit or delete entries in the dashboard.
- Bulk: edit `server/data/collegeData.js`, then run `npm run seed` to **reset** the knowledge base to that file.
- Set `COLLEGE_NAME` in `.env` so the AI uses your college's name.

Tip: add `keywords` students are likely to type; retrieval uses them heavily.

## 12. API documentation

Base URL `http://localhost:5000/api`. Protected routes need `Authorization: Bearer <token>`. Errors always look like `{ "message": "..." }`.

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | /auth/register | public | Create student account |
| POST | /auth/login | public | Log in, get token |
| GET | /auth/me | user | Current user |
| POST | /chat | user | Ask a question (creates a conversation if none given) |
| POST | /chat/conversations | user | Create an empty conversation |
| GET | /chat/conversations | user | List own conversations |
| GET | /chat/conversations/:id | user | One conversation with messages |
| PUT | /chat/conversations/:id/clear | user | Remove its messages |
| DELETE | /chat/conversations/:id | user | Delete conversation |
| GET | /admin/users | admin | List users |
| GET | /admin/college-info | admin | List knowledge entries (`?category=`) |
| POST | /admin/college-info | admin | Add entry |
| PUT | /admin/college-info/:id | admin | Edit entry |
| DELETE | /admin/college-info/:id | admin | Delete entry |

### Sample requests and responses (Postman)

**1. Register** `POST /auth/register`
```json
{ "name": "Asha Verma", "email": "asha@example.com", "password": "secret123" }
```
201:
```json
{ "token": "eyJhbGciOi...", "user": { "id": "665f...", "name": "Asha Verma", "email": "asha@example.com", "role": "student" } }
```
Errors: 400 missing/invalid fields, 409 email already used.

**2. Login** `POST /auth/login`
```json
{ "email": "asha@example.com", "password": "secret123" }
```
200: same shape as register. 401 `{ "message": "Invalid email or password." }`

In Postman, copy the `token` and use *Authorization > Bearer Token* on later requests.

**3. Current user** `GET /auth/me` -> `{ "user": { "id": "...", "name": "Asha Verma", "email": "...", "role": "student" } }`

**4. Ask the chatbot (creates conversation)** `POST /chat`
```json
{ "message": "What are the hostel timings?" }
```
200:
```json
{
  "conversationId": "6660a1...",
  "title": "What are the hostel timings?",
  "reply": { "role": "assistant", "content": "[answer generated from the stored hostel info]", "timestamp": "2025-01-01T10:00:00.000Z" }
}
```
Follow-up: send `{ "message": "What about weekends?", "conversationId": "6660a1..." }`.
Errors: 400 empty message / over 1000 chars, 404 conversation not yours, 429/502/503 AI service problems.

**5. Create empty conversation** `POST /chat/conversations` -> 201 `{ "conversation": { "_id": "...", "title": "New conversation", "messages": [] } }`

**6. Retrieve** `GET /chat/conversations` -> `{ "conversations": [ { "_id": "...", "title": "...", "updatedAt": "..." } ] }`
`GET /chat/conversations/6660a1...` -> `{ "conversation": { "_id": "...", "title": "...", "messages": [ { "role": "user", "content": "...", "timestamp": "..." }, { "role": "assistant", ... } ] } }`

**7. Delete** `DELETE /chat/conversations/6660a1...` -> `{ "message": "Conversation deleted." }`

**8. Admin login**: log in with the `ADMIN_EMAIL` account; the user has `"role": "admin"`. A student token calling `/admin/*` gets 403 `Admin access required.`

**9. Add FAQ** `POST /admin/college-info`
```json
{ "category": "Library", "question": "Is there a quiet study room?", "answer": "Yes, on the first floor.", "keywords": "quiet, study room, silence" }
```
201 -> `{ "item": { "_id": "...", "category": "Library", "keywords": ["quiet","study room","silence"], ... } }`

**10. Edit FAQ** `PUT /admin/college-info/:id` with the full body (category, question, answer, keywords) -> `{ "item": { ...updated } }`

**11. Delete FAQ** `DELETE /admin/college-info/:id` -> `{ "message": "College info entry deleted." }`

## 13. Authentication explained

1. Passwords are hashed with bcryptjs (10 rounds) in a Mongoose `pre("save")` hook; the hash is never returned (`select: false`).
2. Login returns a JWT containing the user id, signed with `JWT_SECRET`.
3. The frontend stores the token in `localStorage` and Axios adds it as `Authorization: Bearer ...`.
4. `protect` middleware verifies the token and loads the user; `adminOnly` checks `role === "admin"`.
5. Chat queries always filter by `user`, so a student cannot read or delete another student's chats.

Note: `localStorage` tokens are simple and fine for a college project; for higher security use httpOnly cookies.

## 14. Database explained

- **User**: name, email (unique), password (hash), role (`student`/`admin`), createdAt
- **Conversation**: user (ref to User), title, messages[] (role, content, timestamp), createdAt, updatedAt. Messages are embedded because they are always read together with their conversation.
- **CollegeInfo**: category, question, answer, keywords[], createdAt, updatedAt

## 15. How the AI stays grounded

`server/services/openaiService.js` builds a system prompt that tells the model to use only the supplied college information, never invent policies, fees, timings or faculty details, say when information is unavailable and suggest contacting administration, ask for clarification when needed, and stay concise. The previous 10 messages are sent so follow-ups work. No prompt can fully guarantee the model never errs, so keep the knowledge base accurate.

## 16. Screenshots

_Add screenshots here: login page, chat page, mobile view, admin dashboard._

## 17. Future improvements

- Streaming responses, Markdown rendering in answers
- Better retrieval (MongoDB text index or embeddings)
- Rate limiting, email verification, password reset, httpOnly cookie auth
- Usage analytics and user management (disable or delete users)
- Automated tests and CI, Docker, deployment guides

## 18. Troubleshooting

| Problem | Fix |
|---|---|
| `JWT_SECRET is missing` | Create `server/.env` from `.env.example` and fill it in |
| `Could not connect to MongoDB` | Check `MONGO_URI`; on Atlas allow your IP and URL-encode the password |
| Chat says AI service not configured | Set `OPENAI_API_KEY` and restart the server |
| "AI service rejected the API key" | Key is wrong or revoked; create a new one |
| 429 / quota message | Add billing credit or wait a moment |
| "model is not available" | Change `OPENAI_MODEL` to one your account can use |
| "Cannot reach the server" in the browser | Backend not running on port 5000 |
| Port already in use | Change `PORT` in `server/.env` and the proxy target in `client/vite.config.js` |
| No admin link | Set `ADMIN_EMAIL`/`ADMIN_PASSWORD`, restart, log in with that account |
| Changes to `.env` ignored | Restart the server |

## 19. Team contribution

| Member | Role | Contribution |
|---|---|---|
| _Name_ | _e.g. Frontend_ | _e.g. React UI, auth pages_ |
| _Name_ | _e.g. Backend_ | _e.g. APIs, MongoDB models_ |
| _Name_ | _e.g. AI / docs_ | _e.g. prompt design, README_ |

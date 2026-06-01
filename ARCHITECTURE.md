# Task Manager - Visual Architecture & Flow

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND (Browser)                  │
│                    Single HTML File                     │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │ Login/Register Screen  →  Task Management UI   │    │
│  │ (Vanilla JS + CSS)       (Kanban Board)        │    │
│  └────────────────────────────────────────────────┘    │
│                          ↓                               │
│            Fetch API with JWT Token                     │
│                          ↓                               │
└─────────────────────────────────────────────────────────┘
                          │
                    HTTP/REST API
                          │
                          ↓
┌─────────────────────────────────────────────────────────┐
│                  BACKEND (Express.js)                   │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  Routes:                                       │    │
│  │  • POST   /api/auth/register                  │    │
│  │  • POST   /api/auth/login                     │    │
│  │  • GET    /api/tasks                          │    │
│  │  • POST   /api/tasks                          │    │
│  │  • PUT    /api/tasks/:id                      │    │
│  │  • DELETE /api/tasks/:id                      │    │
│  │  • GET    /api/health                         │    │
│  └────────────────────────────────────────────────┘    │
│                          ↓                               │
│  ┌────────────────────────────────────────────────┐    │
│  │  Middleware:                                   │    │
│  │  • CORS (cross-origin)                        │    │
│  │  • JSON Parser                                │    │
│  │  • JWT Authentication                         │    │
│  │  • Error Handling                             │    │
│  └────────────────────────────────────────────────┘    │
│                          ↓                               │
└─────────────────────────────────────────────────────────┘
                          │
                  MongoDB Connection
                          │
                          ↓
┌─────────────────────────────────────────────────────────┐
│              DATABASE (MongoDB)                          │
│                                                          │
│  ┌──────────────────────┐  ┌──────────────────────┐    │
│  │   Users Collection   │  │   Tasks Collection   │    │
│  ├──────────────────────┤  ├──────────────────────┤    │
│  │ _id                  │  │ _id                  │    │
│  │ fullName             │  │ title                │    │
│  │ email (unique)       │  │ description          │    │
│  │ password (hashed)    │  │ stage                │    │
│  │ createdAt            │  │ userId (reference)   │    │
│  │ updatedAt            │  │ createdAt            │    │
│  └──────────────────────┘  │ updatedAt            │    │
│                             └──────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 Authentication Flow

```
┌──────────────────────────────────────────────────────┐
│ User Opens Application                               │
│ Check localStorage for token                         │
└──────────────────────────────────────────────────────┘
                        ↓
           Token exists?  ←──→  No token?
                ↓                    ↓
          Show Tasks          Show Login/Register
                ↓                    ↓
        Fetch tasks          ┌─────────────────┐
        with token        │ User fills form  │
                             │ Clicks Register │
                             └─────────────────┘
                                     ↓
                          ┌──────────────────────┐
                          │ POST /auth/register  │
                          └──────────────────────┘
                                     ↓
                          ┌──────────────────────┐
                          │ Hash password        │
                          │ Create user in DB    │
                          │ Generate JWT token   │
                          └──────────────────────┘
                                     ↓
                          ┌──────────────────────┐
                          │ Return user + token  │
                          │ Store token in       │
                          │ localStorage         │
                          └──────────────────────┘
                                     ↓
                          Show Task Dashboard
```

---

## 📊 Task Management Flow

```
Task Board View (Three Columns)
┌─────────────────────┬─────────────────────┬─────────────────────┐
│   📌 TO DO          │  ⏳ IN PROGRESS    │   ✅ DONE           │
├─────────────────────┼─────────────────────┼─────────────────────┤
│                     │                     │                     │
│  [Task 1]          │  [Task 2]          │  [Task 3]          │
│  ┌─────────────┐   │  ┌─────────────┐   │  ┌─────────────┐   │
│  │ Title       │   │  │ Title       │   │  │ Title       │   │
│  │ Description │   │  │ Description │   │  │ Description │   │
│  │             │   │  │             │   │  │             │   │
│  │ [Next] [Del]│   │  │ [Back][Next]│   │  │ [Back] [Del]│   │
│  │ [Edit*]     │   │  │ [Edit*]     │   │  │ [Edit*]     │   │
│  └─────────────┘   │  └─────────────┘   │  └─────────────┘   │
│                     │                     │                     │
│  [Task 4]          │                     │                     │
│  ┌─────────────┐   │                     │                     │
│  │ Title       │   │                     │                     │
│  │ Description │   │                     │                     │
│  │             │   │                     │                     │
│  │ [Next] [Del]│   │                     │                     │
│  │ [Edit*]     │   │                     │                     │
│  └─────────────┘   │                     │                     │
│                     │                     │                     │
└─────────────────────┴─────────────────────┴─────────────────────┘

Add New Task Form
┌────────────────────────────────────────────────────┐
│ Title: [____________]  Desc: [_____________] [Add] │
└────────────────────────────────────────────────────┘

* Edit - Future feature

Task Movement Buttons
- "Next →"  : Move task to next stage (right)
- "← Back"  : Move task to previous stage (left)
- "Delete"  : Remove task permanently
```

---

## 🔐 Data Security & Isolation

```
User A                          User B
  │                              │
  ├─ JWT Token A                 ├─ JWT Token B
  │  (expires in 7 days)         │  (expires in 7 days)
  │                              │
  └─ Create Task                 └─ Create Task
     │                              │
     ├─ Send: POST /api/tasks       ├─ Send: POST /api/tasks
     │   + Token A                  │   + Token B
     │   + Title: "My Task"         │   + Title: "His Task"
     │                              │
     └─ Server validates token     └─ Server validates token
        Extracts userId: ABC          Extracts userId: XYZ
        Saves: {                      Saves: {
          title: "My Task",             title: "His Task",
          userId: ABC,                  userId: XYZ,
          stage: "todo"                 stage: "todo"
        }                             }
        │                              │
        └─ GET /api/tasks             └─ GET /api/tasks
           + Token A                      + Token B
           Server filters:                Server filters:
           Find where userId===ABC        Find where userId===XYZ
           │                              │
           ├─ Returns only ABC's tasks    └─ Returns only XYZ's tasks
           │  (User A sees only own)         (User B sees only own)
           │
           └─ Security: Complete data isolation ✓
```

---

## 🚀 Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│           PRODUCTION DEPLOYMENT                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Frontend (Vercel)          Backend (Railway)  Database  │
│  ┌──────────────┐           ┌──────────────┐  (MongoDB) │
│  │ index.html   │           │ server.js    │  ┌──────┐  │
│  │ (Static)     │───────────│ Express.js   │──│Atlas │  │
│  │              │ HTTPS     │              │  │      │  │
│  │ Deployed at: │   REST    │ Deployed at: │  │  ☁️   │  │
│  │ vercel.app   │   APIs    │ railway.app  │  │      │  │
│  └──────────────┘           └──────────────┘  └──────┘  │
│       │                            │                     │
│       └─ Update API_URL ──────────→│ CORS enabled        │
│                                    │ Environment vars:   │
│                                    │ • MONGODB_URI       │
│                                    │ • JWT_SECRET        │
│                                    │ • PORT              │
│                                    │ • NODE_ENV          │
└─────────────────────────────────────────────────────────┘
```

---

## 📱 Responsive Design Breakpoints

```
Desktop (1200px+)          Tablet (768px)         Mobile (375px)
┌─────────────────┐        ┌──────────────┐       ┌────────────┐
│ Header          │        │ Header       │       │ Header     │
├─────────────────┤        ├──────────────┤       ├────────────┤
│ Add Task Form   │        │ Add Task Form│       │ Add Task   │
├─────────────────┤        ├──────────────┤       │ Form       │
│ ┌─────┬─────┬──│        │ ┌──────────┐│       ├────────────┤
│ │ TODO│INPROG│DONE      │ │ 3-Column │       │ ┌────────┐  │
│ │     │      │          │ │ Layout   │       │ │ TODO   │  │
│ │ 3   │ 2   │ 1         │ │          │       │ │ (5)    │  │
│ │Cols │ Cols│Col        │ └──────────┘       │ └────────┘  │
│ └─────┴─────┴──│        │ Stacked below      │            │
│               │        │                     │ Scroll for │
│               │        │                     │ other cols │
└─────────────────┘        └──────────────────┘ └────────────┘
```

---

## 🔄 Data Flow Example: Create Task

```
User Types Task Title and Clicks "Add"

         Frontend (index.html)
              │
              ↓
        ┌──────────────────┐
        │ Validate input   │
        │ (title required) │
        └──────────────────┘
              │
              ↓
        ┌──────────────────────────────┐
        │ Fetch POST /api/tasks        │
        │ Headers:                     │
        │ - Authorization: Bearer JWT  │
        │ - Content-Type: application/ │
        │   json                       │
        │ Body:                        │
        │ { title, description }       │
        └──────────────────────────────┘
              │
              ↓ (HTTP)
         Backend (Express)
              │
              ↓
        ┌──────────────────┐
        │ authMiddleware   │
        │ Verify JWT token │
        │ Extract userId   │
        └──────────────────┘
              │
              ↓
        ┌──────────────────┐
        │ POST /api/tasks  │
        │ Validate title   │
        └──────────────────┘
              │
              ↓
        ┌──────────────────────┐
        │ Create Task object:  │
        │ {                    │
        │   title: "...",      │
        │   description: "...",│
        │   stage: "todo",     │
        │   userId: <from JWT> │
        │ }                    │
        └──────────────────────┘
              │
              ↓
        ┌──────────────────┐
        │ MongoDB          │
        │ Save to DB       │
        │ tasks collection │
        └──────────────────┘
              │
              ↓
        ┌──────────────────┐
        │ Return saved task│
        │ (with _id)       │
        └──────────────────┘
              │
              ↓ (JSON Response)
         Frontend (Browser)
              │
              ↓
        ┌──────────────────────┐
        │ Clear input fields   │
        │ Refresh task list    │
        │ Render new task in   │
        │ "TODO" column        │
        │ Show success state   │
        └──────────────────────┘
              │
              ↓
        User sees task appear! ✓
```

---

## 🔐 Password Security Flow

```
User enters: password123

        ↓
   Frontend (unsecured - sent over HTTPS in production)
        │
        ├─ POST /auth/register
        │ { email, password123, ... }
        │
        ↓
   Backend (server.js)
        │
        ├─ Receive password123
        │
        ├─ Check email not in DB
        │
        ├─ Generate salt (10 rounds)
        │ bcryptjs.genSalt(10)
        │
        ├─ Hash password
        │ bcryptjs.hash(password123, salt)
        │ Result: $2a$10$abcd...xyz (64 chars)
        │
        ├─ Store only hashed version
        │ {
        │   email: "user@example.com",
        │   password: "$2a$10$abcd...xyz"  ← HASHED
        │ }
        │
        ↓
   MongoDB (Database)
        │
        ├─ Never stores plain password ✓
        ├─ Stores only bcrypt hash
        ├─ Even admin can't see password
        │
        ↓

Next login: user enters password123 again

        ↓
   Backend receives password123
        │
        ├─ Fetch user from DB
        │ Retrieve hashed password: $2a$10$...xyz
        │
        ├─ Compare plain with hash
        │ bcryptjs.compare(password123, storedHash)
        │
        ├─ Comparison is one-way (cannot reverse hash)
        │ Can only verify, not decrypt
        │
        ├─ Match? ✓ Grant access (JWT token)
        ├─ No match? ✗ Reject login
        │
        ↓
   Login succeeds/fails (based on comparison)
```

---

## ✅ Request/Response Example

```
REQUEST (From Frontend)
┌─────────────────────────────────────────┐
│ POST /api/tasks                         │
│ Host: railway-backend.railway.app       │
│                                         │
│ Headers:                                │
│ Authorization: Bearer eyJhbGciOiJI... │
│ Content-Type: application/json          │
│ Origin: https://vercel-app.vercel.app   │
│                                         │
│ Body:                                   │
│ {                                       │
│   "title": "Buy groceries",            │
│   "description": "Milk, bread, eggs"   │
│ }                                       │
└─────────────────────────────────────────┘
            ↓
        Server processes
            ↓
RESPONSE (From Backend)
┌─────────────────────────────────────────┐
│ 201 Created                             │
│                                         │
│ Headers:                                │
│ Content-Type: application/json          │
│ Access-Control-Allow-Origin: *          │
│                                         │
│ Body:                                   │
│ {                                       │
│   "_id": "64abc123...",                │
│   "title": "Buy groceries",            │
│   "description": "Milk, bread, eggs",  │
│   "stage": "todo",                     │
│   "userId": "64abc456...",             │
│   "createdAt": "2024-...",             │
│   "updatedAt": "2024-...",             │
│   "__v": 0                             │
│ }                                       │
└─────────────────────────────────────────┘
```

---

**This visual guide helps understand how all components work together!** 🎯

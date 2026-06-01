# Taskrix

A full-stack task management application with user authentication and three-stage task workflow.

## 📸 Features

- **User Authentication**: Register and login with email/password
- **Task Management**: Create, read, update, and delete tasks
- **Three-Stage Workflow**: Todo → In Progress → Done
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Instant task synchronization
- **Clean UI**: Modern, intuitive interface with smooth animations

## 🚀 Tech Stack

### Frontend

- Vanilla JavaScript (no build step required)
- HTML5 & CSS3
- Responsive Grid Layout
- Fetch API for HTTP requests

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **CORS**: Enabled for cross-origin requests

## 📋 Project Structure

```
Task_Manager/
├── index.html              # Frontend (single HTML file)
├── server.js              # Express server entry point
├── package.json           # Node.js dependencies
├── .env                   # Environment variables
├── User.js                # User schema & model
├── Task.js                # Task schema & model
├── auth.js                # JWT middleware & utilities
├── authRoutes.js          # Authentication endpoints
├── taskRoutes.js          # Task management endpoints
└── README.md              # This file
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas account for cloud database)
- Git

### Local Development

1. **Clone the repository** (or download the files)

```bash
cd Task_Manager
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**
   Create a `.env` file with:

```env
PORT=5000
  MONGODB_URI=mongodb://localhost:27017/taskrix
JWT_SECRET=your-super-secret-jwt-key-change-in-production
NODE_ENV=development
```

For MongoDB Cloud (Atlas):

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskrix
```

4. **Start the server**

```bash
npm start
```

5. **Open the frontend**

- Open `index.html` in your browser (can use `npm install -g serve` then `serve .` for better local testing)
- Or visit: `http://localhost:3000` if using a local server

## 📚 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user

  - Body: `{ fullName, email, password }`
  - Returns: `{ user: {...}, token }`

- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`
  - Returns: `{ user: {...}, token }`

### Tasks (requires JWT token in Authorization header)

- `GET /api/tasks` - Get all tasks for current user
- `POST /api/tasks` - Create new task

  - Body: `{ title, description? }`
  - Returns: `{ _id, title, description, stage, userId, createdAt, ... }`

- `PUT /api/tasks/:id` - Update task

  - Body: `{ title?, description?, stage? }`
  - Valid stages: `todo`, `inProgress`, `done`

- `DELETE /api/tasks/:id` - Delete task

### Health Check

- `GET /api/health` - Server status check

## 🔐 Authentication Flow

1. User registers with email/password
2. Password is hashed using bcryptjs (salt: 10)
3. User object created in MongoDB
4. JWT token generated (expires in 7 days)
5. Token stored in browser localStorage
6. Every task API request includes token in Authorization header
7. Backend validates token and extracts userId
8. Tasks are filtered by userId for data isolation

## 📝 Key Design Decisions & Tradeoffs

### Architecture

- **Single HTML file frontend**: Faster deployment, no build step needed, easier for internship project
- **Monolithic backend**: Simpler to manage and deploy, suitable for small projects
- **Flat file structure**: Easier navigation, suitable for MVP

### Security Tradeoffs

- JWT stored in localStorage: Simple but susceptible to XSS attacks
- No refresh tokens: Simpler implementation, 7-day expiry acceptable for internship
- No HTTPS enforcement in dev: Added for production deployment

### Database

- MongoDB Atlas free tier: 512MB limit, suitable for demo/internship
- No database indexing on email: Added for performance in production
- No data validation beyond schema: Suitable for MVP

### Frontend

- No frameworks: Reduces complexity and bundle size
- Vanilla DOM manipulation: Good for learning, not ideal for large apps
- No state management library: Adequate for this project scope

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. Create account at vercel.com
2. Connect GitHub repository
3. Set build command: none (static HTML)
4. Deploy: automatic on push

### Backend Deployment (Railway/Render)

1. Create account at railway.app or render.com
2. Connect GitHub repository
3. Set start command: `npm start`
4. Set environment variables in dashboard
5. Deploy: automatic on push

### Environment Variables for Production

```env
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=use-a-long-random-string-in-production
PORT=5000
NODE_ENV=production
```

## ⚠️ Assumptions

1. **Unique Email Constraint**: Email is unique per user (no duplicate accounts)
2. **Task Ownership**: Users can only see and modify their own tasks
3. **Session Duration**: JWT tokens valid for 7 days
4. **Browser Support**: Modern browsers with ES6+ support
5. **Network**: Assumes consistent internet connection
6. **Database**: MongoDB is required for production

## 🧪 Testing

### Manual Testing Checklist

- [ ] Register with valid email and password
- [ ] Login with correct credentials
- [ ] Login fails with wrong password
- [ ] Create task with title
- [ ] Create task without title (should fail)
- [ ] Move task between stages
- [ ] Delete task with confirmation
- [ ] Logout clears token
- [ ] Can't access tasks without login
- [ ] Responsive design on mobile

### API Testing

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"John","email":"john@example.com","password":"pass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'

# Create task (replace TOKEN)
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Task","description":"Task description"}'
```

## 🐛 Known Limitations

1. No persistent theme/dark mode
2. No task search or filtering
3. No task priorities or deadlines
4. No file attachments
5. No real-time collaboration
6. No email verification for signup
7. No password reset functionality
8. No audit logs

## 🔄 Future Enhancements

- [ ] Task categories/labels
- [ ] Task priority levels
- [ ] Due dates and reminders
- [ ] Task subtasks
- [ ] Comments/notes on tasks
- [ ] Team collaboration
- [ ] Email notifications
- [ ] Dark mode
- [ ] Mobile app (React Native)

## 📄 License

This project is created as part of INDPRO internship selection process.

## 👤 Author

Created for INDPRO Internship Assignment - June 2026

## 📞 Support

For issues or questions, contact: akshayma2005@gmail.com

---

**Note**: This is a demonstration project built with AI assistance (GitHub Copilot). For production use, consider adding:

- Rate limiting
- Input validation
- Error logging
- Database backups
- Monitoring and analytics
- Security headers
- API versioning

# SUBMISSION CHECKLIST ✅

> **Deadline:** June 1, 2026, 10:00 PM IST

## 📋 Pre-Submission Steps

### 1. Local Testing (CRITICAL)

- [ ] **Install dependencies**

  ```bash
  cd Task_Manager
  npm install
  ```

- [ ] **Test Backend**

  ```bash
  npm start
  # Server should start on http://localhost:5000
  # No MongoDB errors in console
  ```

- [ ] **Test Frontend**

  - [ ] Open `index.html` in browser
  - [ ] Register with email/password
  - [ ] Login with registered account
  - [ ] Create a task
  - [ ] Move task between stages
  - [ ] Delete a task
  - [ ] Logout
  - [ ] Login again (should be possible)
  - [ ] Test on mobile view (F12 → Device toolbar)

- [ ] **API Testing (Optional but recommended)**

  ```bash
  # Test register
  curl -X POST http://localhost:5000/api/auth/register \
    -H "Content-Type: application/json" \
    -d '{"fullName":"Test","email":"test@example.com","password":"pass123"}'

  # Test health check
  curl http://localhost:5000/api/health
  ```

### 2. GitHub Repository Setup

- [ ] Create public GitHub repository

  - Go to https://github.com/new
  - Repository name: `taskrix` or similar
  - Make it **public**
  - Initialize without README (you have one already)

- [ ] Push code to GitHub

  ```bash
  cd Task_Manager
  git init
  git add .
  git commit -m "Initial commit: Complete Task Manager app"
  git branch -M main
  git remote add origin https://github.com/YOUR_USERNAME/taskrix.git
  git push -u origin main
  ```

- [ ] Verify on GitHub
  - [ ] All files present (check file list)
  - [ ] README.md shows properly formatted
  - [ ] .env not in repository (should be in .gitignore)
  - [ ] .gitignore working correctly

### 3. Deploy Backend

**Choose ONE platform:**

#### Option A: Railway (⭐ Recommended - Easiest)

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub"
4. Select your `taskrix` repository
5. Railway auto-detects and starts deployment
6. Go to "Settings" → "Environment"
7. Add variables:
   ```
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/taskrix
   JWT_SECRET=your-long-random-secret-key-here
   NODE_ENV=production
   ```
8. Get public URL (looks like `https://taskrix-xyz.railway.app`)
9. Test: `curl https://taskrix-xyz.railway.app/api/health`
10. Save this URL ✅

#### Option B: Render

1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Select repository
5. Build command: `npm install`
6. Start command: `npm start`
7. Add environment variables in Settings
8. Wait for deployment
9. Copy the provided URL ✅

#### Option C: Heroku

1. Install Heroku CLI: `npm install -g heroku`
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set variables: `heroku config:set MONGODB_URI="..."`
5. Push: `git push heroku main`
6. Get URL from Heroku dashboard ✅

**After deploying backend:**

- [ ] Note the backend URL
- [ ] Test health endpoint
- [ ] Verify MongoDB connection works

### 4. Setup MongoDB Atlas (if not done)

- [ ] Create account: https://www.mongodb.com/cloud/atlas
- [ ] Create free cluster
- [ ] Get connection string: `mongodb+srv://user:pass@...`
- [ ] Add to backend platform's environment variables
- [ ] Test connection by creating a user via API

### 5. Deploy Frontend

**Choose ONE platform:**

#### Option A: Vercel (⭐ Recommended - Drag & Drop)

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Import Project" → "From Git Repository"
4. Select your `taskrix` repository
5. Deploy (automatic)
6. Get URL (looks like `https://taskrix-xyz.vercel.app`)
7. Frontend is instantly deployed! ✅

#### Option B: Netlify

1. Go to https://netlify.com
2. Sign up with GitHub
3. Click "New site from Git"
4. Select repository
5. Build command: `(leave empty)`
6. Publish directory: `.` (or leave empty)
7. Deploy
8. Get URL ✅

#### Option C: GitHub Pages

1. Go to repository Settings → Pages
2. Select "Deploy from a branch"
3. Select `main` branch
4. Save
5. URL: `https://username.github.io/taskrix` ✅

**Important:** Update API_URL in index.html!

```javascript
// Before deploying, in index.html, change:
const API_URL = "https://your-backend-url-here/api";
// Example: 'https://taskrix-abc.railway.app/api'
```

Then redeploy frontend after updating the API_URL.

### 6. Final Testing on Live Deployment

- [ ] Open deployed frontend URL
- [ ] Register with new account
- [ ] Create a task
- [ ] Move task between stages
- [ ] Delete task
- [ ] Logout and login
- [ ] Check Network tab (F12) for API calls
- [ ] Verify backend URL is correct in requests
- [ ] Test on mobile device if possible

### 7. Submission Form Preparation

Have ready to copy-paste:

- [ ] **Full Name:** Your name
- [ ] **Email:** Your email (akshayma2005@gmail.com format)
- [ ] **GitHub Link:** `https://github.com/username/taskrix`
- [ ] **Frontend Link:** `https://vercel-url.vercel.app` or similar
- [ ] **Backend Link:** `https://railway-url.railway.app` or similar
- [ ] **Notes (Optional):**
  ```
  Implemented with:
  - React/Vanilla JS frontend
  - Express.js backend
  - MongoDB database
  - JWT authentication
  - Full CRUD operations
  ```

### 8. Final Checks Before Submission

**GitHub Repository:**

- [ ] README.md is comprehensive and readable
- [ ] .env is NOT committed (check .gitignore)
- [ ] All source files present
- [ ] DEPLOYMENT.md included
- [ ] TESTING.md included
- [ ] QUICKSTART.md included
- [ ] ARCHITECTURE.md included
- [ ] package.json with all dependencies
- [ ] .env.example shows what variables needed

**Backend Deployment:**

- [ ] Server is running (check status dashboard)
- [ ] Environment variables set correctly
- [ ] MongoDB connected (no errors in logs)
- [ ] Accessible from internet
- [ ] CORS enabled for frontend URL
- [ ] Health check endpoint works

**Frontend Deployment:**

- [ ] Website loads without errors
- [ ] Can register and login
- [ ] Can create/update/delete tasks
- [ ] No console errors (F12 → Console)
- [ ] Responsive on mobile
- [ ] API calls going to correct backend URL

**Documentation:**

- [ ] README mentions tech stack
- [ ] README lists assumptions
- [ ] README discusses tradeoffs
- [ ] README explains technical decisions
- [ ] DEPLOYMENT.md has step-by-step instructions
- [ ] TESTING.md has test cases

### 9. Submit on Form

Visit: https://forms.gle/[form-id-from-email]

Fill in:

1. **Full Name\*** - Your name
2. **Email Address\*** - Your email
3. **GitHub Repository Link\*** - Paste GitHub URL
4. **Frontend Deployed Link\*** - Paste Vercel/Netlify URL
5. **Backend API Link** - Paste Railway/Render/Heroku URL
6. **Notes** - Optional (mention features, stack, etc.)

⚠️ **IMPORTANT:** Do NOT include passwords or secrets in any field!

### 10. After Submission

- [ ] Confirm submission received
- [ ] Keep all links active until evaluation
- [ ] Don't delete repository before evaluation date
- [ ] Keep deployments running (no need to shut down servers)

---

## 🎯 Success Criteria Met

✅ **Requirements Fulfilled:**

- [x] User authentication (Login & Register)
- [x] Task management (Create, Read, Update, Delete)
- [x] Three-stage workflow (Todo → InProgress → Done)
- [x] Responsive UI design
- [x] Loading and error states
- [x] Frontend deployment (mandatory)
- [x] Backend deployment (mandatory - AI tools used)
- [x] GitHub repository with README
- [x] Technical decisions documented
- [x] Assumptions and tradeoffs listed

✅ **Bonus Features Implemented:**

- [x] Custom backend APIs
- [x] Database integration (MongoDB)
- [x] Backend authentication (JWT + bcryptjs)
- [x] Password hashing
- [x] User data isolation
- [x] Comprehensive documentation
- [x] Testing guide
- [x] Architecture documentation
- [x] Deployment guide
- [x] Production-ready setup

---

## ❓ FAQ for Submission

**Q: Should I deploy backend if I only used ChatGPT?**
A: No, backend is optional. But this project includes it!

**Q: Can I use free tier services?**
A: Yes! Railway, Render, MongoDB Atlas, Vercel, Netlify all have free tiers.

**Q: Do I need a custom domain?**
A: No, free subdomains from hosting platforms are acceptable.

**Q: How long will it take to deploy?**
A: ~30 minutes total (backend: 10 min, frontend: 5 min, testing: 15 min)

**Q: What if something breaks after deployment?**
A: Check logs in dashboard, verify environment variables, restart server.

**Q: Can I update after submitting?**
A: Yes, links must stay active but can be updated until deadline.

---

## 📞 Support Resources

If stuck at any step:

- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas: https://docs.mongodb.com/atlas
- Express.js: https://expressjs.com
- This project's DEPLOYMENT.md
- This project's TESTING.md

---

## ✨ Final Reminders

1. **Test everything locally first** - don't rely on deployment
2. **Keep credentials safe** - never commit .env file
3. **Update API_URL in frontend** - before deploying
4. **Set environment variables** - in each platform's dashboard
5. **Test final deployment** - register, create tasks, move them
6. **Document everything** - README, DEPLOYMENT.md, TESTING.md
7. **Keep repositories public** - evaluators need to see code
8. **Keep deployments running** - don't shut them down before eval

---

## 🚀 GO TIME!

You've got everything you need! Follow this checklist step-by-step and you'll have a production-ready application deployed.

**Timeline Suggestion:**

- Local testing: 15 minutes
- GitHub setup: 5 minutes
- Backend deployment: 10 minutes
- Frontend deployment: 5 minutes
- Final testing: 10 minutes
- Form submission: 5 minutes

**Total Time: ~45 minutes** ⏱️

Good luck! You've built something great! 💪

---

**Last Updated:** May 31, 2026
**Submission Deadline:** June 1, 2026, 10:00 PM IST

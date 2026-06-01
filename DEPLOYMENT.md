# Task Manager - Deployment Guide

## 🚀 Quick Start (Local Development)

### Step 1: Install Node.js

Download from: https://nodejs.org (LTS version recommended)

### Step 2: Setup MongoDB

#### Option A: Local MongoDB

- Download from: https://www.mongodb.com/try/download/community
- Install and run the MongoDB service
- Connection string: `mongodb://localhost:27017/taskrix`

#### Option B: MongoDB Atlas (Cloud - Recommended)

1. Create account at: https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string: `mongodb+srv://user:password@cluster.mongodb.net/taskrix`

### Step 3: Setup Environment Variables

Create `.env` file in root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskrix
JWT_SECRET=your-super-secret-jwt-key-change-in-production
NODE_ENV=development
```

### Step 4: Install and Run

```bash
npm install
npm start
```

### Step 5: Open Frontend

Open `index.html` in your browser or use a local server:

```bash
npm install -g serve
serve .
```

---

## 🌐 Production Deployment

### Option 1: Deploy Backend to Railway ⭐ (Recommended)

1. **Create Railway Account**

   - Go to: https://railway.app
   - Sign up with GitHub

2. **Deploy**

   - Click "New Project" → "Deploy from GitHub"
   - Select this repository
   - Railway will auto-detect `Procfile` and start command

3. **Configure Environment**

   - In Railway dashboard, go to "Variables"
   - Add environment variables:
     ```
     MONGODB_URI=your-mongodb-atlas-connection-string
     JWT_SECRET=long-random-string-here
     NODE_ENV=production
     ```

4. **Get API URL**
   - Railway provides a public URL for your backend
   - Copy this URL for frontend configuration

---

### Option 2: Deploy Backend to Render

1. **Create Render Account**

   - Go to: https://render.com
   - Sign up with GitHub

2. **Deploy**

   - Click "New +" → "Web Service"
   - Select GitHub repository
   - Build command: `npm install`
   - Start command: `npm start`

3. **Set Environment Variables**
   - In Settings → Environment, add:
     ```
     MONGODB_URI=your-mongodb-atlas-connection-string
     JWT_SECRET=long-random-string-here
     NODE_ENV=production
     ```

---

### Option 3: Deploy Backend to Heroku

1. **Create Heroku Account**

   - Go to: https://www.heroku.com
   - Sign up

2. **Install Heroku CLI**

   ```bash
   npm install -g heroku
   heroku login
   ```

3. **Deploy**

   ```bash
   heroku create your-app-name
   git push heroku main
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI="your-connection-string"
   heroku config:set JWT_SECRET="your-secret"
   heroku config:set NODE_ENV=production
   ```

---

## 📱 Frontend Deployment

### Option 1: Deploy to Vercel (Free) ⭐

1. **Create Vercel Account**

   - Go to: https://vercel.com
   - Sign up with GitHub

2. **Deploy**

   - Import your GitHub repository
   - Vercel auto-detects and serves `index.html`
   - Your app is live!

3. **Configure Backend URL**
   - Update the `API_URL` in `index.html`:
     ```javascript
     const API_URL = "https://your-railway-backend.railway.app/api";
     ```
   - Redeploy

### Option 2: Deploy to Netlify (Free)

1. **Create Netlify Account**

   - Go to: https://netlify.com
   - Sign up with GitHub

2. **Deploy**

   - Drag and drop the entire folder, or:
   - Connect GitHub repository
   - Netlify serves your static files

3. **Update Backend URL in index.html**

### Option 3: GitHub Pages (Free)

1. Push code to GitHub
2. Go to Settings → Pages
3. Select "Deploy from branch" → main
4. Your frontend is live at: `https://username.github.io/taskrix`

Note: Update API_URL in index.html to your backend URL

---

## 🔗 Complete Setup Example

### Scenario: Deploy both frontend and backend

**Backend (Railway):**

- Deployed at: `https://my-app-xyz.railway.app`
- Environment: Production with MongoDB Atlas

**Frontend (Vercel):**

- Deployed at: `https://taskrix.vercel.app`
- API_URL in index.html: `https://my-app-xyz.railway.app/api`

### Steps:

1. Setup MongoDB Atlas account and get connection string
2. Deploy backend to Railway (set MONGODB_URI and JWT_SECRET)
3. Copy Railway backend URL
4. Update API_URL in index.html with Railway URL
5. Deploy frontend to Vercel
6. Test: Register, login, create tasks

---

## 🧪 Testing Deployment

### Test Backend:

```bash
curl https://your-backend-url/api/health
# Should return: {"status":"OK"}
```

### Test Frontend:

- Open deployed URL in browser
- Try to register with test account
- Create, update, delete tasks
- Logout and login again

---

## 🔐 Security Checklist

- [ ] Change JWT_SECRET to a long random string
- [ ] Use MongoDB Atlas (never hardcode passwords)
- [ ] Enable HTTPS on all domains
- [ ] Add CORS_ORIGIN environment variable
- [ ] Enable database backups
- [ ] Set up monitoring/logging
- [ ] Use rate limiting on API
- [ ] Add input validation
- [ ] Never commit .env file

---

## 🆘 Troubleshooting

### "MongoDB connection error"

- Check MONGODB_URI is correct
- Verify IP whitelist on MongoDB Atlas
- Ensure credentials are correct

### "CORS error" when calling API

- Add frontend URL to CORS whitelist in backend
- Check Authorization header format: `Bearer <token>`

### "Token expired" errors

- Check JWT_SECRET matches between backend and frontend
- Increase token expiry if needed (in auth.js)

### Frontend not loading

- Check if backend is running and accessible
- Open browser console (F12) to see errors
- Verify API_URL in index.html is correct

---

## 📊 Free Tier Limits

- **MongoDB Atlas**: 512 MB storage, 512 MB RAM
- **Railway**: $5/month free credit, then pay-as-you-go
- **Render**: Free tier available with sleep mode
- **Vercel**: Unlimited deployments, 100GB bandwidth/month
- **Netlify**: Unlimited bandwidth, free SSL

---

## 💾 Backup & Persistence

### Database Backup:

- MongoDB Atlas: Automatic backups (last 7 days)
- Enable snapshots in MongoDB Atlas console

### Code Backup:

- GitHub repository is your backup
- Always commit important changes

---

## 🎯 Next Steps

1. [ ] Setup MongoDB Atlas account
2. [ ] Deploy backend to Railway
3. [ ] Update API_URL in index.html
4. [ ] Deploy frontend to Vercel
5. [ ] Test complete flow
6. [ ] Share links for submission

Happy coding! 🚀

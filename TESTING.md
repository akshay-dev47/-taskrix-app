# Task Manager - Testing Guide

## 🧪 Local Testing

### Prerequisites

- Node.js installed
- MongoDB running (local or Atlas)
- .env file configured

### Run Tests

1. **Start Backend**

```bash
npm start
# Server should run on http://localhost:5000
```

2. **Test API Health**

```bash
curl http://localhost:5000/api/health
# Expected: {"status":"OK"}
```

3. **Test Authentication**

**Register:**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName":"Test User",
    "email":"test@example.com",
    "password":"password123"
  }'

# Expected response:
# {
#   "user": {"id":"...", "fullName":"Test User", "email":"test@example.com"},
#   "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
# }
```

**Login:**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "password":"password123"
  }'

# Same response format as register
# Save token for next requests: TOKEN=<your-token-here>
```

4. **Test Tasks API**

**Create Task:**

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title":"My First Task",
    "description":"This is a test task"
  }'

# Expected: Task object with _id, stage=todo, createdAt, etc.
```

**Get All Tasks:**

```bash
curl http://localhost:5000/api/tasks \
  -H "Authorization: Bearer TOKEN"

# Expected: Array of task objects
```

**Update Task Stage:**

```bash
curl -X PUT http://localhost:5000/api/tasks/TASK_ID \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"stage":"inProgress"}'

# Or move to done:
# -d '{"stage":"done"}'
```

**Delete Task:**

```bash
curl -X DELETE http://localhost:5000/api/tasks/TASK_ID \
  -H "Authorization: Bearer TOKEN"

# Expected: {"message":"Task deleted"}
```

---

## 🖥️ Frontend Testing

### Manual Test Cases

#### Authentication

- [ ] **Register with valid data**

  - Fill: Full Name, Email, Password
  - Click Register
  - Expected: Redirected to task board

- [ ] **Register with existing email**

  - Use email from previous registration
  - Expected: Error message shown

- [ ] **Register without full name**

  - Leave full name empty
  - Expected: Error message

- [ ] **Login with correct credentials**

  - Enter email and password
  - Click Login
  - Expected: Redirected to task board

- [ ] **Login with wrong password**

  - Enter correct email, wrong password
  - Expected: Error message

- [ ] **Switch between Login/Register**
  - Click "Register" button while on Login
  - Expected: Form changes to register
  - Click "Login" button
  - Expected: Back to login form

#### Task Management

- [ ] **Create task with title only**

  - Enter title, click Add
  - Expected: Task appears in "To Do" column

- [ ] **Create task with title and description**

  - Fill title and description
  - Click Add
  - Expected: Task shows in column with description

- [ ] **Create task without title**

  - Leave title empty
  - Click Add
  - Expected: Alert error shown

- [ ] **Move task forward (todo → inProgress)**

  - Create task in Todo column
  - Click "Next →" button
  - Expected: Task moves to In Progress

- [ ] **Move task backward (inProgress → todo)**

  - Click "← Back" button
  - Expected: Task moves back to Todo

- [ ] **Complete task (done → done → delete)**

  - Continue clicking "Next →"
  - Task should move: Todo → InProgress → Done
  - Expected: Only Delete button visible on Done tasks

- [ ] **Delete task**

  - Click Delete on any task
  - Confirm deletion
  - Expected: Task disappears, count in column decreases

- [ ] **View multiple tasks**
  - Create 5+ tasks
  - Expected: All visible in respective columns

#### UI/UX

- [ ] **Responsive design on mobile**

  - Open in mobile view (375px width)
  - Expected: Single column layout

- [ ] **Responsive design on tablet**

  - Open in tablet view (768px width)
  - Expected: Grid adapts appropriately

- [ ] **Loading states**

  - Create/delete task
  - Expected: Button shows loading (smooth transition)

- [ ] **Empty states**

  - No tasks in a column
  - Expected: "No tasks yet" message shown

- [ ] **User info displayed**
  - After login
  - Expected: "Welcome, [Full Name]" shown in header

#### Session Management

- [ ] **Logout**

  - Click Logout button
  - Expected: Redirected to login screen, token cleared

- [ ] **Access tasks without login**

  - Open index.html in private/incognito window
  - Expected: Login screen shown

- [ ] **Auto-restore session on page refresh**

  - Login, create tasks
  - Refresh page (F5)
  - Expected: Still logged in, tasks preserved

- [ ] **Token expiry handling**
  - Wait 7+ days (or test with expired token)
  - Try to create/fetch tasks
  - Expected: Graceful error, redirect to login

---

## 🔍 Error Testing

### Invalid Inputs

```javascript
// Test in browser console while logged in
// Empty title
fetch("http://localhost:5000/api/tasks", {
  method: "POST",
  headers: {
    Authorization: "Bearer YOUR_TOKEN",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ title: "" }),
});
// Expected: 400 error

// Invalid stage
fetch("http://localhost:5000/api/tasks/TASK_ID", {
  method: "PUT",
  headers: {
    Authorization: "Bearer YOUR_TOKEN",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ stage: "invalid" }),
});
// Expected: Updates to invalid stage (server doesn't validate well)
```

### Authentication Errors

```javascript
// Missing token
fetch("http://localhost:5000/api/tasks");
// Expected: 401 error - No token provided

// Invalid token
fetch("http://localhost:5000/api/tasks", {
  headers: { Authorization: "Bearer invalid-token" },
});
// Expected: 401 error - Invalid token
```

---

## 🎯 Performance Testing

### Load Testing

```bash
# Simple load test (requires ab or similar tool)
ab -n 100 -c 10 http://localhost:5000/api/health

# Expected:
# - Requests per second: >100
# - Response time: <50ms
```

### Database Testing

- Create 100+ tasks
- Expected: Still responsive, no timeouts
- Check MongoDB storage (should be < 50MB)

---

## ✅ Pre-Deployment Checklist

- [ ] All manual tests pass on local machine
- [ ] No console errors (F12 → Console)
- [ ] No network errors (F12 → Network tab)
- [ ] Backend responds to all API endpoints
- [ ] JWT token works correctly
- [ ] Task CRUD operations work
- [ ] Responsive design works on mobile
- [ ] Logout clears session properly
- [ ] Register/Login forms validate input
- [ ] .env file not committed to git
- [ ] Dependencies installed correctly
- [ ] No hardcoded passwords or secrets
- [ ] README is comprehensive
- [ ] DEPLOYMENT.md instructions are clear

---

## 🐛 Common Issues & Solutions

### Issue: "CORS error when calling API"

**Solution:** Ensure backend is running on correct port, check API_URL in index.html

### Issue: "Connection refused"

**Solution:** Backend not running, check if `npm start` succeeded

### Issue: "MongoDB connection error"

**Solution:**

- Check MONGODB_URI in .env
- Verify MongoDB is running (local) or Atlas credentials correct
- Check IP whitelist on MongoDB Atlas

### Issue: "Tasks not showing after login"

**Solution:**

- Check browser console for errors
- Verify token is being sent (Network tab)
- Check backend logs for 500 errors

### Issue: "Can't login with registered account"

**Solution:**

- Check email in database
- Verify password matches (bcryptjs comparison)
- Clear browser cache and localStorage

---

## 📊 Test Results Template

Date: ******\_\_\_******
Tester: ******\_\_\_******
Environment: [ ] Local [ ] Development [ ] Production

### Results Summary

- Total Tests: \_\_\_
- Passed: \_\_\_
- Failed: \_\_\_
- Blocked: \_\_\_

### Failed Tests

(List any failed tests with error details)

### Notes

(Additional observations)

---

## 🚀 Ready to Deploy?

If all tests pass:

1. Commit changes: `git add . && git commit -m "Ready for deployment"`
2. Push to GitHub
3. Follow DEPLOYMENT.md guide
4. Test on production environment
5. Submit links to form

Good luck! 🎉

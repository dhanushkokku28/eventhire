# 🚀 EventHire - Getting Started (Windows)

## ✅ Everything is Configured!

Your MongoDB, backend, and frontend are all set up and ready to go.

---

## 🎯 Step 1: Run the Setup Script (Installs Dependencies)

### Option A: Using Command Prompt (CMD)
```batch
cd d:\Wellfound-1
setup.bat
```

### Option B: Using PowerShell
```powershell
cd d:\Wellfound-1
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\setup.ps1
```

**This will:**
- ✅ Verify Node.js is installed
- ✅ Install backend dependencies
- ✅ Install frontend dependencies
- ✅ Verify .env files
- ✅ Show you next steps

---

## 🎯 Step 2: Start the Backend (Terminal 1)

```bash
cd d:\Wellfound-1\backend
npm run dev
```

**Expected Output:**
```
Server is running on port 5000
MongoDB connected: cluster0.klxyhhj.mongodb.net
✓ Ready for API requests
```

---

## 🎯 Step 3: Start the Frontend (Terminal 2)

```bash
cd d:\Wellfound-1\frontend
npm run dev
```

**Expected Output:**
```
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
- info compiled successfully
✓ Ready to accept requests
```

---

## 🎯 Step 4: Test in Browser

1. **Open:** http://localhost:3000
2. **You should see:** EventHire form with title "Find Your Perfect Event Team"
3. **No errors** in the browser console

---

## 📝 Step 5: Fill and Submit the Form

### Example Data:

**Step 1 - Event Details:**
- Event Name: `Tech Conference 2026`
- Event Type: `Conference`
- Event Date: `Pick any future date`
- Location: `San Francisco, CA`
- Venue: `Moscone Center`

**Step 2 - Vendor Type:**
- Select: `Event Planner`

**Step 3 - Planner Details:**
- Services: Check `Venue Selection`, `Catering`, `Timeline & Schedule`
- Budget: `100000`
- Notes: `Need experienced professional`

**Step 4 - Contact Info:**
- Full Name: `Your Name`
- Email: `your.email@gmail.com`
- Phone: `+1-555-0000`

**Submit** → Should see **green success message** with Requirement ID

---

## 🗄️ Step 6: Verify Data in MongoDB

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Login to your account
3. Click your cluster
4. Click "Collections"
5. Click "Requirements" collection
6. **You should see your submitted data!**

Check:
- ✅ eventName
- ✅ vendorType: "event-planner"
- ✅ plannerDetails with services
- ✅ contactInfo with email
- ✅ Timestamps

---

## 🔍 Step 7: Check API Request (DevTools)

1. Open http://localhost:3000 again
2. Press **F12** (Open DevTools)
3. Go to **Network** tab
4. **Clear** previous requests
5. Fill form and **Submit**
6. Look for **POST** request to `/api/requirements`
7. Click on it and check:
   - **Request Headers:** Content-Type: application/json
   - **Request Body:** All your form data
   - **Response:** Status 201 Created
   - **Response Body:** Success message with _id

---

## ✅ Troubleshooting

### Backend Won't Start

**Error:** "MongoDB connected" not showing

**Solution:**
1. Check MongoDB URI in `backend\.env`
2. Verify username and password
3. Check MongoDB Atlas cluster is running
4. Try: `npm install` again in backend folder

```bash
cd backend
npm install
npm run dev
```

### Frontend Won't Connect to Backend

**Error:** Form submission fails, CORS error

**Solution:**
1. Verify backend is running on port 5000
2. Check `frontend\.env.local` has correct API URL:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```
3. Restart frontend:
   ```bash
   cd frontend
   npm run dev
   ```

### Port 3000 or 5000 Already in Use

**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (replace PID with actual number)
taskkill /PID <PID> /F

# Or change port in .env
```

### Form Submits But No Success Message

**Solution:**
1. Open browser DevTools (F12)
2. Check Console for errors
3. Check Network tab for API response
4. Verify backend logs show the request

---

## 📋 Verification Checklist

- [ ] Node.js installed (`node -v` shows version)
- [ ] npm installed (`npm -v` shows version)
- [ ] Backend .env created with MongoDB URI
- [ ] Frontend .env.local created with API URL
- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:3000
- [ ] Form loads without errors
- [ ] Form submits successfully
- [ ] Success message shows with ID
- [ ] Data appears in MongoDB

---

## 🎯 Next Steps After Local Testing

Once everything works locally:

1. **Deploy Backend** (Render.com)
2. **Deploy Frontend** (Vercel)
3. **Test Live URLs**
4. **Record Demo Video**
5. **Submit Project**

See [SETUP_GUIDE.md](../SETUP_GUIDE.md) for deployment instructions.

---

## 📞 Commands Reference

```bash
# Install dependencies (one time)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production build
npm start

# Check logs
# Windows: Scroll up in terminal
# Or redirect to file: npm run dev > log.txt
```

---

## 🎉 You're Ready!

Everything is configured and ready to test locally.

**Start with the setup script, then follow Steps 2-6 above!**

Good luck! 🚀

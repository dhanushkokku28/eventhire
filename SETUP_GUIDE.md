# 🚀 Wellfound - Complete Setup & Deployment Guide

This guide will walk you through setting up, testing, and deploying the complete Wellfound application.

## 📋 Pre-Deployment Checklist

Before you start, ensure you have:

- [ ] Node.js v16+ installed (`node --version`)
- [ ] npm or yarn installed
- [ ] Git installed and configured
- [ ] GitHub account created
- [ ] MongoDB Atlas account (free tier is fine)
- [ ] Vercel account (for frontend deployment)
- [ ] Render or Heroku account (for backend deployment - optional for local testing)

---

## 🏗️ Local Setup (Development)

### Step 1: Prepare MongoDB

1. **Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)**
2. **Create a free account** (if you don't have one)
3. **Create a new Project** named "Wellfound"
4. **Create a Cluster**:
   - Select "Free" tier
   - Choose a region close to you
   - Click "Create Cluster"
5. **Create Database User**:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `wellfound_user`
   - Password: (generate strong password and save it)
   - Click "Add User"
6. **Get Connection String**:
   - Go to "Database" > "Connect"
   - Click "Connect your application"
   - Copy the connection string
   - Replace `<username>` and `<password>` with your credentials
   - Save this string - you'll need it!

### Step 2: Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MongoDB URI
# MONGODB_URI=mongodb+srv://wellfound_user:YOUR_PASSWORD@cluster.mongodb.net/wellfound
# PORT=5000
# NODE_ENV=development
# CORS_ORIGIN=http://localhost:3000

# Start backend in development mode
npm run dev
```

**Expected output:**
```
Server is running on port 5000
MongoDB connected: cluster0.xxxxx.mongodb.net
```

**Test the backend:**
```bash
# In another terminal, test the health endpoint
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Backend is running",
  "timestamp": "2024-01-30T..."
}
```

### Step 3: Setup Frontend

```bash
# Open new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.local.example .env.local

# .env.local should contain:
# NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Start frontend development server
npm run dev
```

**Expected output:**
```
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
- info it ready for requests
```

### Step 4: Test the Complete Flow

1. **Open Frontend:**
   - Go to http://localhost:3000 in your browser
   - You should see the Wellfound form

2. **Test Form (Example Data):**
   - **Step 1:**
     - Event Name: "Tech Conference 2024"
     - Event Type: "Conference"
     - Event Date: Pick any future date
     - Location: "San Francisco, CA"
     - Venue: "Moscone Center"
   - **Step 2:**
     - Select: "Event Planner"
   - **Step 3:**
     - Services: Check "Venue Selection", "Catering", "Timeline & Schedule"
     - Budget: 100000
     - Notes: "Need experienced corporate event planner"
   - **Step 4:**
     - Full Name: "Jane Smith"
     - Email: "jane@example.com"
     - Phone: "+1-555-123-4567"
   - Click "Submit Requirement"

3. **Verify Success:**
   - Should see green success message with Requirement ID
   - Form should reset

4. **Check MongoDB:**
   - Go to MongoDB Atlas
   - Select your database
   - Go to Collections > Requirements
   - Should see your submitted data
   - Verify `vendorType` field shows "event-planner"

---

## 🌍 Deployment

### Frontend Deployment (Vercel)

**Option A: Using Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend directory
cd frontend

# Deploy
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: wellfound-frontend
# - Which directory? ./
# - Confirm? Yes

# Add environment variables
# - Go to Vercel dashboard
# - Select your project
# - Settings > Environment Variables
# - Add: NEXT_PUBLIC_API_URL = https://your-backend-url.com/api
# - Redeploy

# Copy your frontend URL (e.g., https://wellfound-frontend.vercel.app)
```

**Option B: Using Vercel Web Interface**

1. **Push code to GitHub**
```bash
cd frontend
git init
git add .
git commit -m "Initial frontend commit"
git push origin main
```

2. **Deploy on Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Select your GitHub repository
   - Click "Import"
   - Add Environment Variables:
     - `NEXT_PUBLIC_API_URL`: Your backend URL
   - Click "Deploy"

3. **Your frontend is live!**
   - Copy the Vercel URL

### Backend Deployment (Render - Recommended)

1. **Push Backend to GitHub**
```bash
cd backend
git init
git add .
git commit -m "Initial backend commit"
git push origin main
```

2. **Deploy on Render**
   - Go to https://render.com
   - Sign up / Log in
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub account
   - Select your backend repository
   - Configure:
     - **Name:** wellfound-backend
     - **Runtime:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `node server.js`
   - Add Environment Variables:
     - `MONGODB_URI`: Your MongoDB Atlas URI
     - `PORT`: 5000
     - `NODE_ENV`: production
     - `CORS_ORIGIN`: https://your-vercel-frontend-url.vercel.app
   - Click "Create Web Service"

3. **Copy Backend URL**
   - Wait for deployment (2-3 minutes)
   - Copy the service URL (e.g., https://wellfound-backend.onrender.com)

4. **Update Frontend with Backend URL**
   - Go to Vercel Dashboard
   - Select your frontend project
   - Settings > Environment Variables
   - Update `NEXT_PUBLIC_API_URL` to your Render backend URL
   - Redeploy

### Test Deployed Application

1. **Open your frontend URL** (e.g., https://wellfound-frontend.vercel.app)
2. **Fill and submit the form**
3. **Check MongoDB** to verify data was saved
4. **Verify success message shows Requirement ID**

---

## 📊 Verifying Data Storage

### Via MongoDB Atlas

1. Go to MongoDB Atlas
2. Click your project
3. Click "Collections"
4. Select your database
5. You'll see:
   - `Requirements` collection with your form submissions
   - Each document shows:
     - All event details
     - **vendorType**: "event-planner", "performer", or "crew"
     - vendor-specific details based on the type
     - Contact information
     - Timestamps

### Via API

```bash
# Get all requirements
curl https://your-backend-url.com/api/requirements

# Get requirements for specific vendor type
curl "https://your-backend-url.com/api/requirements?vendorType=event-planner"

# Get specific requirement
curl https://your-backend-url.com/api/requirements/REQUIREMENT_ID
```

---

## 🎬 Creating Screen Recording

Follow these steps to create a demo recording:

### Recording Software
- **Windows**: OBS Studio (free) or Windows 11 built-in
- **Mac**: QuickTime
- **Linux**: OBS Studio

### Recording Steps

1. **Setup (show code structure)**
   - Show GitHub repository with backend + frontend folders
   - Show MongoDB Atlas setup

2. **Form Flow**
   - Open frontend URL
   - Walk through Step 1 (enter event details)
   - Progress to Step 2 (select vendor type)
   - Progress to Step 3 (fill vendor-specific details)
   - Progress to Step 4 (enter contact info)
   - Click Submit

3. **API Request/Response**
   - Open browser DevTools (F12)
   - Go to Network tab
   - Clear previous requests
   - Submit form again
   - Show POST request to `/api/requirements`
   - Click on request and show:
     - Request body (all form data)
     - Response (success message with ID)
     - Response headers (200 status)

4. **Data in MongoDB**
   - Open MongoDB Atlas in split screen
   - Refresh Collections view
   - Show the new requirement document
   - Expand to show:
     - Basic event details
     - vendorType field
     - Type-specific details (vendor details)
     - Contact information
     - Timestamps

5. **Submit Different Vendor Types** (optional but impressive)
   - Submit another requirement as "Performer"
   - Show different fields in Step 3
   - Show different data structure in MongoDB

### Recording Tips
- **Duration**: 5-7 minutes
- **Narration**: Explain each step
- **Pacing**: Not too fast, not too slow
- **Quality**: 1080p or better
- **Format**: MP4

### Uploading Recording
- YouTube (unlisted)
- Google Drive
- Loom (free)
- Include link in your submission

---

## 📝 Form Submission Checklist

### Live URLs
- [ ] Frontend URL (Vercel) - e.g., https://wellfound-frontend.vercel.app
- [ ] Backend URL (Render) - e.g., https://wellfound-backend.onrender.com
- [ ] Test form submission on live URLs
- [ ] Verify data appears in MongoDB

### GitHub Repository
- [ ] Code pushed to GitHub
- [ ] Both frontend and backend included
- [ ] README files present
- [ ] .env.example files present
- [ ] .gitignore properly configured
- [ ] Clean commit history

### Screen Recording
- [ ] 5-7 minutes duration
- [ ] Shows form flow (all 4 steps)
- [ ] Shows API request/response
- [ ] Shows MongoDB data storage
- [ ] Shows vendor type categorization
- [ ] Test with at least 2 vendor types

### Documentation
- [ ] Root README with setup guide
- [ ] Backend README with API documentation
- [ ] Frontend README with component documentation
- [ ] Deployment instructions included
- [ ] Environment variables documented

---

## 🆘 Troubleshooting

### "Cannot connect to backend" in frontend
```
Solution:
1. Verify backend is running
2. Check NEXT_PUBLIC_API_URL is correct
3. Check CORS_ORIGIN in backend matches frontend URL
4. Restart both frontend and backend
```

### "MongoDB connection error"
```
Solution:
1. Check MongoDB Atlas connection string
2. Verify database user credentials
3. Check if your IP is whitelisted in MongoDB Atlas
4. Verify MONGODB_URI format is correct
```

### "Form doesn't validate"
```
Solution:
1. Check browser console for error messages
2. Fill all required fields (marked with *)
3. Verify email format is valid
4. Check that at least one checkbox is selected (for planner/crew)
```

### "Data not saving to MongoDB"
```
Solution:
1. Check backend logs for errors
2. Verify database connection is successful
3. Check MongoDB Atlas user has write permissions
4. Restart backend and retry submission
```

### "CORS error on frontend"
```
Solution:
1. Check CORS_ORIGIN in backend .env matches frontend URL
2. Include trailing slash if needed
3. Restart backend after changing CORS_ORIGIN
4. Check browser console for exact error message
```

---

## 📚 Additional Resources

- [MongoDB Atlas Documentation](https://docs.mongodb.com/atlas/)
- [Express.js Documentation](https://expressjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Render Deployment Guide](https://render.com/docs)

---

## ✅ Final Checklist Before Submission

- [ ] Frontend deployed and working
- [ ] Backend deployed and working
- [ ] Form fills all 4 steps correctly
- [ ] Data saved to MongoDB with correct vendor type categorization
- [ ] API requests visible in network tab
- [ ] Screen recording completed (5-7 min)
- [ ] GitHub repository public with all code
- [ ] README files complete and clear
- [ ] All environment variables documented
- [ ] No sensitive information in code

---

**You're all set! 🎉 Ready to submit your working requirement posting flow!**

# 🎯 Quick Reference Guide

## 📦 What You Have

Complete full-stack event requirement posting application with:

### Frontend (Next.js)
- ✅ 4-step multi-step form with progress tracking
- ✅ Dynamic form fields based on vendor type selection
- ✅ Client-side validation with error messages
- ✅ Beautiful, responsive UI with CSS modules
- ✅ Axios API integration
- ✅ Success/error messaging

### Backend (Express + MongoDB)
- ✅ REST API with 5 endpoints
- ✅ MongoDB integration with Mongoose
- ✅ Server-side validation
- ✅ Proper error handling
- ✅ CORS configuration
- ✅ Data categorization by vendor type

### Database (MongoDB)
- ✅ Automatic vendor type categorization
- ✅ Type-specific data fields
- ✅ Indexed queries for performance
- ✅ Timestamps and metadata

---

## 🚀 Getting Started (5 minutes)

### Prerequisites Check
```bash
node --version    # Should be v16+
npm --version     # Any recent version
git --version     # Any recent version
```

### Quick Start Commands

**Terminal 1 - Backend:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

**Open Browser:**
```
http://localhost:3000
```

---

## 📋 Form Data Example

### Event Planner Submission
```json
{
  "eventName": "Tech Conference 2024",
  "eventType": "conference",
  "eventDate": "2024-06-15",
  "location": "San Francisco, CA",
  "venue": "Moscone Center",
  "vendorType": "event-planner",
  "contactInfo": {
    "fullName": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+1-555-123-4567"
  },
  "plannerDetails": {
    "servicesNeeded": ["Venue Selection", "Catering"],
    "budget": 100000,
    "additionalNotes": "Need experienced corporate planner"
  }
}
```

### Performer Submission
```json
{
  "eventName": "Wedding Reception",
  "eventType": "wedding",
  "eventDate": "2024-07-20",
  "location": "New York, NY",
  "venue": "Plaza Hotel",
  "vendorType": "performer",
  "contactInfo": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1-555-987-6543"
  },
  "performerDetails": {
    "performanceType": "DJ",
    "duration": "5 hours",
    "performanceStyle": "Pop & Hip Hop",
    "additionalNotes": "Prefer modern equipment"
  }
}
```

### Crew Submission
```json
{
  "eventName": "Concert 2024",
  "eventType": "concert",
  "eventDate": "2024-08-10",
  "location": "Los Angeles, CA",
  "venue": "Hollywood Bowl",
  "vendorType": "crew",
  "contactInfo": {
    "fullName": "Mike Johnson",
    "email": "mike@example.com",
    "phone": "+1-555-555-5555"
  },
  "crewDetails": {
    "crewType": ["Lighting", "Sound System", "Stage Setup"],
    "numberOfMembers": 8,
    "experienceLevel": "Expert",
    "additionalNotes": "Need professional touring experience"
  }
}
```

---

## 🔑 Key Features

| Feature | Backend | Frontend |
|---------|---------|----------|
| **Validation** | Server-side | Client-side |
| **Storage** | MongoDB | Browser state |
| **API** | REST endpoints | Axios client |
| **CORS** | Configured | Built-in |
| **Error Handling** | Standardized responses | User-friendly messages |
| **Data Types** | Strict schema | Dynamic forms |

---

## 📂 File Structure Quick Reference

```
backend/
├── server.js                 # Entry point
├── config/database.js        # MongoDB connection
├── models/Requirement.js     # Data schema
├── routes/requirements.js    # API routes
├── controllers/              # Business logic
└── .env                      # Configuration

frontend/
├── app/layout.js             # Root layout
├── app/page.js               # Home page
├── components/
│   ├── RequirementForm.js    # Main form
│   ├── ProgressBar.js        # Progress indicator
│   └── steps/                # Form steps
├── utils/
│   ├── api.js                # API calls
│   └── constants.js          # Form options
└── .env.local                # Configuration
```

---

## 🔌 API Endpoints Cheat Sheet

```bash
# Create requirement
POST /api/requirements
{ all form data }

# Get all
GET /api/requirements

# Filter by vendor type
GET /api/requirements?vendorType=event-planner

# Get by ID
GET /api/requirements/:id

# Update
PUT /api/requirements/:id

# Delete
DELETE /api/requirements/:id

# Health check
GET /api/health
```

---

## 🧪 Testing Checklist

- [ ] Form Step 1: Can fill all fields
- [ ] Form Step 2: Can select vendor type
- [ ] Form Step 3: Shows correct fields for selected vendor
- [ ] Form Step 4: Contact info accepted
- [ ] Form Submission: Success message appears
- [ ] API Request: Shows in DevTools Network tab
- [ ] MongoDB: Data visible in Atlas
- [ ] Vendor Type: Correctly categorized in database

---

## 🌍 Deployment Quick Links

| Service | URL | Time |
|---------|-----|------|
| **Vercel** | https://vercel.com | 5 min |
| **Render** | https://render.com | 10 min |
| **Heroku** | https://heroku.com | 10 min |
| **MongoDB Atlas** | https://atlas.mongodb.com | Setup 1x |

---

## 🛠️ Common Commands

```bash
# Backend
npm run dev          # Start development server
npm start            # Start production server
npm install          # Install dependencies

# Frontend
npm run dev          # Start dev server
npm run build        # Create production build
npm start            # Start production build
npm install          # Install dependencies

# Git
git init             # Initialize repo
git add .            # Stage all files
git commit -m "msg"  # Commit changes
git push             # Push to GitHub
```

---

## 📊 MongoDB Query Examples

```javascript
// Get all requirements
db.requirements.find({})

// Get by vendor type
db.requirements.find({ vendorType: "event-planner" })

// Get pending planners
db.requirements.find({ 
  vendorType: "event-planner", 
  status: "pending" 
})

// Count by vendor type
db.requirements.countDocuments({ vendorType: "performer" })

// Get recent requirements
db.requirements.find({}).sort({ createdAt: -1 }).limit(10)
```

---

## 🔒 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 🎬 Screen Recording Tips

1. **Show These Steps:**
   - ✓ Fill Step 1 (Event details)
   - ✓ Select vendor in Step 2
   - ✓ Fill Step 3 (Vendor details)
   - ✓ Enter contact info in Step 4
   - ✓ Submit form
   - ✓ Show success message
   - ✓ Show network request/response
   - ✓ Show MongoDB data

2. **Keep it:**
   - Between 5-7 minutes
   - Clear and audible
   - 1080p quality
   - Steady camera/screen

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Backend won't start | Check MongoDB URI in .env |
| Frontend can't connect | Verify NEXT_PUBLIC_API_URL |
| CORS error | Check CORS_ORIGIN matches frontend |
| Data not saving | Verify MongoDB user permissions |
| Form validation fails | Fill all required fields (marked *) |
| Email rejected | Use valid email format |

---

## ✅ Before Submission

1. **Code Quality**
   - Clean, commented code
   - No console errors
   - Proper error handling

2. **Functionality**
   - All 4 form steps work
   - All 3 vendor types work
   - Data saves to MongoDB
   - API requests successful

3. **Documentation**
   - README files complete
   - Setup guide clear
   - API documented

4. **Deployment**
   - Frontend on Vercel
   - Backend on Render/Heroku
   - Live URLs working

5. **Recording**
   - 5-7 minutes
   - Shows full flow
   - Shows API & database

---

## 📞 Support Resources

- **Backend Issues**: See [backend/README.md](backend/README.md)
- **Frontend Issues**: See [frontend/README.md](frontend/README.md)
- **Setup Help**: See [SETUP_GUIDE.md](SETUP_GUIDE.md)
- **Architecture**: See [ARCHITECTURE.md](ARCHITECTURE.md)

---

**You have everything needed. You're ready to build! 🚀**

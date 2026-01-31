# EventHire - Event Requirement Posting Platform

A complete full-stack solution for posting event requirements and connecting with professional vendors (Event Planners, Performers, and Crew).

### Live Frontend URL
https://eventhire-28.vercel.app/

## 🎯 Project Overview

EventHire is a 3-4 step form-based application that allows event organizers to:
1. Enter basic event details
2. Select the type of vendor they need
3. Provide vendor-specific requirements
4. Submit their information for vendors to review

The data is categorized based on vendor type and stored securely in MongoDB.

## 📁 Project Structure

```
Wellfound-1/
├── backend/
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API endpoints
│   ├── controllers/         # Business logic
│   ├── config/              # Database configuration
│   ├── server.js            # Express server
│   ├── package.json         # Backend dependencies
│   ├── .env.example         # Environment variables template
│   ├── README.md            # Backend documentation
│   └── .gitignore           # Git ignore rules
│
└── frontend/
    ├── app/                 # Next.js app directory
    ├── components/          # Reusable components
    │   ├── RequirementForm.js
    │   ├── ProgressBar.js
    │   └── steps/           # Form step components
    ├── utils/               # Helper functions and constants
    ├── public/              # Static assets
    ├── package.json         # Frontend dependencies
    ├── .env.local.example   # Environment variables template
    ├── README.md            # Frontend documentation
    └── .gitignore           # Git ignore rules
```

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 16+ installed
- MongoDB Atlas account (or local MongoDB)
- Git installed
- GitHub account

### Backend Setup

1. **Navigate to backend folder**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
cp .env.example .env
```
Edit `.env` with your MongoDB URI:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wellfound
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

4. **Start the backend**
```bash
npm run dev
```
Backend runs on `http://localhost:5000`

### Frontend Setup

1. **Open new terminal and navigate to frontend**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
cp .env.local.example .env.local
```
Edit `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. **Start the frontend**
```bash
npm run dev
```
Frontend runs on `http://localhost:3000`

## 📋 Form Flow

### Step 1: Event Basic Details
- Event Name
- Event Type (Wedding, Corporate, Birthday, Concert, Conference, Other)
- Event Date
- Optional Date Range (for multi-day events)
- Location
- Venue (optional)

### Step 2: Vendor Type Selection
Choose one of:
- **📋 Event Planner** - For comprehensive event planning services
- **🎤 Performer** - For entertainment/talent
- **👥 Crew** - For technical and support staff

### Step 3: Vendor-Specific Details
Based on Step 2 selection:

**Event Planner:**
- Services needed (Venue, Catering, Decoration, etc.)
- Budget
- Additional notes

**Performer:**
- Type of performance (DJ, Live Band, Singer, etc.)
- Duration
- Performance style
- Additional notes

**Crew:**
- Specializations (Lighting, Sound, Photography, etc.)
- Number of members
- Experience level
- Additional notes

### Step 4: Review & Contact Information
- Review all entered information
- Enter contact details (Full Name, Email, Phone)
- Submit requirement

## 🗄️ MongoDB Collections

### Requirements Collection
```javascript
{
  // Basic Event Info
  eventName: String,
  eventType: String,
  eventDate: Date,
  eventDateRange: { startDate, endDate },
  location: String,
  venue: String,
  
  // Vendor Categorization (INDEXED)
  vendorType: 'event-planner' | 'performer' | 'crew',
  
  // Type-Specific Details
  plannerDetails: { servicesNeeded, budget, notes },
  performerDetails: { type, duration, style, notes },
  crewDetails: { specializations, members, level, notes },
  
  // Contact Info
  contactInfo: { fullName, email, phone },
  
  // Metadata
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected',
  createdAt: Date,
  updatedAt: Date
}
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/requirements` | Create new requirement |
| GET | `/api/requirements` | Get all requirements (with filters) |
| GET | `/api/requirements/:id` | Get requirement by ID |
| PUT | `/api/requirements/:id` | Update requirement |
| DELETE | `/api/requirements/:id` | Delete requirement |

### Example: Create Requirement
```bash
curl -X POST http://localhost:5000/api/requirements \
  -H "Content-Type: application/json" \
  -d '{
    "eventName": "Wedding Reception",
    "eventType": "wedding",
    "eventDate": "2024-06-15",
    "location": "New York, NY",
    "venue": "Grand Ballroom",
    "vendorType": "event-planner",
    "contactInfo": {
      "fullName": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890"
    },
    "plannerDetails": {
      "servicesNeeded": ["Venue Selection", "Catering"],
      "budget": 50000
    }
  }'
```

## 🎨 Features

✅ **Dynamic Forms** - Form fields adapt based on vendor selection  
✅ **Progress Tracking** - Visual indicator shows current step  
✅ **Form Validation** - Real-time validation with clear error messages  
✅ **Responsive Design** - Works on desktop, tablet, and mobile  
✅ **Data Categorization** - Automatic categorization by vendor type  
✅ **MongoDB Integration** - Secure data storage with proper indexing  
✅ **REST API** - Clean, well-documented API endpoints  
✅ **Error Handling** - Comprehensive error handling on both frontend and backend  
✅ **Environment Configuration** - Easy setup with environment variables  

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. **Push code to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Add environment variable: `NEXT_PUBLIC_API_URL=your-backend-url`
   - Click Deploy

### Backend Deployment (Render or Heroku)

**Option 1: Render**
1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repo
4. Set environment variables
5. Deploy

**Option 2: Heroku**
```bash
heroku create your-app-name
heroku config:set MONGODB_URI=your-mongodb-uri
git push heroku main
```

## 🔒 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://...
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📊 Technology Stack

### Frontend
- **Next.js** - React framework for production
- **React 18** - UI library
- **CSS Modules** - Component-scoped styling
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing

## 🧪 Testing the Application

1. **Start Backend**
```bash
cd backend && npm run dev
```

2. **Start Frontend** (in another terminal)
```bash
cd frontend && npm run dev
```

3. **Test Form Flow**
   - Open http://localhost:3000
   - Fill Step 1: Event details
   - Proceed to Step 2: Select vendor type
   - Proceed to Step 3: Fill vendor-specific details
   - Proceed to Step 4: Enter contact info and submit
   - Check MongoDB Atlas to verify data is stored

4. **Verify Data in MongoDB**
   - Log in to MongoDB Atlas
   - Select your database
   - Go to Collections > Requirements
   - Verify the submitted data is there with correct vendor type

## 📝 API Response Examples

### Successful Submission
```json
{
  "success": true,
  "message": "Requirement posted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "eventName": "Wedding Reception",
    "vendorType": "event-planner",
    "createdAt": "2024-01-30T12:00:00.000Z"
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Missing required fields",
  "error": "Event name is required"
}
```

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Cannot connect to backend | Verify backend is running and NEXT_PUBLIC_API_URL is correct |
| CORS error | Check CORS_ORIGIN in backend .env matches frontend URL |
| MongoDB connection error | Verify MONGODB_URI is correct and MongoDB Atlas allows your IP |
| Form validation errors | Check browser console for specific field errors |
| Data not saving | Verify MongoDB connection and check server logs |

## 📚 Documentation

- [Backend README](./backend/README.md) - Detailed backend documentation
- [Frontend README](./frontend/README.md) - Detailed frontend documentation

## 📞 Support & Questions

For issues:
1. Check the relevant README (backend or frontend)
2. Review the error messages in console logs
3. Verify environment variables are set correctly
4. Check MongoDB Atlas connection status

## ✨ Next Steps for Improvement

- Add authentication and user accounts
- Implement vendor matching algorithm
- Add notification system
- Create admin dashboard
- Add file upload for proposals
- Implement payment processing
- Add real-time chat between users and vendors
- Create mobile apps (React Native)

## 📄 License

This project is open source and available for learning and development purposes.

---

**Ready to launch? Follow the Quick Start Guide above!** 🚀

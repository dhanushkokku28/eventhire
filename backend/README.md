# Wellfound - Event Requirement Backend

Professional backend service for posting and managing event requirements across different vendor types.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your MongoDB URI:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wellfound
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Running the Server

**Development mode** (with hot reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

Server runs on `http://localhost:5000`

## 📚 API Endpoints

### Create a Requirement
**POST** `/api/requirements`

Request body:
```json
{
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
    "budget": 50000,
    "additionalNotes": "Need experienced planner"
  }
}
```

Response:
```json
{
  "success": true,
  "message": "Requirement posted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "eventName": "Wedding Reception",
    ...
  }
}
```

### Get All Requirements
**GET** `/api/requirements`

Query parameters:
- `vendorType`: Filter by vendor type (event-planner, performer, crew)
- `status`: Filter by status (pending, reviewed, accepted, rejected)

Example: `GET /api/requirements?vendorType=event-planner&status=pending`

Response:
```json
{
  "success": true,
  "count": 5,
  "data": [...]
}
```

### Get Requirement by ID
**GET** `/api/requirements/:id`

Response returns a single requirement object.

### Update Requirement
**PUT** `/api/requirements/:id`

Update any fields of an existing requirement.

### Delete Requirement
**DELETE** `/api/requirements/:id`

Permanently deletes a requirement.

## 📊 Data Categorization

Requirements are automatically categorized by `vendorType`:

### Event Planner (`event-planner`)
- Services needed (Venue Selection, Catering, Decoration, etc.)
- Budget information
- Additional notes

### Performer (`performer`)
- Performance type (DJ, Live Band, Singer, etc.)
- Duration of performance
- Performance style
- Additional notes

### Crew (`crew`)
- Crew specializations (Lighting, Sound, Photography, etc.)
- Number of members
- Experience level
- Additional notes

## 🗄️ MongoDB Schema

The `Requirement` schema includes:
- Basic event details (name, type, date, location, venue)
- Vendor type (indexed for efficient queries)
- Type-specific details based on vendor type
- Contact information
- Status tracking
- Timestamps

### Indexes
- `vendorType` - for filtering requirements by vendor type
- `vendorType + createdAt` - for efficient sorted queries

## 🔧 Configuration

### CORS Settings
By default, CORS is configured to accept requests from `http://localhost:3000`. Update the `CORS_ORIGIN` environment variable for production.

### MongoDB Connection
The backend uses Mongoose for MongoDB operations with connection pooling enabled.

## 🛡️ Error Handling

All endpoints return standardized error responses:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## 📝 Validation

The backend validates:
- Required fields for all requirement types
- Email format
- Vendor-specific required fields
- Data types and constraints

## 🚀 Deployment

### Deploy to Render (Recommended)

1. Push code to GitHub
2. Connect GitHub repo to Render
3. Set environment variables in Render dashboard
4. Deploy with one click

### Deploy to Heroku

1. Install Heroku CLI
2. Run: `heroku create your-app-name`
3. Set environment variables: `heroku config:set MONGODB_URI=...`
4. Deploy: `git push heroku main`

## 📖 Architecture

```
backend/
├── models/           # MongoDB schemas
├── routes/           # API route definitions
├── controllers/      # Business logic
├── config/           # Configuration files
├── server.js         # Express app setup
└── package.json      # Dependencies
```

## 🔍 Health Check

Test if the server is running:
```bash
curl http://localhost:5000/api/health
```

Response:
```json
{
  "success": true,
  "message": "Backend is running",
  "timestamp": "2024-01-30T12:00:00.000Z"
}
```

## 📞 Support

For issues or questions, refer to the main README in the project root.

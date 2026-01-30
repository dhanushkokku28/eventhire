# Wellfound - Event Requirement Frontend

Modern Next.js frontend for posting and managing event requirements with dynamic vendor-specific forms.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Backend API running (see backend README)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

For production (Vercel deployment):
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📋 Form Flow

The application guides users through a 4-step form process:

### Step 1: Basic Event Details
- Event name
- Event type (Wedding, Corporate, Birthday, Concert, Conference, Other)
- Event date
- Optional date range (for multi-day events)
- Location
- Venue (optional)

### Step 2: Select Vendor Type
- Event Planner 📋
- Performer 🎤
- Crew 👥

Each selection shows a description of the vendor type.

### Step 3: Vendor-Specific Details

**For Event Planner:**
- Services needed (select multiple)
- Budget
- Additional notes

**For Performer:**
- Type of performance
- Duration
- Performance style
- Additional notes

**For Crew:**
- Specializations needed
- Number of crew members
- Experience level
- Additional notes

### Step 4: Review & Contact Information
- Summary of all provided information
- Contact details (Full Name, Email, Phone)
- Form submission

## 🎨 Features

✅ **Responsive Design** - Works on desktop and mobile  
✅ **Progress Tracking** - Visual progress bar with step indicators  
✅ **Dynamic Forms** - Form fields change based on vendor type  
✅ **Validation** - Real-time field validation with error messages  
✅ **API Integration** - Seamless communication with backend  
✅ **Success Feedback** - Clear confirmation with requirement ID  
✅ **Form Reset** - Automatic reset after successful submission  

## 📁 Project Structure

```
frontend/
├── app/
│   ├── layout.js         # Root layout
│   ├── page.js           # Home page
│   └── globals.css       # Global styles
├── components/
│   ├── RequirementForm.js        # Main form component
│   ├── ProgressBar.js            # Progress indicator
│   └── steps/
│       ├── Step1BasicDetails.js  # Event details form
│       ├── Step2VendorSelection.js # Vendor type selection
│       ├── Step3VendorDetails.js  # Type-specific fields
│       └── Step4ReviewSubmit.js   # Review & contact info
├── utils/
│   ├── api.js            # API client
│   └── constants.js      # Form options and data
├── public/               # Static assets
└── package.json          # Dependencies
```

## 🔌 API Integration

### API Client Configuration

The frontend uses Axios for API calls. Configure the base URL in `.env.local`:

```javascript
// utils/api.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const submitRequirement = async (data) => {
  const response = await apiClient.post("/requirements", data);
  return response.data;
};
```

### Request Format

When the form is submitted, the data is sent to `/api/requirements`:

```javascript
{
  eventName: string,
  eventType: string,
  eventDate: date,
  eventDateRange: { startDate, endDate },
  location: string,
  venue: string,
  vendorType: 'event-planner' | 'performer' | 'crew',
  contactInfo: {
    fullName: string,
    email: string,
    phone: string
  },
  plannerDetails / performerDetails / crewDetails
}
```

## 🎯 Component Details

### RequirementForm Component
Main container that manages:
- Form state
- Step navigation
- Validation logic
- API submission
- Error/success messaging

### ProgressBar Component
Displays:
- Progress bar with visual fill
- Step indicators with numbers
- Checkmark for completed steps

### Form Step Components
- **Step1BasicDetails**: Collects core event information
- **Step2VendorSelection**: Interactive vendor type selection
- **Step3VendorDetails**: Dynamic fields based on vendor type
- **Step4ReviewSubmit**: Data review and contact collection

## 🎨 Styling

Uses CSS Modules for component-scoped styles with:
- Modern gradient backgrounds
- Smooth transitions and animations
- Responsive grid layouts
- Accessible color schemes

## 📦 Building for Production

```bash
npm run build
npm start
```

This creates an optimized production build.

## 🚀 Deployment to Vercel

1. **Push to GitHub**
```bash
git push origin main
```

2. **Connect to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Select your GitHub repository
- Set environment variables (NEXT_PUBLIC_API_URL)
- Deploy

3. **Update Backend URL**
```
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
```

## 🔒 Environment Variables

### Development (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Production (Vercel)
```
NEXT_PUBLIC_API_URL=https://your-backend-production-url.com/api
```

⚠️ Only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## 🧪 Testing

### Manual Testing Checklist

- [ ] Fill form Step 1 with valid data
- [ ] Verify error when skipping required fields
- [ ] Select each vendor type and verify Step 3 changes
- [ ] Complete full form for each vendor type
- [ ] Submit and verify success message
- [ ] Check form resets after submission
- [ ] Test on mobile device
- [ ] Verify API is called with correct data

## 🐛 Troubleshooting

### "Cannot POST /api/requirements"
- Verify backend is running on correct port
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Ensure CORS is properly configured in backend

### Form doesn't progress
- Check browser console for JavaScript errors
- Verify all required fields are filled
- Check network tab in DevTools for API responses

### Page not loading
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `npm install`
- Restart dev server: `npm run dev`

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Axios Documentation](https://axios-http.com)
- [MDN Web Docs](https://developer.mozilla.org)

## 📞 Support

For backend issues, see backend README.  
For deployment issues, check Vercel dashboard logs.

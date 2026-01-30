# 🏗️ Wellfound - System Architecture & Data Flow

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     WELLFOUND APPLICATION                        │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────┐          ┌──────────────────────────┐
│   FRONTEND (Next.js)      │          │   BACKEND (Express)      │
│  ─────────────────────── │          │  ─────────────────────── │
│  • React Components       │          │  • REST API              │
│  • Multi-step Form        │          │  • Business Logic        │
│  • Client-side Validation │──HTTP───→│  • Data Validation       │
│  • State Management       │          │  • Error Handling        │
│  Port: 3000              │          │  Port: 5000              │
└──────────────────────────┘          └──────────────────────────┘
                                              │
                                              ↓
                                    ┌──────────────────┐
                                    │  MONGODB ATLAS   │
                                    │  ─────────────── │
                                    │ Collections:     │
                                    │ • Requirements   │
                                    └──────────────────┘
```

## Form Flow Diagram

```
START
  │
  ├─→ STEP 1: Basic Event Details
  │   • Event Name
  │   • Event Type
  │   • Event Date(s)
  │   • Location
  │   • Venue (optional)
  │   [VALIDATION: All required fields filled]
  │
  ├─→ STEP 2: Vendor Type Selection
  │   ├─ Event Planner 📋
  │   ├─ Performer 🎤
  │   └─ Crew 👥
  │   [VALIDATION: Vendor type selected]
  │   [DYNAMIC: Step 3 changes based on selection]
  │
  ├─→ STEP 3: Vendor-Specific Details
  │   │
  │   ├─ IF Planner:
  │   │  • Services Needed (checkboxes)
  │   │  • Budget
  │   │  • Additional Notes
  │   │
  │   ├─ IF Performer:
  │   │  • Performance Type
  │   │  • Duration
  │   │  • Style
  │   │  • Additional Notes
  │   │
  │   └─ IF Crew:
  │      • Specializations (checkboxes)
  │      • Number of Members
  │      • Experience Level
  │      • Additional Notes
  │   [VALIDATION: Type-specific fields filled]
  │
  ├─→ STEP 4: Review & Contact Info
  │   • Review Summary of all data
  │   • Full Name
  │   • Email (validated)
  │   • Phone Number
  │   [VALIDATION: Contact info complete & valid]
  │
  ├─→ SUBMIT
  │   • Send POST request to backend
  │   • Backend validates & saves to MongoDB
  │   • Show success message with ID
  │
  └─→ END (Form resets)
```

## Data Flow Diagram

```
┌─────────────────┐
│  USER FILLS     │
│  FORM STEP 1    │
└────────┬────────┘
         │
         ↓
┌────────────────────┐
│ FRONTEND STATE     │
│ UPDATE (setData)   │
└────────┬───────────┘
         │
         ↓
┌────────────────────────────┐
│ USER MOVES TO NEXT STEP     │
│ Validation Check (Client)   │
│ ✓ Required fields filled    │
│ ✓ Email format valid        │
│ ✓ Vendor-specific fields    │
└────────┬───────────────────┘
         │
    VALID? ──NO──→ Show error message
         │
        YES
         │
         ↓
┌────────────────────────────┐
│ ALL STEPS COMPLETE          │
│ User Clicks "Submit"        │
└────────┬───────────────────┘
         │
         ↓
┌────────────────────────────┐
│ PREPARE REQUEST PAYLOAD     │
│ {                           │
│   eventName,                │
│   eventType,                │
│   eventDate,                │
│   location,                 │
│   venue,                    │
│   vendorType,               │
│   contactInfo,              │
│   [planner|performer|crew]  │
│     Details                 │
│ }                           │
└────────┬───────────────────┘
         │
         ↓
┌────────────────────────────┐
│ HTTP POST REQUEST           │
│ /api/requirements           │
│ Headers:                    │
│   Content-Type: json        │
└────────┬───────────────────┘
         │
         ↓ (Network)
┌────────────────────────────┐
│ BACKEND RECEIVES REQUEST    │
│ Express Router              │
│ → requirementController     │
└────────┬───────────────────┘
         │
         ↓
┌────────────────────────────┐
│ SERVER-SIDE VALIDATION      │
│ ✓ Required fields present   │
│ ✓ vendorType valid          │
│ ✓ Type-specific details     │
│ ✓ Email format              │
└────────┬───────────────────┘
         │
    VALID? ──NO──→ Send error response (400)
         │
        YES
         │
         ↓
┌────────────────────────────┐
│ CREATE MONGODB DOCUMENT     │
│ new Requirement({           │
│   ...formData               │
│ })                          │
└────────┬───────────────────┘
         │
         ↓
┌────────────────────────────┐
│ SAVE TO MONGODB             │
│ INSERT INTO Requirements    │
│ Indexes:                    │
│   • vendorType              │
│   • vendorType + createdAt  │
└────────┬───────────────────┘
         │
    SAVED? ──NO──→ Send error response (500)
         │
        YES
         │
         ↓
┌────────────────────────────┐
│ SEND SUCCESS RESPONSE (201) │
│ {                           │
│   success: true,            │
│   data: {                   │
│     _id: "...",             │
│     vendorType: "...",      │
│     ...                     │
│   }                         │
│ }                           │
└────────┬───────────────────┘
         │
         ↓ (Network)
┌────────────────────────────┐
│ FRONTEND RECEIVES RESPONSE  │
│ Parse JSON                  │
│ Update State                │
└────────┬───────────────────┘
         │
         ↓
┌────────────────────────────┐
│ SHOW SUCCESS MESSAGE        │
│ • Green alert               │
│ • Requirement ID            │
│ • Success text              │
└────────┬───────────────────┘
         │
         ↓
┌────────────────────────────┐
│ RESET FORM (after 2 sec)    │
│ Clear all data              │
│ Return to Step 1            │
└────────────────────────────┘
```

## Database Schema

```
MONGODB: wellfound database
│
├─ Collections:
│  │
│  └─ Requirements
│     │
│     └─ Document Structure:
│        │
│        ├─ INDEXED FIELDS:
│        │  ├─ _id (ObjectId) - Primary Key
│        │  ├─ vendorType (String) ⭐ IMPORTANT
│        │  │  └─ Values: "event-planner" | "performer" | "crew"
│        │  └─ createdAt (Date) - Compound index with vendorType
│        │
│        ├─ BASIC EVENT DETAILS:
│        │  ├─ eventName (String, required, minlength: 3)
│        │  ├─ eventType (String, enum)
│        │  │  └─ Values: wedding, corporate, birthday, concert, conference, other
│        │  ├─ eventDate (Date, required)
│        │  ├─ eventDateRange (Object)
│        │  │  ├─ startDate (Date)
│        │  │  └─ endDate (Date)
│        │  ├─ location (String, required)
│        │  └─ venue (String, optional)
│        │
│        ├─ VENDOR TYPE SPECIFIC:
│        │  │
│        │  ├─ IF vendorType === "event-planner":
│        │  │  └─ plannerDetails (Object)
│        │  │     ├─ servicesNeeded (Array of Strings)
│        │  │     ├─ budget (Number)
│        │  │     └─ additionalNotes (String)
│        │  │
│        │  ├─ IF vendorType === "performer":
│        │  │  └─ performerDetails (Object)
│        │  │     ├─ performanceType (String)
│        │  │     ├─ duration (String)
│        │  │     ├─ performanceStyle (String)
│        │  │     └─ additionalNotes (String)
│        │  │
│        │  └─ IF vendorType === "crew":
│        │     └─ crewDetails (Object)
│        │        ├─ crewType (Array of Strings)
│        │        ├─ numberOfMembers (Number)
│        │        ├─ experienceLevel (String)
│        │        └─ additionalNotes (String)
│        │
│        ├─ CONTACT INFORMATION:
│        │  └─ contactInfo (Object, required)
│        │     ├─ fullName (String, required)
│        │     ├─ email (String, required, email-validated)
│        │     └─ phone (String, required)
│        │
│        └─ METADATA:
│           ├─ status (String)
│           │  └─ Values: pending, reviewed, accepted, rejected
│           ├─ createdAt (Date, auto)
│           └─ updatedAt (Date, auto)
```

## API Endpoints

```
BASE URL: http://localhost:5000/api (development)
         https://backend-url.com/api (production)

┌──────────────────────────────────────────────────────────────┐
│  CREATE REQUIREMENT (POST)                                   │
├──────────────────────────────────────────────────────────────┤
│ Endpoint: POST /requirements                                 │
│ Content-Type: application/json                               │
│ Status: 201 Created                                          │
│ Returns: New requirement object with _id                     │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  GET ALL REQUIREMENTS (GET)                                  │
├──────────────────────────────────────────────────────────────┤
│ Endpoint: GET /requirements                                  │
│ Query Params:                                                │
│   ?vendorType=event-planner                                  │
│   ?status=pending                                            │
│   ?vendorType=performer&status=accepted                      │
│ Status: 200 OK                                               │
│ Returns: Array of requirements                               │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  GET REQUIREMENT BY ID (GET)                                 │
├──────────────────────────────────────────────────────────────┤
│ Endpoint: GET /requirements/:id                              │
│ Status: 200 OK (found) | 404 Not Found                       │
│ Returns: Single requirement object                           │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  UPDATE REQUIREMENT (PUT)                                    │
├──────────────────────────────────────────────────────────────┤
│ Endpoint: PUT /requirements/:id                              │
│ Status: 200 OK | 404 Not Found                               │
│ Returns: Updated requirement object                          │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  DELETE REQUIREMENT (DELETE)                                 │
├──────────────────────────────────────────────────────────────┤
│ Endpoint: DELETE /requirements/:id                           │
│ Status: 200 OK | 404 Not Found                               │
│ Returns: Success message                                     │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  HEALTH CHECK (GET)                                          │
├──────────────────────────────────────────────────────────────┤
│ Endpoint: GET /health                                        │
│ Status: 200 OK                                               │
│ Returns: { success: true, message: "..." }                   │
└──────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App Layout
│
└─ RequirementForm (Main Component)
   ├─ State Management
   │  ├─ formData
   │  ├─ step
   │  ├─ loading
   │  └─ message
   │
   ├─ ProgressBar
   │  └─ Visual indicator of current step
   │
   ├─ Step Container (Conditional Rendering)
   │  │
   │  ├─ Step 1: Step1BasicDetails
   │  │  ├─ Input: eventName
   │  │  ├─ Select: eventType
   │  │  ├─ Input: eventDate
   │  │  ├─ Input: startDate (optional)
   │  │  ├─ Input: endDate (optional)
   │  │  ├─ Input: location
   │  │  └─ Input: venue (optional)
   │  │
   │  ├─ Step 2: Step2VendorSelection
   │  │  └─ Card Grid (3 clickable cards)
   │  │     ├─ Event Planner Card
   │  │     ├─ Performer Card
   │  │     └─ Crew Card
   │  │
   │  ├─ Step 3: Step3VendorDetails
   │  │  ├─ IF vendorType === "event-planner"
   │  │  │  ├─ Checkbox Grid: Services
   │  │  │  ├─ Input: Budget
   │  │  │  └─ Textarea: Notes
   │  │  │
   │  │  ├─ IF vendorType === "performer"
   │  │  │  ├─ Select: Performance Type
   │  │  │  ├─ Input: Duration
   │  │  │  ├─ Input: Style
   │  │  │  └─ Textarea: Notes
   │  │  │
   │  │  └─ IF vendorType === "crew"
   │  │     ├─ Checkbox Grid: Specializations
   │  │     ├─ Input: Number of Members
   │  │     ├─ Select: Experience Level
   │  │     └─ Textarea: Notes
   │  │
   │  └─ Step 4: Step4ReviewSubmit
   │     ├─ Summary Section (Read-only display)
   │     ├─ Vendor Details Summary
   │     └─ Contact Information Form
   │        ├─ Input: fullName
   │        ├─ Input: email
   │        └─ Input: phone
   │
   └─ Button Container
      ├─ Previous Button (Step > 1)
      ├─ Next Button (Step < 4)
      └─ Submit Button (Step === 4)
```

## Validation Flow

```
CLIENT-SIDE VALIDATION (Frontend)
│
├─ Step 1 Validation:
│  ├─ eventName: Required, minlength 3
│  ├─ eventType: Required, must be valid type
│  ├─ eventDate: Required, must be valid date
│  └─ location: Required, not empty
│
├─ Step 2 Validation:
│  └─ vendorType: Required, must be one of 3 types
│
├─ Step 3 Validation:
│  ├─ IF planner: At least 1 service selected
│  ├─ IF performer: Type and Duration provided
│  └─ IF crew: At least 1 spec, members, and level
│
└─ Step 4 Validation:
   ├─ fullName: Required, not empty
   ├─ email: Required, matches email regex
   └─ phone: Required, not empty

SERVER-SIDE VALIDATION (Backend)
│
├─ Check all required fields exist
├─ Validate field types
├─ Validate vendor-specific requirements
├─ Validate email format
├─ Validate enum values
│
└─ IF all valid:
   └─ Save to MongoDB
   ELSE:
   └─ Return 400 Bad Request with error message
```

---

This architecture ensures:
✅ Clean separation of concerns  
✅ Proper data validation at both frontend and backend  
✅ Automatic data categorization by vendor type  
✅ Scalable database design with proper indexing  
✅ RESTful API design  
✅ Responsive user interface  

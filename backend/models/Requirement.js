import mongoose from "mongoose";

const requirementSchema = new mongoose.Schema(
  {
    // Basic Event Details
    eventName: {
      type: String,
      required: [true, "Event name is required"],
      trim: true,
      minlength: [3, "Event name must be at least 3 characters"],
    },
    eventType: {
      type: String,
      required: [true, "Event type is required"],
      enum: ["wedding", "corporate", "birthday", "concert", "conference", "other"],
    },
    eventDate: {
      type: Date,
      required: [true, "Event date is required"],
    },
    eventDateRange: {
      startDate: Date,
      endDate: Date,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    venue: {
      type: String,
      trim: true,
    },

    // Vendor Type Selection
    vendorType: {
      type: String,
      required: [true, "Vendor type is required"],
      enum: ["event-planner", "performer", "crew"],
      index: true, // Index for better query performance
    },

    // Event Planner Specific Fields
    plannerDetails: {
      servicesNeeded: [String], // e.g., "venue-selection", "catering", "decoration"
      budget: {
        type: Number,
        min: 0,
      },
      additionalNotes: String,
    },

    // Performer Specific Fields
    performerDetails: {
      performanceType: String, // e.g., "dj", "live-band", "dancer"
      duration: String, // e.g., "2 hours", "3 hours"
      performanceStyle: String,
      additionalNotes: String,
    },

    // Crew Specific Fields
    crewDetails: {
      crewType: [String], // e.g., "lighting", "sound", "photography", "videography"
      numberOfMembers: Number,
      experienceLevel: String, // e.g., "beginner", "intermediate", "expert"
      additionalNotes: String,
    },

    // Contact Information
    contactInfo: {
      fullName: {
        type: String,
        required: [true, "Full name is required"],
        trim: true,
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"],
      },
      phone: {
        type: String,
        required: [true, "Phone number is required"],
      },
    },

    // Metadata
    status: {
      type: String,
      enum: ["pending", "reviewed", "accepted", "rejected"],
      default: "pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Compound index for efficient filtering
requirementSchema.index({ vendorType: 1, createdAt: -1 });

export default mongoose.model("Requirement", requirementSchema);

"use client";

import React from "react";
import styles from "./Step4ReviewSubmit.module.css";

const Step4ReviewSubmit = ({ formData, updateFormData }) => {
  const handleContactChange = (field, value) => {
    updateFormData({
      contactInfo: {
        ...formData.contactInfo,
        [field]: value,
      },
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not provided";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className={styles.step}>
      <h2>Step 4: Review & Contact Information</h2>

      {/* Summary Section */}
      <div className={styles.summarySection}>
        <h3>Event Summary</h3>
        <div className={styles.summaryGrid}>
          <div className={styles.summaryItem}>
            <strong>Event Name:</strong>
            <p>{formData.eventName}</p>
          </div>
          <div className={styles.summaryItem}>
            <strong>Event Type:</strong>
            <p>{formData.eventType?.replace(/-/g, " ") || "Not provided"}</p>
          </div>
          <div className={styles.summaryItem}>
            <strong>Date:</strong>
            <p>{formatDate(formData.eventDate)}</p>
          </div>
          <div className={styles.summaryItem}>
            <strong>Location:</strong>
            <p>{formData.location}</p>
          </div>
          {formData.venue && (
            <div className={styles.summaryItem}>
              <strong>Venue:</strong>
              <p>{formData.venue}</p>
            </div>
          )}
          <div className={styles.summaryItem}>
            <strong>Vendor Type:</strong>
            <p>{formData.vendorType?.replace(/-/g, " ") || "Not selected"}</p>
          </div>
        </div>
      </div>

      {/* Vendor-Specific Summary */}
      <div className={styles.summarySection}>
        <h3>
          {formData.vendorType === "event-planner"
            ? "Event Planner Details"
            : formData.vendorType === "performer"
            ? "Performer Details"
            : "Crew Details"}
        </h3>

        {formData.vendorType === "event-planner" && (
          <div className={styles.detailsList}>
            <p>
              <strong>Services:</strong> {formData.plannerDetails.servicesNeeded.join(", ")}
            </p>
            {formData.plannerDetails.budget && (
              <p>
                <strong>Budget:</strong> ${formData.plannerDetails.budget}
              </p>
            )}
            {formData.plannerDetails.additionalNotes && (
              <p>
                <strong>Notes:</strong> {formData.plannerDetails.additionalNotes}
              </p>
            )}
          </div>
        )}

        {formData.vendorType === "performer" && (
          <div className={styles.detailsList}>
            <p>
              <strong>Performance Type:</strong>{" "}
              {formData.performerDetails.performanceType}
            </p>
            <p>
              <strong>Duration:</strong> {formData.performerDetails.duration}
            </p>
            {formData.performerDetails.performanceStyle && (
              <p>
                <strong>Style:</strong> {formData.performerDetails.performanceStyle}
              </p>
            )}
            {formData.performerDetails.additionalNotes && (
              <p>
                <strong>Notes:</strong> {formData.performerDetails.additionalNotes}
              </p>
            )}
          </div>
        )}

        {formData.vendorType === "crew" && (
          <div className={styles.detailsList}>
            <p>
              <strong>Specializations:</strong> {formData.crewDetails.crewType.join(", ")}
            </p>
            <p>
              <strong>Number of Members:</strong> {formData.crewDetails.numberOfMembers}
            </p>
            <p>
              <strong>Experience Level:</strong> {formData.crewDetails.experienceLevel}
            </p>
            {formData.crewDetails.additionalNotes && (
              <p>
                <strong>Notes:</strong> {formData.crewDetails.additionalNotes}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Contact Information */}
      <div className={styles.contactSection}>
        <h3>Contact Information</h3>

        <div className={styles.formGroup}>
          <label htmlFor="fullName">Full Name *</label>
          <input
            type="text"
            id="fullName"
            value={formData.contactInfo.fullName}
            onChange={(e) => handleContactChange("fullName", e.target.value)}
            placeholder="Your full name"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            value={formData.contactInfo.email}
            onChange={(e) => handleContactChange("email", e.target.value)}
            placeholder="your.email@example.com"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            value={formData.contactInfo.phone}
            onChange={(e) => handleContactChange("phone", e.target.value)}
            placeholder="+1 (555) 000-0000"
            className={styles.input}
          />
        </div>
      </div>

      <p className={styles.requiredNote}>* Required fields</p>
      <p className={styles.submitNote}>
        Click "Submit Requirement" to post your event and connect with vendors!
      </p>
    </div>
  );
};

export default Step4ReviewSubmit;

"use client";

import React from "react";
import styles from "./Step1BasicDetails.module.css";
import { eventTypes } from "../../utils/constants";

const Step1BasicDetails = ({ formData, updateFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({
      [name]: value,
    });
  };

  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    updateFormData({
      eventDateRange: {
        ...formData.eventDateRange,
        [name]: value,
      },
    });
  };

  return (
    <div className={styles.step}>
      <h2>Step 1: Event Basic Details</h2>

      <div className={styles.formGroup}>
        <label htmlFor="eventName">Event Name *</label>
        <input
          type="text"
          id="eventName"
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
          placeholder="e.g., John & Sarah's Wedding"
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="eventType">Event Type *</label>
        <select
          id="eventType"
          name="eventType"
          value={formData.eventType}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="">Select event type</option>
          {eventTypes.map((type) => (
            <option key={type} value={type.toLowerCase().replace(/\s+/g, "-")}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="eventDate">Event Date *</label>
        <input
          type="date"
          id="eventDate"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      <div className={styles.dateRangeContainer}>
        <div className={styles.formGroup}>
          <label htmlFor="startDate">Date Range Start (Optional)</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.eventDateRange.startDate}
            onChange={handleDateRangeChange}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="endDate">Date Range End (Optional)</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.eventDateRange.endDate}
            onChange={handleDateRangeChange}
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="location">Location *</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g., New York, NY"
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="venue">Venue (Optional)</label>
        <input
          type="text"
          id="venue"
          name="venue"
          value={formData.venue}
          onChange={handleChange}
          placeholder="e.g., Grand Ballroom Hotel"
          className={styles.input}
        />
      </div>

      <p className={styles.requiredNote}>* Required fields</p>
    </div>
  );
};

export default Step1BasicDetails;

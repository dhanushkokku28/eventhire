"use client";

import React from "react";
import styles from "./Step3VendorDetails.module.css";
import {
  plannerServices,
  performanceTypes,
  crewSpecializations,
  experienceLevels,
} from "../../utils/constants";

const Step3VendorDetails = ({ formData, updateFormData }) => {
  // Planner Details Handlers
  const handlePlannerServiceChange = (service) => {
    const currentServices = formData.plannerDetails.servicesNeeded;
    const updatedServices = currentServices.includes(service)
      ? currentServices.filter((s) => s !== service)
      : [...currentServices, service];

    updateFormData({
      plannerDetails: {
        ...formData.plannerDetails,
        servicesNeeded: updatedServices,
      },
    });
  };

  const handlePlannerFieldChange = (field, value) => {
    updateFormData({
      plannerDetails: {
        ...formData.plannerDetails,
        [field]: value,
      },
    });
  };

  // Performer Details Handlers
  const handlePerformerFieldChange = (field, value) => {
    updateFormData({
      performerDetails: {
        ...formData.performerDetails,
        [field]: value,
      },
    });
  };

  // Crew Details Handlers
  const handleCrewSpecializationChange = (specialization) => {
    const currentTypes = formData.crewDetails.crewType;
    const updatedTypes = currentTypes.includes(specialization)
      ? currentTypes.filter((t) => t !== specialization)
      : [...currentTypes, specialization];

    updateFormData({
      crewDetails: {
        ...formData.crewDetails,
        crewType: updatedTypes,
      },
    });
  };

  const handleCrewFieldChange = (field, value) => {
    updateFormData({
      crewDetails: {
        ...formData.crewDetails,
        [field]: value,
      },
    });
  };

  return (
    <div className={styles.step}>
      <h2>Step 3: Vendor-Specific Details</h2>

      {/* Event Planner Details */}
      {formData.vendorType === "event-planner" && (
        <div className={styles.vendorDetailsSection}>
          <div className={styles.formGroup}>
            <label>Services Needed *</label>
            <div className={styles.checkboxGrid}>
              {plannerServices.map((service) => (
                <label key={service} className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.plannerDetails.servicesNeeded.includes(service)}
                    onChange={() => handlePlannerServiceChange(service)}
                  />
                  {service}
                </label>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="budget">Budget (Optional)</label>
            <input
              type="number"
              id="budget"
              value={formData.plannerDetails.budget}
              onChange={(e) => handlePlannerFieldChange("budget", e.target.value)}
              placeholder="e.g., 5000"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="plannerNotes">Additional Notes</label>
            <textarea
              id="plannerNotes"
              value={formData.plannerDetails.additionalNotes}
              onChange={(e) => handlePlannerFieldChange("additionalNotes", e.target.value)}
              placeholder="Any specific requirements or preferences..."
              className={styles.textarea}
              rows="4"
            ></textarea>
          </div>
        </div>
      )}

      {/* Performer Details */}
      {formData.vendorType === "performer" && (
        <div className={styles.vendorDetailsSection}>
          <div className={styles.formGroup}>
            <label htmlFor="performanceType">Type of Performance *</label>
            <select
              id="performanceType"
              value={formData.performerDetails.performanceType}
              onChange={(e) =>
                handlePerformerFieldChange("performanceType", e.target.value)
              }
              className={styles.select}
            >
              <option value="">Select performance type</option>
              {performanceTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="duration">Duration of Performance *</label>
            <input
              type="text"
              id="duration"
              value={formData.performerDetails.duration}
              onChange={(e) => handlePerformerFieldChange("duration", e.target.value)}
              placeholder="e.g., 3 hours, 2.5 hours"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="style">Performance Style (Optional)</label>
            <input
              type="text"
              id="style"
              value={formData.performerDetails.performanceStyle}
              onChange={(e) =>
                handlePerformerFieldChange("performanceStyle", e.target.value)
              }
              placeholder="e.g., Classical, Pop, Jazz"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="performerNotes">Additional Notes</label>
            <textarea
              id="performerNotes"
              value={formData.performerDetails.additionalNotes}
              onChange={(e) =>
                handlePerformerFieldChange("additionalNotes", e.target.value)
              }
              placeholder="Any specific requirements or preferences..."
              className={styles.textarea}
              rows="4"
            ></textarea>
          </div>
        </div>
      )}

      {/* Crew Details */}
      {formData.vendorType === "crew" && (
        <div className={styles.vendorDetailsSection}>
          <div className={styles.formGroup}>
            <label>Specializations Needed *</label>
            <div className={styles.checkboxGrid}>
              {crewSpecializations.map((spec) => (
                <label key={spec} className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.crewDetails.crewType.includes(spec)}
                    onChange={() => handleCrewSpecializationChange(spec)}
                  />
                  {spec}
                </label>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="numberOfMembers">Number of Crew Members *</label>
            <input
              type="number"
              id="numberOfMembers"
              value={formData.crewDetails.numberOfMembers}
              onChange={(e) => handleCrewFieldChange("numberOfMembers", e.target.value)}
              placeholder="e.g., 5"
              min="1"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="experienceLevel">Experience Level *</label>
            <select
              id="experienceLevel"
              value={formData.crewDetails.experienceLevel}
              onChange={(e) =>
                handleCrewFieldChange("experienceLevel", e.target.value)
              }
              className={styles.select}
            >
              <option value="">Select experience level</option>
              {experienceLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="crewNotes">Additional Notes</label>
            <textarea
              id="crewNotes"
              value={formData.crewDetails.additionalNotes}
              onChange={(e) => handleCrewFieldChange("additionalNotes", e.target.value)}
              placeholder="Any specific requirements or preferences..."
              className={styles.textarea}
              rows="4"
            ></textarea>
          </div>
        </div>
      )}

      <p className={styles.requiredNote}>* Required fields</p>
    </div>
  );
};

export default Step3VendorDetails;

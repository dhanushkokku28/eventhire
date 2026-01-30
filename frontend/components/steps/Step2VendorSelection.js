"use client";

import React from "react";
import styles from "./Step2VendorSelection.module.css";
import { vendorTypes } from "../../utils/constants";

const Step2VendorSelection = ({ formData, updateFormData }) => {
  const handleVendorSelect = (vendorId) => {
    updateFormData({ vendorType: vendorId });
  };

  return (
    <div className={styles.step}>
      <h2>Step 2: Select Vendor Type</h2>
      <p className={styles.description}>
        Who would you like to hire for your event?
      </p>

      <div className={styles.vendorGrid}>
        {vendorTypes.map((vendor) => (
          <div
            key={vendor.id}
            className={`${styles.vendorCard} ${
              formData.vendorType === vendor.id ? styles.selected : ""
            }`}
            onClick={() => handleVendorSelect(vendor.id)}
          >
            <div className={styles.vendorIcon}>{vendor.icon}</div>
            <div className={styles.vendorLabel}>{vendor.label}</div>
            {formData.vendorType === vendor.id && (
              <div className={styles.checkmark}>✓</div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.descriptionBox}>
        {formData.vendorType === "event-planner" && (
          <div>
            <h3>Event Planner</h3>
            <p>
              Professional who handles all aspects of event planning including
              venue selection, catering, decoration, and coordination.
            </p>
          </div>
        )}
        {formData.vendorType === "performer" && (
          <div>
            <h3>Performer</h3>
            <p>
              Talent for entertainment including DJs, live bands, singers,
              dancers, and comedians.
            </p>
          </div>
        )}
        {formData.vendorType === "crew" && (
          <div>
            <h3>Crew</h3>
            <p>
              Technical and support staff including lighting, sound, photography,
              videography, and staging.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step2VendorSelection;

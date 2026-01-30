import React from "react";
import styles from "./ProgressBar.module.css";

const ProgressBar = ({ currentStep, totalSteps }) => {
  const steps = ["Basic Details", "Select Vendor", "Vendor Details", "Review"];

  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>
      </div>
      <div className={styles.stepsContainer}>
        {steps.map((stepName, index) => (
          <div key={index} className={styles.stepItem}>
            <div
              className={`${styles.stepNumber} ${
                index + 1 <= currentStep ? styles.active : ""
              } ${index + 1 < currentStep ? styles.completed : ""}`}
            >
              {index + 1 < currentStep ? "✓" : index + 1}
            </div>
            <div className={styles.stepLabel}>{stepName}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;

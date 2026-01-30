"use client";

import React, { useState } from "react";
import styles from "./RequirementForm.module.css";
import Step1BasicDetails from "./steps/Step1BasicDetails";
import Step2VendorSelection from "./steps/Step2VendorSelection";
import Step3VendorDetails from "./steps/Step3VendorDetails";
import Step4ReviewSubmit from "./steps/Step4ReviewSubmit";
import ProgressBar from "./ProgressBar";
import { submitRequirement } from "../utils/api";

const RequirementForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    // Basic Details
    eventName: "",
    eventType: "",
    eventDate: "",
    eventDateRange: {
      startDate: "",
      endDate: "",
    },
    location: "",
    venue: "",

    // Vendor Type
    vendorType: "",

    // Contact Info
    contactInfo: {
      fullName: "",
      email: "",
      phone: "",
    },

    // Planner Details
    plannerDetails: {
      servicesNeeded: [],
      budget: "",
      additionalNotes: "",
    },

    // Performer Details
    performerDetails: {
      performanceType: "",
      duration: "",
      performanceStyle: "",
      additionalNotes: "",
    },

    // Crew Details
    crewDetails: {
      crewType: [],
      numberOfMembers: "",
      experienceLevel: "",
      additionalNotes: "",
    },
  });

  const updateFormData = (newData) => {
    setFormData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  const validateStep1 = () => {
    const { eventName, eventType, eventDate, location } = formData;
    if (!eventName || !eventType || !eventDate || !location) {
      setMessage({
        type: "error",
        text: "Please fill in all required fields",
      });
      return false;
    }
    setMessage({ type: "", text: "" });
    return true;
  };

  const validateStep2 = () => {
    if (!formData.vendorType) {
      setMessage({
        type: "error",
        text: "Please select a vendor type",
      });
      return false;
    }
    setMessage({ type: "", text: "" });
    return true;
  };

  const validateStep3 = () => {
    const { vendorType, plannerDetails, performerDetails, crewDetails } = formData;

    if (vendorType === "event-planner") {
      if (plannerDetails.servicesNeeded.length === 0) {
        setMessage({
          type: "error",
          text: "Please select at least one service",
        });
        return false;
      }
    }

    if (vendorType === "performer") {
      if (!performerDetails.performanceType || !performerDetails.duration) {
        setMessage({
          type: "error",
          text: "Please fill in all performer details",
        });
        return false;
      }
    }

    if (vendorType === "crew") {
      if (
        crewDetails.crewType.length === 0 ||
        !crewDetails.numberOfMembers ||
        !crewDetails.experienceLevel
      ) {
        setMessage({
          type: "error",
          text: "Please fill in all crew details",
        });
        return false;
      }
    }

    setMessage({ type: "", text: "" });
    return true;
  };

  const validateStep4 = () => {
    const { contactInfo } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!contactInfo.fullName || !contactInfo.email || !contactInfo.phone) {
      setMessage({
        type: "error",
        text: "Please fill in all contact information",
      });
      return false;
    }

    if (!emailRegex.test(contactInfo.email)) {
      setMessage({
        type: "error",
        text: "Please enter a valid email address",
      });
      return false;
    }

    setMessage({ type: "", text: "" });
    return true;
  };

  const handleNext = () => {
    let isValid = false;

    if (step === 1) isValid = validateStep1();
    else if (step === 2) isValid = validateStep2();
    else if (step === 3) isValid = validateStep3();

    if (isValid) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
    setMessage({ type: "", text: "" });
  };

  const handleSubmit = async () => {
    if (!validateStep4()) {
      return;
    }

    setLoading(true);
    try {
      const response = await submitRequirement(formData);

      if (response.success) {
        setMessage({
          type: "success",
          text: "Requirement posted successfully! Requirement ID: " + response.data._id,
        });

        // Reset form
        setTimeout(() => {
          setStep(1);
          setFormData({
            eventName: "",
            eventType: "",
            eventDate: "",
            eventDateRange: {
              startDate: "",
              endDate: "",
            },
            location: "",
            venue: "",
            vendorType: "",
            contactInfo: {
              fullName: "",
              email: "",
              phone: "",
            },
            plannerDetails: {
              servicesNeeded: [],
              budget: "",
              additionalNotes: "",
            },
            performerDetails: {
              performanceType: "",
              duration: "",
              performanceStyle: "",
              additionalNotes: "",
            },
            crewDetails: {
              crewType: [],
              numberOfMembers: "",
              experienceLevel: "",
              additionalNotes: "",
            },
          });
        }, 2000);
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Error submitting requirement. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Find Your Perfect Event Team</h1>

        <ProgressBar currentStep={step} totalSteps={4} />

        {message.text && (
          <div className={`${styles.message} ${styles[`message-${message.type}`]}`}>
            {message.text}
          </div>
        )}

        <div className={styles.stepContainer}>
          {step === 1 && (
            <Step1BasicDetails formData={formData} updateFormData={updateFormData} />
          )}
          {step === 2 && (
            <Step2VendorSelection formData={formData} updateFormData={updateFormData} />
          )}
          {step === 3 && (
            <Step3VendorDetails formData={formData} updateFormData={updateFormData} />
          )}
          {step === 4 && (
            <Step4ReviewSubmit formData={formData} updateFormData={updateFormData} />
          )}
        </div>

        <div className={styles.buttonContainer}>
          {step > 1 && (
            <button
              className={styles.buttonSecondary}
              onClick={handlePrevious}
              disabled={loading}
            >
              ← Previous
            </button>
          )}

          {step < 4 && (
            <button className={styles.buttonPrimary} onClick={handleNext} disabled={loading}>
              Next →
            </button>
          )}

          {step === 4 && (
            <button
              className={styles.buttonSubmit}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Requirement"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequirementForm;

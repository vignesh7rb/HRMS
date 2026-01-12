import React, { useState, useRef } from "react";
import "./onboarding.css";

import {
  FaUser,
  FaEnvelope,
  FaBuilding,
  FaGraduationCap,
  FaFileAlt,
  FaCheckCircle,
} from "react-icons/fa";

import Step1Personal from "./steps/Step1Personal";
import Step2Contact from "./steps/Step2Contact";
import Step3Employment from "./steps/Step3Employment";
import Step4Education from "./steps/Step4Education";
import Step5Documents from "./steps/Step5Documents";
import Step6Review from "./steps/Step6Review";

const steps = [
  { label: "Personal Information", icon: <FaUser /> },
  { label: "Contact Details", icon: <FaEnvelope /> },
  { label: "Employment Details", icon: <FaBuilding /> },
  { label: "Education & Experience", icon: <FaGraduationCap /> },
  { label: "Documents Upload", icon: <FaFileAlt /> },
  { label: "Review & Submit", icon: <FaCheckCircle /> },
];

const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

  // Step refs for validation
  const stepRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];

  const next = () => {
    const ref = stepRefs[currentStep];
    if (ref?.current?.validate && !ref.current.validate()) return;
    setCurrentStep((s) => Math.min(s + 1, 5));
  };

  const prev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const handleStepClick = (targetStep) => {
    if (targetStep <= currentStep) {
      setCurrentStep(targetStep);
      return;
    }

    for (let i = 0; i < targetStep; i++) {
      const ref = stepRefs[i];
      if (ref?.current?.validate && !ref.current.validate()) {
        setCurrentStep(i);
        return;
      }
    }

    setCurrentStep(targetStep);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Step1Personal ref={stepRefs[0]} />;
      case 1:
        return <Step2Contact ref={stepRefs[1]} />;
      case 2:
        return <Step3Employment ref={stepRefs[2]} />;
      case 3:
        return <Step4Education ref={stepRefs[3]} />;
      case 4:
        return <Step5Documents ref={stepRefs[4]} />;
      case 5:
        return <Step6Review ref={stepRefs[5]} />;
      default:
        return null;
    }
  };

  return (
    <div className="onboarding-page">
      {/* ===== PAGE HEADER ===== */}
      <div className="onboarding-header">
        <h1>Employee Onboarding</h1>
        <p>Add a new employee to the organization</p>
      </div>

      {/* ===== STEPPER ===== */}
      <div className="stepper-container">
        {steps.map((step, index) => (
          <div className="step-wrapper" key={index}>
            <div
              className="step-item clickable"
              onClick={() => handleStepClick(index)}
            >
              <div
                className={`step-circle ${
                  index <= currentStep ? "active" : ""
                }`}
              >
                {step.icon}
              </div>
              <span
                className={`step-label ${
                  index <= currentStep ? "active" : ""
                }`}
              >
                {step.label}
              </span>
            </div>

            {index !== steps.length - 1 && (
              <div
                className={`step-line ${
                  index < currentStep ? "active" : ""
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* ===== CARD ===== */}
      <div className="onboarding-card">
        {renderStep()}

        <div className="form-actions">
          {currentStep > 0 && (
            <button className="btn-outline" onClick={prev}>
              Previous
            </button>
          )}

          {currentStep < 5 ? (
            <button className="btn-primary" onClick={next}>
              Next
            </button>
          ) : (
            <button className="btn-primary">
              Submit Application
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;

function StepProgressBar({ steps, activeStep, setActiveStep }) {
  function handlePreviousStep() {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
  }

  function handleNextStep() {
    setActiveStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  }

  return (
    <div>
      <div className="steps">
        {steps.map((stepItem, index) => (
          <div
            className={`step ${index <= activeStep ? "active" : ""}`}
            key={index}
          >
            {stepItem}
          </div>
        ))}
      </div>
      <div className="step-buttons-wrapper">
        <button disabled={activeStep === 0} onClick={handlePreviousStep}>
          Previous Step
        </button>
        <button
          disabled={activeStep === steps.length - 1}
          onClick={handleNextStep}
        >
          Next Step
        </button>
      </div>
    </div>
  );
}

export default StepProgressBar;

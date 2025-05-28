import React, { useState } from "react";
import "./style.css";

const InputProgressBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value === "" || isNaN(value)) {
      setPercentage(0);
      setErrorMsg("");
    } else {
      let numValue = parseInt(value);
      if (numValue > 100) {
        setErrorMsg("Enter a value less than or equal to 100");
        return;
      }
      numValue = Math.max(0, numValue);
      setPercentage(numValue);
      setErrorMsg("");
    }
  };

  const getBarColor = (value) => {
    if (value < 30) return "red";
    if (value < 70) return "orange";
    return "green";
  };

  return (
    <div className="progress-container">
      <input
        type="number"
        min="0"
        max="100"
        value={inputValue}
        onChange={handleChange}
        className="percentage-input"
        placeholder="Enter percentage (0-100)"
      />
      {errorMsg && <div className="error-msg">{errorMsg}</div>}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%`, backgroundColor: getBarColor(percentage) }}
        >
          {percentage > 10 && <span className="progress-text">{`${percentage}%`}</span>}
        </div>
      </div>
      {percentage <= 10 && <span className="progress-text small">{`${percentage}%`}</span>}
    </div>
  );
};

export default InputProgressBar;

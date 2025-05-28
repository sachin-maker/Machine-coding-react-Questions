import React, { useState, useEffect, useRef } from "react";
import "./style.css";

const AnimatedProgressBar = () => {
  const [percentage, setPercentage] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      startProgress();
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const startProgress = () => {
    intervalRef.current = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 99) {
          clearInterval(intervalRef.current);
          setIsRunning(false); // Stop running
          return 100;
        }
        return prev + 1;
      });
    }, 50);
  };

  const handleStart = () => {
    if (percentage === 100 || isRunning) return;
    setIsRunning(true);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setPercentage(0);
    setIsRunning(false);
  };

  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%`, backgroundColor: "green" }}
        >
          <span className="progress-text">{`${percentage}%`}</span>
        </div>
      </div>
      <div className="button-group">
        <button onClick={handleStart} disabled={isRunning || percentage === 100}>
          Start
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default AnimatedProgressBar;

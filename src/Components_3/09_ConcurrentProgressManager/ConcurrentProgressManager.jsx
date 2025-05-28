import React, { useState, useRef } from "react";
import "./style.css";

const MAX_CONCURRENT = 3;

const ProgressBar = ({ percentage }) => {
  return (
    <div className="progress-wrapper">
      <div className="progress-inner" style={{ width: `${percentage}%` }} />
    </div>
  );
};

const ConcurrentProgressManager = () => {
  const [bars, setBars] = useState([]);
  const queueRef = useRef([]);
  const activeCountRef = useRef(0);
  const currentIndexRef = useRef(0);

  const animateProgressBar = (id) => {
    activeCountRef.current++;
    let progress = 0;

    const intervalId = setInterval(() => {
      progress++;

      setBars((prev) =>
        prev.map((bar) =>
          bar.id === id ? { ...bar, percentage: progress } : bar
        )
      );

      if (progress >= 100) {
        clearInterval(intervalId);
        activeCountRef.current--;
        runNextInQueue();
      }
    }, 10);
  };

  const runNextInQueue = () => {
    if (
      currentIndexRef.current < queueRef.current.length &&
      activeCountRef.current < MAX_CONCURRENT
    ) {
      const nextBarId = queueRef.current[currentIndexRef.current++];
      animateProgressBar(nextBarId);
    }
  };

  const handleAddBar = () => {
    const newId = bars.length;
    setBars((prev) => [...prev, { id: newId, percentage: 0 }]);
    queueRef.current.push(newId);
    runNextInQueue();
  };

  const handleReset = () => {
    setBars([]);
    queueRef.current = [];
    currentIndexRef.current = 0;
    activeCountRef.current = 0;
  };

  return (
    <div className="multi-container">
      <h2>Concurrent Progress Bars (Max {MAX_CONCURRENT})</h2>
      <div className="button-group">
        <button onClick={handleAddBar}>Start</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      {bars.map((bar) => (
        <ProgressBar key={bar.id} percentage={bar.percentage} />
      ))}
    </div>
  );
};

export default ConcurrentProgressManager;

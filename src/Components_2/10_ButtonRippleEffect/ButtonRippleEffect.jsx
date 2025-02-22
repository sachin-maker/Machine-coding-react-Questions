import React, { useState } from "react";
import "./style.css";

const ButtonRippleEffect = () => {
  const [ripples, setRipples] = useState([]);

  function handleRippleEffect(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const newRipple = {
      id: Date.now(),
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation ends
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600); // Slightly longer animation for smoother effect
  }

  return (
    <div className="ripple-effect-container">
      <h1>Button Ripple Effect</h1>
      <button className="ripple-btn" onClick={handleRippleEffect}>
        Click Me
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="ripple"
            style={{ left: ripple.x, top: ripple.y }}
          />
        ))}
      </button>
    </div>
  );
};

export default ButtonRippleEffect;

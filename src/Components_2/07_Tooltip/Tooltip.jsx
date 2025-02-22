import { useState, useRef } from "react";

function Tooltip({ children, content, delay = 500 }) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null); // Store timeout reference

  function handleShowTooltip() {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  }

  function handleHideTooltip() {
    clearTimeout(timeoutRef.current); // Clear the stored timeout
    setIsVisible(false);
  }

  return (
    <div
      className="tooltip-container"
      onMouseEnter={handleShowTooltip}
      onMouseLeave={handleHideTooltip}
    >
      {children}
      {isVisible && <div className="tooltip">{content}</div>}
    </div>
  );
}

export default Tooltip;

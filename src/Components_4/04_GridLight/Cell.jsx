import React from "react";

const Cell = ({ filled, onClick,isDisabled, label }) => {
  return (
    <button
      className={filled ? "cell cell-activated" : "cell"}
      type="button"
      onClick={onClick}
      aria-label={label}
      disabled={isDisabled}
    />
  );
};

export default Cell;
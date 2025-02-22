import { useState, useRef, useEffect } from "react";
import Modal from "./Modal";
import "./style.css";

const ModalPopup = () => {
  const [showModalPopup, setShowModalPopup] = useState(false);

  function handleToggleModalPopup() {
    setShowModalPopup(!showModalPopup);
  }

  function onClose() {
    setShowModalPopup(false);
  }

  return (
    <div className="container">
      <button onClick={handleToggleModalPopup}>Open Modal Popup</button>
      {showModalPopup && (
        <Modal 
        id="custom-id" 
        header={<h1>Customized Header</h1>}  // ✅ Correct
        footer={<h2>Customized Footer</h2>}  // ✅ Change <h1> to <h2>
        onClose={onClose} 
        body={<div>Customized body</div>} 
      />
      )}
    </div>
  );
};

export default ModalPopup;

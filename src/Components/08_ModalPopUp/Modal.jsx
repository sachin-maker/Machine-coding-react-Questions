import { useEffect, useRef } from "react";

const Modal = ({ id, header, body, footer, onClose }) => {
  const modalRef = useRef(null);

  // Close modal when clicking outside of modal-content
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // Close the modal
      }
    }

    // Add event listener when modal opens
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Remove event listener when modal closes
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div id={id || "Modal"} className="modal">
      <div className="modal-content" ref={modalRef}>
        <div className="header">
          <span onClick={onClose} className="close-modal-icon">
            &times;
          </span>
          <h2>{header || "Header"}</h2>
        </div>
        <div className="body">{body || <p>This is our Modal Body</p>}</div>
        <div className="footer">{footer || <h2>Footer</h2>}</div>
      </div>
    </div>
  );
};

export default Modal;

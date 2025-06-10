import { useState } from "react";
import OTPInput from "./OTPInput";
import './style.css';

const PhoneOTPForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handlePhoneNumber = (event) => {
    const value = event.target.value;
    // allow only numbers
    if (/^\d{0,10}$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  const handlePhoneSubmit = (event) => {
    event.preventDefault();

    if (phoneNumber.length !== 10) {
      alert("Invalid Phone Number");
      return;
    }

    // Show OTP input
    setShowOtpInput(true);
  };

  const onOTPSubmit = (otp) => {
    console.log("Login successful with OTP:", otp);
  };

  return (
    <div className="form-container">
      <h1>Phone OTP Form</h1>
      <div className="form-box">
        {!showOtpInput ? (
          <form onSubmit={handlePhoneSubmit}>
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneNumber}
              placeholder="Enter Mobile Number"
              maxLength={10}
              inputMode="numeric"
              className="phone-input"
            />
            <button type="submit" className="submit-btn">Submit</button>
          </form>
        ) : (
          <div className="otp-section">
            <p>OTP is sent to <strong>{phoneNumber}</strong></p>
            <OTPInput length={4} onOTPSubmit={onOTPSubmit} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneOTPForm;

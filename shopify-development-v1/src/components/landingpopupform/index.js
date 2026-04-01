import React, { useState } from "react";
import FormField from "./FormField";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import axios from "axios";
import "./audit-popup-form.scss";

const AuditPopupForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState(
    "Book My Free Audit + Consultation →",
  );

  const validateName = (value) => {
    setName(value);
    setNameError(value.trim().length === 0);
  };

  const validatePhone = (value) => {
    const cleanedValue = String(value).trim();
    const rule = /^\d{10}$/;
    setPhone(cleanedValue);
    setPhoneError(!rule.test(cleanedValue));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || nameError || phoneError) return;

    try {
      setLoading(true);
      setButtonText("Submitting...");

      const response = await axios.post("/sendmail", {
        timeout: 2000,
        data: {
          fname: name,
          email: "",
          message: "Audit popup lead",
          phone: phone,
          checkbox: false,
          page: "audit-popup",
          budget: "",
        },
      });

      console.log("sendmail response:", response.data);

      setButtonText("Submitted Successfully ✅");
      setName("");
      setPhone("");
      setNameError(false);
      setPhoneError(false);
    } catch (err) {
      console.error(
        "sendmail error:",
        err.response?.data || err.message || err,
      );
      setButtonText("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="audit-popup-form" onSubmit={handleSubmit}>
      <FormField
        label="Your Name *"
        value={name}
        fieldName="name"
        type="text"
        className="field field--compact"
        placeholder="Enter your full name"
        fieldFn={validateName}
      />
      {nameError && <div className="error">Please enter your name</div>}

      <FormField
        label="Your Contact Number *"
        value={phone}
        fieldName="phone"
        type="number"
        className="field field--compact"
        placeholder="Enter your contact number"
        fieldFn={validatePhone}
      />
      {phoneError && <div className="error">Enter valid 10 digit number</div>}

      <button type="submit" className="submit-button" disabled={loading}>
        {buttonText}
      </button>
    </form>
  );
};

export default AuditPopupForm;

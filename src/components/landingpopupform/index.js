import React, { useState } from "react";
import FormField from "./FormField";
import axios from "axios";
import "./audit-popup-form.scss";

const AuditPopupForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState(
    "Book My Free Audit + Consultation →"
  );

  const validateName = (value) => {
    setName(value);
    setNameError(value.trim().length === 0);
  };

  const validatePhone = (value) => {
    const rule = /^\d{10}$/;
    setPhone(value);
    setPhoneError(!rule.test(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !phone || nameError || phoneError) return;

    try {
      setLoading(true);
      setButtonText("Submitting...");

      await axios.post("/sendmail", {
        fname: name,
        phone: phone,
        page: "audit-popup",
      });

      setButtonText("Submitted Successfully ✅");
      setName("");
      setPhone("");
    } catch (err) {
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
        label="WhatsApp Number *"
        value={phone}
        fieldName="phone"
        type="text"
        className="field field--compact"
        placeholder="+91 Your number"
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

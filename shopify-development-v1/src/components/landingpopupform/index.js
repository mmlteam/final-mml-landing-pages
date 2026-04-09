import React, { useEffect, useState } from "react";
import FormField from "./FormField";
import axios from "axios";
import "./audit-popup-form.scss";

const AuditPopupForm = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [loading, setLoading] = useState(false);
  const [formInvalid, setFormInvalid] = useState(true);

  const [thankyoumsg, setThankyoumsg] = useState("");
  const [buttonText, setButtonText] = useState(
    "Book My Free Audit + Consultation →",
  );
  const [buttonClass, setButtonClass] = useState("");

  const validateName = (value) => {
    const trimmedValue = value.trim();
    setName(value);

    if (trimmedValue.length === 0) {
      setNameError("Please enter your name");
      return false;
    }

    setNameError("");
    return true;
  };

  const validatePhone = (value) => {
    const cleanedValue = String(value).trim();
    const rule = /^\d{10}$/;

    setPhone(cleanedValue);

    if (cleanedValue.length === 0) {
      setPhoneError("Please enter your contact number");
      return false;
    }

    if (!rule.test(cleanedValue)) {
      setPhoneError("Enter valid 10 digit number");
      return false;
    }

    setPhoneError("");
    return true;
  };

  useEffect(() => {
    const isNameValid = name.trim().length > 0;
    const isPhoneValid = /^\d{10}$/.test(String(phone).trim());

    setFormInvalid(!(isNameValid && isPhoneValid));
  }, [name, phone]);

  const resetFormState = () => {
    setTimeout(() => {
      setButtonText("Book My Free Audit + Consultation →");
      setButtonClass("");
      setThankyoumsg("");
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isNameValid = validateName(name);
    const isPhoneValid = validatePhone(phone);

    if (!isNameValid || !isPhoneValid || loading) return;

    try {
      setLoading(true);
      setButtonText("Submitting...");
      setButtonClass("loading");

      // We use axios.all to send to both your mailer and your database API
      const [response1] = await axios.all([
        axios.post("/sendmail", {
          timeout: 2000,
          data: {
            fname: name,
            email: "",
            message: "Audit popup lead",
            phone: phone,
            checkbox: false,
            page: "audit-popup",
            budget: "N/A",
          },
        }),
        // Optional: Adding your database API call to match landing/footer forms
        axios.post("https://api.mmlprojects.in/formdata.php", {
          fname: name,
          phone: phone,
          page: "audit-popup",
          message: "Audit popup lead"
        }, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }),
      ]);

      // --- DATA LAYER PUSH START ---
      // This fires immediately so it's captured even if the user closes the tab
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "pop_up_form_submission_success_message", // Same trigger name for GTM
        form_name: "pop_up_audit_popup_form",
        form_location: "popup_modal",
        lead_type: "audit_request"
      });
      // --- DATA LAYER PUSH END ---

      setLoading(false);
      setThankyoumsg("Message Sent.");
      setButtonText("Message Sent. We will reply you soon!");
      setButtonClass("sent-msg");

      setName("");
      setPhone("");
      setNameError("");
      setPhoneError("");

      if (onSuccess) {
        // We wait 2.5s so they can see the "Message Sent" text before the popup closes
        setTimeout(() => {
          onSuccess();
        }, 2500);
      }

      resetFormState();
    } catch (err) {
      console.error("Submission error:", err);
      setLoading(false);
      setThankyoumsg("");
      setButtonText("Something went wrong. Sorry!");
      setButtonClass("");
    }
  };

  return (
    <form className="audit-popup-form" onSubmit={handleSubmit} noValidate>
      <FormField
        label="Your Name *"
        value={name}
        fieldName="name"
        type="text"
        className={`field field--compact ${nameError ? "field-error" : ""}`}
        placeholder="Enter your full name"
        fieldFn={validateName}
      />
      {nameError && <div className="error">{nameError}</div>}

      <FormField
        label="Your Contact Number *"
        value={phone}
        fieldName="phone"
        type="tel"
        className={`field field--compact ${phoneError ? "field-error" : ""}`}
        placeholder="Enter your contact number"
        fieldFn={validatePhone}
      />
      {phoneError && <div className="error">{phoneError}</div>}

      <button
        type="submit"
        className={`submit-button ${buttonClass}`}
        disabled={formInvalid || loading}
      >
        {loading ? "Submitting..." : buttonText}
      </button>

      {thankyoumsg && <div id="popup-form-success-message" className="success-message">{thankyoumsg}</div>}
    </form>
  );
};

export default AuditPopupForm;

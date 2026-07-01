import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import FormField from "./FormField";
import axios from "axios";
import "./contactform.scss";
import { getLeadMeta } from "../../utils/getLeadMeta";

const indianMobileRule = /^[6-9]\d{9}$/;

const LandingContactForm = () => {
  const [firstName, setFirstName] = useState("");
  const [budget, setBudget] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");

  const [loader, setLoader] = useState(false);
  const [thankyoumsg, setThankyoumsg] = useState("");

  const [fnameValidate, setFnameValidate] = useState(false);
  const [phoneValidate, setPhoneValidate] = useState(false);
  const [budgetValidate, setBudgetValidate] = useState(false);

  const [formValid, setFormValid] = useState(true);
  const [errorMsg, setErrorMsg] = useState({});
  const [buttonText, setButtonText] = useState("Get Free Consultation →");
  const [buttonClass, setButtonClass] = useState("");
  const history = useHistory();

  const budgetOptions = [
    { value: "50k-1Lakh", label: "₹50,000 - ₹1,00,000" },
    { value: "1Lakh-2.5Lakh", label: "₹1,00,000 - ₹2,50,000" },
    { value: "2.5Lakh-5Lakh", label: "₹2,50,000 - ₹5,00,000" },
    { value: "above 5Lakh", label: "Above ₹5,00,000" },
    {
      value: "I need to discuss my requirements",
      label: "I need to discuss my requirements",
    },
  ];

  const validateUsername = (fname) => {
    const errorMsgCaret = { ...errorMsg };

    if (fname.trim().length === 0) {
      setFnameValidate(true);
      errorMsgCaret.fname = "Please enter your name";
    } else {
      setFnameValidate(false);
      errorMsgCaret.fname = "";
    }

    setErrorMsg(errorMsgCaret);
  };

  const validateBudget = (value) => {
    const errorMsgCaret = { ...errorMsg };

    if (value.length === 0) {
      setBudgetValidate(true);
      errorMsgCaret.budget = "Please select your budget range";
    } else {
      setBudgetValidate(false);
      errorMsgCaret.budget = "";
    }

    setErrorMsg(errorMsgCaret);
  };

  const validateUserPhone = (value) => {
    const errorMsgCaret = { ...errorMsg };
    const cleanedValue = String(value).trim();

    if (cleanedValue.length === 0) {
      setPhoneValidate(true);
      errorMsgCaret.phone = "Please enter your contact number";
    } else if (!indianMobileRule.test(cleanedValue)) {
      setPhoneValidate(true);
      errorMsgCaret.phone = "Enter a valid 10 digit Indian mobile number";
    } else {
      setPhoneValidate(false);
      errorMsgCaret.phone = "";
    }

    setErrorMsg(errorMsgCaret);
  };

  const updateUsername = (fname) => {
    setFirstName(fname);
    validateUsername(fname);
  };

  const updateUserBudget = (value) => {
    setBudget(value);
    validateBudget(value);
  };

  const updateUserPhone = (value) => {
    const cleanedValue = String(value).replace(/\D/g, "").slice(0, 10);
    setPhone(cleanedValue);
    validateUserPhone(cleanedValue);
  };

  const resetForm = () => {
    setFirstName("");
    setBudget("");
    setPhone("");
    setWebsite("");
    setFnameValidate(false);
    setPhoneValidate(false);
    setBudgetValidate(false);
    setErrorMsg({});

    setTimeout(() => {
      setButtonText("Get Free Consultation →");
      setButtonClass("");
      setThankyoumsg("");
    }, 5000);
  };

  useEffect(() => {
    if (
      firstName.trim().length === 0 ||
      phone.trim().length === 0 ||
      budget.length === 0
    ) {
      setFormValid(true);
    } else if (fnameValidate || phoneValidate || budgetValidate) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [firstName, phone, budget, fnameValidate, phoneValidate, budgetValidate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formValid || loader) return;

    try {
      setLoader(true);
      setButtonText("Submitting...");
      setButtonClass("loading");
      const meta = await getLeadMeta();
      const data = {
        fname: firstName,
        email: "",
        message: `Budget: ${budget}`,
        phone: phone,
        website: website,
        page: "Get Started (Footer Form)",
        budget: budget,
        source: meta.source,
        moreInfo: `IP: ${meta.ip} | Location: ${meta.city}, ${meta.country} | Date: ${meta.date} | Time: ${meta.time} IST | Device: ${meta.deviceName} (${meta.deviceType})`,
      };

      const response1 = await axios.post("/sendmail", {
        timeout: 2000,
        data: {
          ...data,
          checkbox: false,
        },
      });

      const sheetStatus = response1.data?.sheetStatus;

      if (sheetStatus === "success") {
        // --- DATA LAYER PUSH START ---
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "footer_form_submission_success_message", // Keep this name same as the Landing form
          form_name: "footer_contact_form", // Change this to identify the source
          form_location: "footer",
          user_budget: budget,
        });
        // --- DATA LAYER PUSH END ---

        setLoader(false);
        setThankyoumsg("Message Sent.");
        setButtonText("Message Sent. We will reply you soon!");
        setButtonClass("sent-msg");
        resetForm();
        history.push("/thankyou");
      } else if (sheetStatus === "duplicate") {
        setLoader(false);
        setThankyoumsg("");
        setButtonText("You have already submitted this form.");
        setButtonClass("");
      } else {
        setLoader(false);
        setThankyoumsg("");
        setButtonText("Something went wrong. Sorry!");
        setButtonClass("");
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
      setThankyoumsg("");
      setButtonText("Something went wrong. Sorry!");
      setButtonClass("");
    }
  };

  return (
    <div className="contact-form-wrapper">
      <form
        id="contact-form"
        method="POST"
        action="send"
        onSubmit={handleSubmit}
      >
        <FormField
          label="Your Name *"
          value={firstName}
          fieldName="firstName"
          type="text"
          className="field"
          placeholder="Enter your full name"
          fieldFn={updateUsername}
          textAreaField={false}
        />
        {fnameValidate && errorMsg.fname && (
          <div className="error">{errorMsg.fname}</div>
        )}

        <div className="honeypot-field" aria-hidden="true">
          <label htmlFor="footer-website">Website</label>
          <input
            id="footer-website"
            name="website"
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            tabIndex="-1"
            autoComplete="off"
          />
        </div>

        <FormField
          label="Your Contact Number *"
          value={phone}
          fieldName="phone"
          type="tel"
          className="field"
          placeholder="Enter your contact number"
          fieldFn={updateUserPhone}
          textAreaField={false}
          inputMode="numeric"
          maxLength="10"
          pattern="[6-9][0-9]{9}"
        />
        {phoneValidate && errorMsg.phone && (
          <div className="error">{errorMsg.phone}</div>
        )}

        <FormField
          label="Your Budget Range *"
          value={budget}
          fieldName="budget"
          className="field selected-field"
          placeholder="Select your budget *"
          selectField={true}
          options={budgetOptions}
          fieldFn={updateUserBudget}
        />
        {budgetValidate && errorMsg.budget && (
          <div className="error">{errorMsg.budget}</div>
        )}

        <button
          type="submit"
          className={`submit-button ${buttonClass}`}
          disabled={formValid || loader}
        >
          {loader ? "Submitting..." : buttonText}
        </button>

        {thankyoumsg && (
          <div id="footer-form-success-message" className="success-message">
            {thankyoumsg}
          </div>
        )}
      </form>

      <div className="form-trust">
        <div className="form-trust-item">Free 30-minute strategy call</div>
        <div className="form-trust-item">Custom quote within 24 hours</div>
        <div className="form-trust-item">Quick response Mon-Sat</div>
      </div>
    </div>
  );
};

export default LandingContactForm;

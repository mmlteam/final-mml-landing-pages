import React, { useState, useEffect } from "react";
import FormField from "./FormField";
import axios from "axios";
import "./contactform.scss";

const LandingContactForm = () => {
  const [firstName, setFirstName] = useState("");
  const [budget, setBudget] = useState("");
  const [phone, setPhone] = useState("");

  const [loader, setLoader] = useState(false);
  const [thankyoumsg, setThankyoumsg] = useState("");

  const [fnameValidate, setFnameValidate] = useState(false);
  const [phoneValidate, setPhoneValidate] = useState(false);
  const [budgetValidate, setBudgetValidate] = useState(false);

  const [formValid, setFormValid] = useState(true);
  const [errorMsg, setErrorMsg] = useState({});
  const [buttonText, setButtonText] = useState("Get My Free Consultation →");
  const [buttonClass, setButtonClass] = useState("");

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
    const rule = /^\d{10,15}$/;

    if (cleanedValue.length === 0) {
      setPhoneValidate(true);
      errorMsgCaret.phone = "Please enter your contact number";
    } else if (!rule.test(cleanedValue)) {
      setPhoneValidate(true);
      errorMsgCaret.phone = "Please enter a valid contact number";
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
    setPhone(value);
    validateUserPhone(value);
  };

  const resetForm = () => {
    setFirstName("");
    setBudget("");
    setPhone("");
    setFnameValidate(false);
    setPhoneValidate(false);
    setBudgetValidate(false);
    setErrorMsg({});

    setTimeout(() => {
      setButtonText("Get My Free Consultation →");
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

    const data = {
      fname: firstName,
      email: "",
      message: `Budget: ${budget}`,
      phone: phone,
      page: "contact",
      budget: budget,
    };

    const [response1, response2] = await axios.all([
      axios.post("/sendmail", {
        timeout: 2000,
        data: {
          ...data,
          checkbox: false,
        },
      }),
      axios.post("https://api.mmlprojects.in/formdata.php", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }),
    ]);

    // Check for a successful status (usually 200)
    if (response1.status === 200 || response1.status === "success") {
      
      // --- DATA LAYER PUSH START ---
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "footer_form_submission_success_message", // Keep this name same as the Landing form
        form_name: "footer_contact_form", // Change this to identify the source
        form_location: "footer",
        user_budget: budget
      });
      // --- DATA LAYER PUSH END ---

      setLoader(false);
      setThankyoumsg("Message Sent.");
      setButtonText("Message Sent. We will reply you soon!");
      setButtonClass("sent-msg");
      resetForm();
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

        <FormField
          label="Your Contact Number *"
          value={phone}
          fieldName="phone"
          type="number"
          className="field"
          placeholder="Enter your contact number"
          fieldFn={updateUserPhone}
          textAreaField={false}
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

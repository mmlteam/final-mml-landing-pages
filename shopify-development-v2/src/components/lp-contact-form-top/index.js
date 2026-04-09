import React, { useState, useEffect } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import FormField from "./FormField";
import axios from "axios";
import "./contactform.scss";

const LandingContactForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

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
    { value: "50k-1l", label: "₹50,000 - ₹1,00,000" },
    { value: "1l-2.5l", label: "₹1,00,000 - ₹2,50,000" },
    { value: "2.5l-5l", label: "₹2,50,000 - ₹5,00,000" },
    { value: "above5l", label: "Above ₹5,00,000" },
    { value: "discuss", label: "I need to discuss my requirements" }
  ];

  const validateUsername = fname => {
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

  const validateBudget = value => {
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

  const validateUserPhone = value => {
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

  const updateUsername = fname => {
    setFirstName(fname);
    validateUsername(fname);
  };

  const updateUserBudget = value => {
    setBudget(value);
    validateBudget(value);
  };

  const updateUserPhone = value => {
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

  const handleSubmit = async e => {
    e.preventDefault();

    if (formValid || loader) return;

    try {
      setLoader(true);
      setButtonText("Submitting...");
      setButtonClass("loading");
      if (!executeRecaptcha) {
        throw new Error("reCAPTCHA not ready");
      }
      const recaptchaToken = await executeRecaptcha("contact_form");

      const data = {
        fname: firstName,
        email: "",
        message: `Budget: ${budget}`,
        phone: phone,
        page: "contact",
        budget: budget,
        recaptchaToken: recaptchaToken,
        recaptchaAction: "contact_form"
      };

      const [response1, response2] = await axios.all([
        axios.post("/sendmail", {
          timeout: 2000,
          data: {
            fname: firstName,
            email: "",
            message: `Budget: ${budget}`,
            phone: phone,
            checkbox: false,
            page: "contact",
            budget: budget,
            recaptchaToken: recaptchaToken,
            recaptchaAction: "contact_form"
          }
        }),
        axios.post("https://api.mmlprojects.in/formdata.php", data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
      ]);

      if (response1.status) {
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
          className="field"
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

        {thankyoumsg && <div className="success-message">{thankyoumsg}</div>}
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

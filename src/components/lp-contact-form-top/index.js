import React, { useState, useEffect } from "react";
import FormField from "./FormField";
import axios from "axios";
import "./contactform.scss";
const LandingContactForm = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [budget, setBudget] = useState("");
  const [phone, setPhone] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const [thankyoumsg, setThankyoumsg] = useState("");
  const [fnameValidate, setFnameValidate] = useState(false);
  const [emailValidate, setEmailValidate] = useState(false);
  const [phoneValidate, setPhoneValidate] = useState(false);
  const [budgetValidate, setBudgetValidate] = useState(false);

  const [projectDetailsValidate, setProjectDetailsValidate] = useState(false);
  const [formValid, setFormValid] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [buttonText, setButtonText] = useState("Get My Free Consultation →");
  const [buttonClass, setButtonClass] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const budgetOptions = [
    { value: "50k-1l", label: "₹50,000 - ₹1,00,000" },
    { value: "1l-2.5l", label: "₹1,00,000 - ₹2,50,000" },
    { value: "2.5l-5l", label: "₹2,50,000 - ₹5,00,000" },
    { value: "above5l", label: "Above ₹5,00,000" },
    { value: "discuss", label: "I need to discuss my requirements" },
  ];
  const validateUsername = (fname) => {
    let errorMsgCaret = { ...errorMsg };
    if (fname.length === 0) {
      setFnameValidate(true);
      errorMsgCaret.fname = "Please enter your name";
    } else {
      setFnameValidate(false);
    }
    setErrorMsg(errorMsgCaret);
  };

  const validateProjectDetails = (project) => {
    let errorMsgCaret = { ...errorMsg };
    if (project.length === 0) {
      setProjectDetailsValidate(true);
      errorMsgCaret.project =
        "Please enter your project details or just say hi :)";
    } else {
      setProjectDetailsValidate(false);
    }
    setErrorMsg(errorMsgCaret);
  };

  const validateBudget = (value) => {
    let errorMsgCaret = { ...errorMsg };
    if (value.length === 0) {
      setBudgetValidate(true);
      errorMsgCaret.budget = "Please select your budget range";
    } else {
      setBudgetValidate(false);
    }
    setErrorMsg(errorMsgCaret);
  };

  const validateUserEmail = (email) => {
    let errorMsgCaret = { ...errorMsg };
    // checks for format _@_._
    if (email.length === 0 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailValidate(true);
      errorMsgCaret.email = "Invalid email format";
    } else {
      setEmailValidate(false);
    }
    setErrorMsg(errorMsgCaret);
  };

  const validateUserPhone = (phone) => {
    let rule = /^\d+$/;
    let errorMsgCaret = { ...errorMsg };
    if (!phone.match(rule)) {
      setPhoneValidate(true);
      errorMsgCaret.phone = "Invalid phone format ";
    } else {
      setPhoneValidate(false);
    }
    setErrorMsg(errorMsgCaret);
  };

  const updateUsername = (fname) => {
    setFirstName(fname);
    validateUsername(fname);
  };

  const updateUserEmail = (email) => {
    setEmail(email);
    validateUserEmail(email);
  };

  const updateUserBudget = (value) => {
    setBudget(value);
    validateBudget(value);
  };

  const updateUserCompany = (company) => {
    setCompany(company);
  };

  const updateUserProjectDetails = (project) => {
    setProjectDetails(project);
    validateProjectDetails(project);
  };

  const updateUserPhone = (phone) => {
    setPhone(phone);
    validateUserPhone(phone);
  };
  const resetForm = () => {
    setFirstName("");
    setEmail("");
    setCompany("");
    setPhone("");
    setTimeout(() => {
      setButtonText("Submit");
      setButtonClass("");
    }, 5000);
  };

  useEffect(() => {
    if (
      email.length === 0 ||
      firstName.length === 0 ||
      phone.length === 0 ||
      budget.length === 0
    ) {
      setFormValid(true);
    } else if (
      fnameValidate ||
      emailValidate ||
      phoneValidate ||
      budgetValidate
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [
    fnameValidate,
    emailValidate,
    phoneValidate,
    budgetValidate,
    phone,
    email,
    firstName,
    budget,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!formValid) {
        setLoader(true);
        setButtonText("Submitting...");
        setButtonClass("loading");
        const data = {
          fname: firstName,
          email: email,
          message: company,
          phone: phone,
          page: "contact",
        };
        axios
          .all([
            axios.post("/sendmail", {
              timeout: 2000,
              data: {
                fname: firstName,
                email: email,
                message: company,
                phone: phone,
                checkbox: isChecked,
                page: "contact",
              },
            }),
            axios.post("https://api.mmlprojects.in/formdata.php", data, {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }),
          ])
          .then(
            axios.spread((response1, response2) => {
              // output of req.
              // console.log('data1', response1, 'data2', response2)
              if (response1.status) {
                setLoader(false);
                setThankyoumsg("Message Sent.");
                setButtonText("Message Sent. We will reply you soon!");
                setButtonClass("sent-msg");
                resetForm();
              } else if (!response1.status) {
                setLoader(true);
                setThankyoumsg("");
                setButtonText("something went wrong. sorry!");
                setButtonClass("");
                setFormValid(true);
                resetForm();
              }
              //console.log('formphp==',response2);
            })
          );
      }
    } catch (error) {
      console.log(error);
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
        {fnameValidate && <div className="error">{errorMsg.fname}</div>}
        {/* <FormField
            label="Last Name"
            value={lastName}
            fieldName="lastName"
            type="text"
            className="field"
            fieldFn={updateLastname}
            textAreaField={false}
          />
          {lnameValidate && <div className="error">{errorMsg.lname}</div>} */}
        {/* <FormField
            // label="Your Email"
            value={email}
            fieldName="email"
            type="text"
            className="field"
            placeholder="Your Email *"
            fieldFn={updateUserEmail}
            textAreaField={false}
          />
          {emailValidate && <div className="error">{errorMsg.email}</div>} */}

        {/* <FormField
            label="Project Details"
            value={projectDetails}
            fieldName="project"
            type="text"
            className="field"
            placeholder="Company / Website"
            fieldFn={updateUserProjectDetails}
          /> */}
        {/* {projectDetailsValidate && (
            <div className="error">{errorMsg.project}</div>
          )} */}

        <FormField
          label="WhatsApp Number *"
          value={phone}
          fieldName="phone"
          type="text"
          className="field"
          placeholder="+91 Your number"
          fieldFn={updateUserPhone}
          textAreaField={false}
        />
        {phoneValidate && <div className="error">{errorMsg.phone}</div>}

        {/* <FormField
            label="Address"
            value={address}
            fieldName="address"
            type="text"
            className="field"
            fieldFn={updateAddress}
            textAreaField={false}
          />
          {addressValidate && <div className="error">{errorMsg.address}</div>} */}
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

        {budgetValidate && <div className="error">{errorMsg.budget}</div>}

        {/* <FormField
            // label="Message"
            value={company}
            fieldName="company"
            type="text"
            className="field"
            placeholder="What do you need? *"
            fieldFn={updateUserCompany}
            textAreaField={true}
          /> */}
        <button
          type="submit"
          className={`submit-button ${buttonClass}`}
          disabled={formValid}
        >
          {buttonText}
        </button>
      </form>
      <div class="form-trust">
        <div class="form-trust-item">Free 30-minute strategy call</div>
        <div class="form-trust-item">Custom quote within 24 hours</div>
        <div class="form-trust-item">Quick response Mon-Fri</div>
      </div>
    </div>
  );
};

export default LandingContactForm;

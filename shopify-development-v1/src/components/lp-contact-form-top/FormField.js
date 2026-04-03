import React from "react";

const FormField = ({
  label,
  value,
  fieldName,
  type = "text",
  className,
  textAreaField,
  placeholder,
  selectField,
  options = [],
  fieldFn,
}) => {
  const handleField = (inputValue) => {
    fieldFn(inputValue);
  };

  return (
    <div className="form-field">
      {label && <label>{label}</label>}

      {/* INPUT */}
      {!textAreaField && !selectField && (
        <input
          onChange={(e) => handleField(e.target.value)}
          value={value}
          name={fieldName}
          type={type}
          className={className}
          placeholder={placeholder}
        />
      )}

      {/* TEXTAREA */}
      {textAreaField && (
        <textarea
          onChange={(e) => handleField(e.target.value)}
          name={fieldName}
          className={className}
          value={value}
          placeholder={placeholder}
          rows="2"
        />
      )}

      {/* SELECT */}
      {selectField && (
        <div className="select-field-wrap">
          <select
            name={fieldName}
            className={`${className} select-field ${
              !value ? "is-placeholder" : "has-value"
            }`}
            value={value}
            onChange={(e) => handleField(e.target.value)}
          >
            <option value="">{placeholder}</option>
            {options.map((opt, index) => (
              <option key={index} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default FormField;

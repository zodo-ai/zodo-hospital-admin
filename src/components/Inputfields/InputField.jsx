import PropTypes from "prop-types";
import React from "react";
import { useFormContext } from "react-hook-form";

function InputField(props) {
  const {
    name,
    label,
    type,
    validation,
    placeholder,
    disabled,
    defaultValue,
    pattern,
    minValue,
  } = props;
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  //  Block value less than minValue
  const handleInput = (e) => {
    const value = e.target.value;
    if (value === "") return; // Allow empty temporarily (optional)
    if (Number(value) < minValue) {
      e.target.value = minValue;
      setValue(name, minValue); // sync with form
    }
  };

  // Handle phone number input - only allow digits and limit to 10 characters
  const handlePhoneInput = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length > 10) {
      value = value.slice(0, 10); // Limit to 10 digits
    }
    e.target.value = value;
    setValue(name, value); // sync with form
  };

  // Get validation rules based on type
  const getValidationRules = () => {
    if (type === "phone") {
      return {
        ...validation,
        pattern: {
          value: /^[6-9]\d{9}$/,
          message: "Please enter a valid 10-digit Indian mobile number"
        },
        minLength: {
          value: 10,
          message: "Phone number must be 10 digits"
        },
        maxLength: {
          value: 10,
          message: "Phone number must be 10 digits"
        }
      };
    }
    return validation;
  };

  return (
    <div>
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
          {validation?.required && (
            <span style={{ color: "red" }} className="ms-1">
              *
            </span>
          )}
        </label>
      )}

      {type === "price" ? (
        <div className="input-group">
          <span className="input-group-text bg-primary">₹</span>
          <input
            id={name}
            name={name}
            type="number"
            placeholder={placeholder}
            disabled={disabled}
            className={`form-control ${errors?.[name] ? "is-invalid" : ""}`}
            {...register(name, validation)}
            defaultValue={defaultValue}
            pattern={pattern}
            min={minValue}
            onInput={handleInput}
          />
        </div>
      ) : type === "phone" ? (
        <input
          id={name}
          name={name}
          type="tel"
          placeholder={placeholder || "+91 Enter 10-digit mobile number"}
          disabled={disabled}
          className={`form-control ${errors?.[name] ? "is-invalid" : ""}`}
          {...register(name, getValidationRules())}
          defaultValue={defaultValue}
          maxLength="10"
          onInput={handlePhoneInput}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={`form-control ${errors?.[name] ? "is-invalid" : ""}`}
          {...register(name, validation)}
          defaultValue={defaultValue}
          pattern={pattern}
          min={minValue}
          onInput={handleInput}
        />
      )}
      {errors !== undefined && errors[name] && (
        <div className="invalid-feedback">
          {errors !== undefined && errors[name].message}
        </div>
      )}
    </div>
  );
}

InputField.propTypes = {
  name: PropTypes.node,
  label: PropTypes.node,
  type: PropTypes.node,
  validation: PropTypes.node,
  placeholder: PropTypes.node,
  disabled: PropTypes.node,
  defaultValue: PropTypes.node,
  pattern: PropTypes.string,
  minValue: PropTypes.number,
};

export default InputField;

import PropTypes from "prop-types";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
function SelectField(props) {
  const {
    name,
    label,
    options,
    validationMessage,
    placeholder,
    isMultiSelect,
    isLoading,
  } = props;
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const selectStyle = {
    control: (base, state) => ({
      ...base,
      borderRadius: "10px",
      boxShadow: state.isFocused ? 0 : 0,
      borderColor: state.isFocused ? "#347D73" : "#ced4da",
      minHeight: "45px",
      "&:hover": {
        borderColor: state.isFocused ? "#347D73" : "#ced4da",
      },
    }),
  };
  return (
    <div>
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
          {validationMessage && (
            <span style={{ color: "red" }} className="ms-1">
              *
            </span>
          )}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={null}
        rules={{ required: validationMessage }}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            // className="basic-single"
            // classNamePrefix="select"
            placeholder={placeholder}
            styles={selectStyle}
            isMulti={isMultiSelect}
            isLoading={isLoading}
          />
        )}
      />
      {errors[name] && <p className="text-danger">{errors[name].message}</p>}
    </div>
  );
}

SelectField.propTypes = {
  name: PropTypes.node,
  label: PropTypes.node,
  validationMessage: PropTypes.node,
  placeholder: PropTypes.node,
  isMultiSelect: PropTypes.node,
  options: PropTypes.node,
  isLoading: PropTypes.node,
};

export default SelectField;

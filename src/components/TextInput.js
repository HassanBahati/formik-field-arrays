import React from "react";
import { FieldProps, getIn } from "formik";

const InputText = (props) => {
  const {
    showErrorOnTouch = true,
    label,
    field,
    placeholder,
    form: { touched, errors },
    ...restProps
  } = props;

  const errorMessage = getIn(errors, field.name);
  const touch = getIn(touched, field.name);

  return (
    <div className={field.value ? "dirty" : ""}>
      <label>{label}</label>

      <input
        type="text"
        {...field}
        {...restProps}
        placeholder={placeholder}
        className={`${
          showErrorOnTouch
            ? touch && errorMessage
              ? "invalid"
              : ""
            : errorMessage && "invalid"
        } `}
      />

      {showErrorOnTouch
        ? touch && errorMessage && <span className="error">{errorMessage}</span>
        : errorMessage && <span className="error">{errorMessage}</span>}
    </div>
  );
};

export default InputText;

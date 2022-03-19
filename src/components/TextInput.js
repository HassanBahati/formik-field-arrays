import React from "react";

const InputText = (props) => {
  const {
    showErrorOnTouch = true,
    label,
    field,
    placeholder,
    ...restProps
  } = props;

  return (
    <div className={field.value ? "dirty" : ""}>
      <label>{label}</label>

      <input type="text" {...field} {...restProps} placeholder={placeholder} />
    </div>
  );
};

export default InputText;

import React from "react";

const InputText = (props) => {
  const {
    showErrorOnTouch = true,
    field,
    placeholder,
    ...restProps
  } = props;

  return (
    <div className={field.value ? "dirty" : ""}>
      <input type="text" {...field} {...restProps} placeholder={placeholder} />
    </div>
  );
};

export default InputText;

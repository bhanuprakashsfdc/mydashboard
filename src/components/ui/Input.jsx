import { forwardRef } from "react";
import "./Input.css";

const Input = forwardRef(function Input({
  id,
  value,
  onChange,
  placeholder = "",
  type = "text",
  title,
  autoFocus = false,
}, ref) {
  return (
    <input
      id={id}
      type={type}
      className="input"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      title={title}
      autoFocus={autoFocus}
      ref={ref}
    />
  );
});

export default Input;

import "../css/components/Input.css";
import email from "../assets/sms-notification.svg";
import PropTypes from "prop-types";
import eye from "../assets/eye-slash.svg";
import eyeOpen from "../assets/eye-open.svg";
import { useState } from "react";
import { greenPrimary } from "../store/constant";

const FormikInput = ({
  field,
  label,
  name,
  id,
  form: { touched, errors },
  hasIcon = true,
  iconSource,
  type,
  isPassword,
  placeholder = "Email Address  Ex. ( learnspace@example.com )",
  isSelect,
  options = [],
  isDate,
  onBlur,
  ...props
}) => {
  const [visible, setVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setVisible(!visible);
  };
  const [focused, setFocused] = useState(false);
  const todaysDateInMilliseconds = new Date();
  const todaysDate = todaysDateInMilliseconds.toISOString().split("T")[0];
  return (
    <label htmlFor={id} className="icon-input-label">
      <p style={focused ? { color: greenPrimary } : {}}>{label}</p>
      <div className="icon-input">
        <div
          className={`icon-input-div ${
            // eslint-disable-next-line no-nested-ternary
            touched[field.name] && errors[field.name]
              ? "icon-input-error"
              : focused
              ? "icon-input-active"
              : "icon-input-inactive"
          } ${focused ? "icon-input-active" : "icon-input-inactive"}`}
        >
          {hasIcon && <img src={iconSource || email} alt="" />}
          {isSelect && (
            <select
              name={name}
              {...field}
              {...props}
              id={id}
              placeholder={placeholder}
              onFocus={() => setFocused(true)}
              onBlur={(e) => {
                onBlur(e);
                setFocused(false);
              }}
            >
              {options.map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
            </select>
          )}
          {isDate && (
            <input
              type={type}
              name={name}
              {...field}
              {...props}
              id={id}
              placeholder={placeholder}
              min={todaysDate}
              onFocus={() => setFocused(true)}
              onBlur={(e) => {
                onBlur(e);
                setFocused(false);
              }}
            />
          )}
          {!isSelect && !isDate && (
            <input
              // eslint-disable-next-line no-nested-ternary
              type={!isPassword ? type : visible ? "text" : "password"}
              name={name}
              {...field}
              {...props}
              id={id}
              placeholder={placeholder}
              onFocus={() => setFocused(true)}
              onBlur={(e) => {
                onBlur(e);
                setFocused(false);
              }}
            />
          )}
          {isPassword && (
            <div
              onClick={togglePasswordVisibility}
              onKeyDown={togglePasswordVisibility}
              role="button"
              tabIndex={0}
            >
              <img
                src={visible ? eyeOpen : eye}
                alt=""
                style={{
                  paddingRight: "1rem",
                  cursor: "pointer",
                }}
              />
            </div>
          )}
        </div>
      </div>
      {touched[field.name] && errors[field.name] && (
        <p className="error-txt">{errors[field.name]}</p>
      )}
    </label>
  );
};

FormikInput.propTypes = {
  field: PropTypes.object,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  iconSource: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  form: PropTypes.object,
  hasIcon: PropTypes.bool,
  isPassword: PropTypes.bool,
  onBlur: PropTypes.bool,
  isSelect: PropTypes.bool,
  options: PropTypes.array,
  isDate: PropTypes.bool,
};

export default FormikInput;

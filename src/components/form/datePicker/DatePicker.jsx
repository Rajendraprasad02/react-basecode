import { Calendar } from "primereact/calendar";
import styles from "./styles.module.css";
import PropTypes from "prop-types";

export default function DatePicker({
  id,
  name,
  defaultValue,
  style,
  className,
  labelText,
  labelStyle,
  labelClassName,
  placeholder = "DD-MM-YYY",
  register,
  required,
  validation,
  disabled,
}) {
  return (
    <>
      <label
        htmlFor={id}
        style={labelStyle}
        className={`block ${styles.label} ${labelClassName}`}
      >
        {labelText}
      </label>
      <Calendar
        className={`${className} ${styles.date}`}
        style={style}
        name={name}
        id={id}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(
          name,
          required && {
            required: required,
            validate: validation,
          }
        )}
        disabled={disabled}
      />
    </>
  );
}

DatePicker.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  labelStyle: PropTypes.object,
  labelClassName: PropTypes.string,
  register: PropTypes.func.isRequired,
  required: PropTypes.string,
  validation: PropTypes.func,
  style: PropTypes.object,
  placeholder: PropTypes.string,
};

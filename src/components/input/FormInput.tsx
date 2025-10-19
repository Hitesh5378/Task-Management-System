import { FormInputProps } from "../../interface/interfacetype";
import "./FormInput.css";

export const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  maxLength,
}) => {
  return (
    <div className="form-input">
      <label className="label">
        {label}:<br />
        <input
          type={type}
          className="input-container"
          name={name}
          value={value}
          maxLength={maxLength}
          onChange={onChange}
        />
      </label>
      <br />
      {error && <span className="error">{error}</span>}
      <br />
    </div>
  );
};

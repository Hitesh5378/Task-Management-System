import { TRegistration, ValidationErrors } from "../interface/interfacetype";
import { config } from "./config";

export const isFormValid = (values: TRegistration)=> {
  return (
    values.fullName &&
    !values.fullNameError && //means in first the name string should be there and in error there should be empty string
    values.email &&
    !values.emailError &&
    values.ph &&
    !values.phError &&
    values.dob &&
    !values.dobError &&
    !values.addError &&
    values.pass &&
    !values.passError &&
    values.confirmPassword &&
    !values.confirmPasswordError
  );
};

export const validateField = (
  name: string,
  value: string,
  values: TRegistration
): ValidationErrors => {
  let errors: ValidationErrors = {};

  switch (name) {
    case "fullName":
      if (!value) {
        errors.fullNameError = "Name cannot be blank";
      } else if (value.trim().length <= 3) {
        errors.fullNameError = "Name should be greater than 3 characters";
      } else if (value.match(config.Regex.nameRegex)) {
        errors.fullNameError = "Name can only contain characters";
      } else if (!config.Regex.spaceRegex.test(value)) {
        errors.fullNameError =
          "Only characters are allowed; no multiple spaces.";
      } else {
        errors.fullNameError = "";
      }
      break;

    case "email":
      if (!config.Regex.emailRegex.test(value)) {
        errors.emailError = "Invalid email";
      } else {
        errors.emailError = "";
      }
      break;

    case "ph":
      if (!config.Regex.phRegex.test(value)) {
        errors.phError = "Invalid Number";
      } else {
        errors.phError = "";
      }
      break;

    case "dob":
      const currentDate = new Date();
      const userDate: Date = new Date(value);
      if (isNaN(userDate.getTime())) {
        errors.dobError = "Please enter a valid birth date";
      } else {
        currentDate.setFullYear(currentDate.getFullYear() - 18);
        if (userDate > currentDate) {
          errors.dobError = "You must be at least 18 years old.";
        } else {
          errors.dobError = "";
        }
      }
      break;

    case "add":
      if (value.trim().length > 100) {
        errors.addError = "Address length should be less than 100 letters";
      } else {
        errors.addError = "";
      }
      break;

    case "pass":
      if (!config.Regex.passRegex.test(value)) {
        errors.passError = `Password must be at least 8 characters, contain 1 uppercase letter, 1 special character, and 1 digit`;
      } else {
        errors.passError = "";
      }
      break;

    case "confirmPassword":
      if (values.pass !== value) {
        errors.confirmPasswordError =
          "Confirm password must match the password";
      } else {
        errors.confirmPasswordError = "";
      }
      break;

    default:
      break;
  }

  return errors;
};

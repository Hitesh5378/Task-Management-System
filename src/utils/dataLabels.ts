import { FormInputProps, FormState, TRegistration } from "../interface/interfacetype";
import { FormInput } from "./const";

export const loginFormInputs = (
  formState: FormState,
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
) => [
  {
    label: "Email",
    name: "email",
    type: "text",
    value: formState.email,
    onChange: handleInputChange,
  },
  {
    label: "Password",
    name: "password",
    type: "text",
    value: formState.password,
    onChange: handleInputChange,
  },
];

export const formInputArrFunc = (
  values: TRegistration,
  handleChanges: (e: React.ChangeEvent<HTMLInputElement>) => void
): FormInput[] => {
  const formInputs: FormInputProps[] = [
    {
      label: "Name",
      name: "fullName",
      type: "text",
      value: values.fullName,
      onChange: handleChanges,
      error: values.fullNameError,
    },
    {
      label: "Email Address",
      name: "email",
      type: "email",
      value: values.email,
      onChange: handleChanges,
      error: values.emailError,
    },
    {
      label: "Phone Number",
      name: "ph",
      type: "tel",
      value: values.ph,
      onChange: handleChanges,
      error: values.phError,
      maxLength: 10,
    },
    {
      label: "Date of Birth",
      name: "dob",
      type: "date",
      value: values.dob,
      onChange: handleChanges,
      error: values.dobError,
    },
    {
      label: "Address (Optional)",
      name: "add",
      type: "text",
      value: values.add,
      onChange: handleChanges,
      error: values.addError,
    },
    {
      label: "Password",
      name: "pass",
      type: "text",
      value: values.pass,
      onChange: handleChanges,
      error: values.passError,
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "text",
      value: values.confirmPassword,
      onChange: handleChanges,
      error: values.confirmPasswordError,
    },
  ];
  return formInputs;
};

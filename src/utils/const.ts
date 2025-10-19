export const STRINGS = {
  registrationFormTitle: "Registration Form",
  alreadyRegistered: "Already Registered?",
  signIn: "Sign in",
  submitButton: "Submit",
  localStorageKeys: {
    showList: "showList",
    login: "login",
  },
};

export const LOGIN_STRINGS = {
  loginFormTitle: "Login Form",
  newUserText: "New user?",
  registerLink: "Register",
};
export interface FormInput {
  label: string;
  name: string;
  type: string;
  value: string | number | Date;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  maxLength?: number;
}

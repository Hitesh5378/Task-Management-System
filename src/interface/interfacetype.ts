import { ChangeEvent } from "react";

export interface TRegistration {
  fullName: string;
  email: string;
  ph: string;
  dob: string;
  add: string;
  pass: string;
  confirmPassword: string;
  fullNameError?: string;
  emailError?: string;
  phError?: string;
  dobError?: string;
  addError?: string;
  passError?: string;
  confirmPasswordError?: string;
  errors?: string;
}

export interface FormState {
  email: string;
  password: string;
  errors: string;
}

export interface User {
  email: string;
  pass: string;
}

export interface FormInputProps {
  label: string;
  name: string;
  type: string;
  value: any;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  maxLength?: number;
}

export interface ValidationErrors {
  fullNameError?: string;
  emailError?: string;
  phError?: string;
  dobError?: string;
  addError?: string;
  passError?: string;
  confirmPasswordError?: string;
}

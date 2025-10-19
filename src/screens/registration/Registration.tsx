import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Button, FormInput } from "../../components";
import { TRegistration } from "../../../src/interface/interfacetype";
import {
  formInputArrFunc,
  getLocalStorage,
  isFormValid,
  setLocalStorage,
  STRINGS,
  validateField,
} from "../../utils";
import "./Registration.css";
import { setActiveUser } from "../../redux/feature/user/userSlice";

export const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [values, setValues] = useState<TRegistration>({
    fullName: "",
    email: "",
    ph: "",
    dob: "",
    add: "",
    pass: "",
    confirmPassword: "",
    fullNameError: "",
    emailError: "",
    phError: "",
    dobError: "",
    addError: "",
    passError: "",
    confirmPasswordError: "",
  });
  const [formValid, setFormValid] = useState<boolean>(false);

  const renderInputField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevState) => {
      const updatedValues = { ...prevState, [name]: value };
      const errors = validateField(name, value, updatedValues);
      return { ...updatedValues, ...errors };
    });
  };

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formValid) {
      const showList = (getLocalStorage<TRegistration[]>(STRINGS.localStorageKeys.showList) || []) as TRegistration[];
      showList.push(values);
      setLocalStorage(STRINGS.localStorageKeys.showList, showList);
      setLocalStorage(STRINGS.localStorageKeys.login, true);
      setLocalStorage("activeUser", values.fullName);
      dispatch(setActiveUser(values.fullName))     
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    localStorage.setItem(STRINGS.localStorageKeys.login, "false");
    setFormValid(isFormValid(values) as boolean);
  }, [values]);

  return (
    <div className="outer-container">
      <div className="inner-container">
        <form name="myForm" onSubmit={formSubmit}>
          <h1>{STRINGS.registrationFormTitle}</h1>
          {formInputArrFunc(values as TRegistration, renderInputField).map(
            (input, index) => (
              <FormInput key={index} {...input} />
            )
          )}
          <Button className="btn" txt="Submit" dis={!formValid} type="submit" />
          <div className="login-container">
            {STRINGS.alreadyRegistered}{" "}
            <Link to="/Login">{STRINGS.signIn}</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
function Dispatch() {
  throw new Error("Function not implemented.");
}


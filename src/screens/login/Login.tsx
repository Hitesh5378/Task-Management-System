import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Button, FormInput } from "../../components";
import { FormState, TRegistration } from "../../interface/interfacetype";
import {
  getLocalStorage,
  LOGIN_STRINGS,
  loginFormInputs,
  setLocalStorage,
  STRINGS,
} from "../../utils";
import "./Login.css";

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
    errors: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = formState;
    const showList = (getLocalStorage<TRegistration[]>(STRINGS.localStorageKeys.showList) || []) as TRegistration[];
    const matchingUser = showList.find((user: TRegistration) => {
      return user.email === email && user.pass === password;
    });

    if (matchingUser) {
      setLocalStorage("activeUser", matchingUser.fullName);
      setLocalStorage(STRINGS.localStorageKeys.login, true);

      navigate("/dashboard");
    } else {
      setFormState((prevState) => ({
        ...prevState,
        errors: "Invalid credentials",
      }));
    }
  };

  return (
    <div className="outer-container">
      <div className="inner-container">
        <form name="myForm" onSubmit={handleLogin}>
          <h1>{LOGIN_STRINGS.loginFormTitle}</h1>
          {loginFormInputs(formState, handleInputChange).map((input, index) => (
            <FormInput key={index} {...input} />
          ))}
          <span className="error">{formState.errors}</span>
          <Button className="Btn" txt={STRINGS.submitButton} type="submit" />
          <div className="register-container">
            {LOGIN_STRINGS.newUserText}{" "}
            <Link to="/">{LOGIN_STRINGS.registerLink}</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

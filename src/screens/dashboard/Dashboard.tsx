import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Button } from "../../components";
import { STRINGS } from "../../utils/const";
import { getLocalStorage } from "../../utils";
import "./Dashboard.css";

export const Dashboard = () => {
  const navigate = useNavigate();
  const username = useSelector((state: any) => state.user.activeUser);

  const [userName, setUserName] = useState<string | undefined>("");

  const formatUserName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  useEffect(() => {
    if (username) {
      setUserName(formatUserName(username));
    } else {
      const activeUser: any = getLocalStorage("activeUser") || "";
      if (activeUser) setUserName(formatUserName(activeUser));
    }
  }, [username]);

  const handleLogout = () => {
    localStorage.setItem(STRINGS.localStorageKeys.login, "false");
    navigate("/login");
  };

  const gotoTodo = () => {
    navigate("/todo");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <p className="dashboard-message">Hi {userName || "Guest"}</p>
          <Button
            className="logout-btn"
            click={handleLogout}
            txt="Logout"
            type={"button"}
          />
        </div>
        <h1 className="dashboard-heading">Welcome to your Dashboard!</h1>
        <div className="dashboard-button-container">
          <Button
            className="todo-btn"
            click={gotoTodo}
            txt="Task Management System"
            type={"button"}
          />
         
        </div>
      </div>
    </div>
  );
};

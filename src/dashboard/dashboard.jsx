// import styles
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Dashboard = ({ sidebar, component }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return navigate("/login");
    }
  }, []);

  return (
    <>
      <div className="wrapper">
        <div className="dashboard">
          <div className="sidebar">{sidebar}</div>
          <div className="main">{component}</div>
        </div>
      </div>
    </>
  );
};

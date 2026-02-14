import { useContext, useMemo } from "react";
import { UserContext } from "../context/userContext";

import { useNavigate } from "react-router-dom";

//immportin style
import "./login.css";

import { Loading } from "./loading";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { config } from "../config";
import { useState } from "react";

export const Login = () => {
  let navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const [loginStatus, setLoginStatus] = useState(false);

  console.log(user);

  // initially set the role to farmer (user)
  if (!user.role) {
    user.role = "user";
  }

  //fetch request on datase and check if user true or not (inside handle change)
  //if yes redirect to dasboard
  const handleLogin = async (event) => {
    setLoginStatus(true);
    event.preventDefault();

    if (!user.email || !user.password) {
      setLoginStatus(false);
      setUser({});
      return toast.error("All fields are required.");
    }

    let res = await fetch(`${config.API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
        role: user.role,
      }),
    });

    let data = await res.json();

    if (data.error || data.success === false) {
      setLoginStatus(false);
      setUser({});
      return toast.error(data.error);
    }

    data.token && localStorage.setItem("token", `Bearer ${data.token}`);

    data.success && toast.success(data.message);
    setLoginStatus(true);

    localStorage.setItem("userInfo", JSON.stringify(data.data));
    let userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      userInfo = {};
    }

    userInfo = JSON.parse(userInfo);

    setUser(userInfo);

    setTimeout(() => {
      if (userInfo.role === "user") {
        navigate("/dashboard");
      } else {
        navigate("/dashboard/seller");
      }
    }, 2000);
  };

  return (
    <>
      <div className="login-form-main-wrapper">
        <div className="img-container">
          <img src="../../src/assets/images/login-art.svg" alt="login art" />
        </div>
        <div className="login-form-container">
          <form className="login-form" onSubmit={handleLogin}>
            <input
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              type="text"
              placeholder="Enter your email"
            ></input>

            <input
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              placeholder="Enter your password"
            ></input>

            <select
              onChange={(e) => setUser({ ...user, role: e.target.value })}
            >
              <option value="user">Farmer</option>
              <option value="seller">Seller</option>
            </select>

            <button className="submit-btn" type="submit">
              {loginStatus === false ? "Login" : <Loading />}
            </button>
          </form>
          <div className="signup-div">
            <p>
              Don't have account?
              <button onClick={() => navigate("/signup")}>Signup</button>
            </p>
          </div>
        </div>
      </div>
      <footer>
        <div className="bottom-main">Copyright &copy; Farmap.com.np</div>
      </footer>
      <ToastContainer />
    </>
  );
};

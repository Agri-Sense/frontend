import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

//immportin style
import "./signup.css";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {config} from "../config";

export const Signup = () => {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    profile_pic: null,
    username: "",
    full_name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    country: "",
    role: "",
  });

  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    if (!user.profile_pic) return;
    setImgUrl(URL.createObjectURL(user.profile_pic));
  }, [user.profile_pic]);

  // initially set the role to farmer (user)
  if (!user.role) {
    user.role = "user";
  }

  const handleSignup = async (event) => {
    event.preventDefault();
    if (
      !user.username ||
      !user.full_name ||
      !user.email ||
      !user.password ||
      !user.phone ||
      !user.address ||
      !user.country ||
      !user.role ||
      !user.profile_pic
    ) {
      return toast.error("All fields are required.");
    }

    const formData = new FormData();

    formData.append("username", user.username);
    formData.append("full_name", user.full_name);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("phone", user.phone);
    formData.append("address", user.address);
    formData.append("country", user.country);
    formData.append("role", user.role);
    formData.append("profile_pic", user.profile_pic);

    const res = await fetch(`${config.API_URL}/auth/signup`, {
      method: "POST",
      body: formData,
    });

    if (+res.status === 500) {
      return toast.error("Internal server error.");
    }

    const data = await res.json();

    if (data.error || data.success === false) {
      return toast.error(data.error);
    }

    toast.success(data.message);

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <>
      <div className="login-form-main-wrapper signup-wrapper">
        <div className="img-container">
          <img src="../../src/assets/images/login-art.svg" alt="signup art" />
        </div>
        <div className="signup-form-container">
          <form className="login-form" onSubmit={handleSignup}>
            <div className="upload-section">
              <div>
                <p className="signup-header">Profile Picture</p>
                {user.profile_pic && (
                  <div>
                    <img
                      className="profile-picture"
                      alt="not found"
                      src={imgUrl}
                    />
                    <button
                      className="removeUploadedImageAtSignup"
                      onClick={() => {
                        setUser({ ...user, profile_pic: null });
                      }}
                    >
                      Remove
                    </button>
                  </div>
                )}
                {!user.profile_pic && (
                  <input
                    className="uploadImageAtSignup"
                    type="file"
                    name="profile_pic"
                    required={true}
                    onChange={(event) => {
                      console.log(event.target.files[0]);
                      setUser({ ...user, profile_pic: event.target.files[0] });
                    }}
                  />
                )}
              </div>
            </div>
            <div className="input-section">
              <input
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                type="text"
                required={true}
                placeholder="Enter your username"
                name="username"
              ></input>

              <input
                onChange={(e) =>
                  setUser({ ...user, full_name: e.target.value })
                }
                type="text"
                required={true}
                placeholder="Enter your full name"
                name="full_name"
              ></input>

              <input
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                type="text"
                required={true}
                placeholder="Enter your email"
                name="email"
              ></input>

              <input
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                type="password"
                required={true}
                placeholder="Enter your password"
                name="password"
              ></input>

              <input
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                type="text"
                required={true}
                placeholder="Enter your phone number"
                name="phone"
              ></input>

              <input
                onChange={(e) => setUser({ ...user, address: e.target.value })}
                type="text"
                required={true}
                placeholder="Enter your address"
                name="address"
              ></input>

              <input
                onChange={(e) => setUser({ ...user, country: e.target.value })}
                type="text"
                required={true}
                placeholder="Enter your country"
                name="country"
              ></input>

              <select
                onChange={(e) => setUser({ ...user, role: e.target.value })}
                name="role"
              >
                <option value="farmer">Farmer</option>
                <option value="seller">Seller</option>
              </select>
              <button className="submit-btn" type="submit">
                Signup
              </button>
            </div>
          </form>

          <div className="signup-div">
            <p>
              Don't have account?
              <button onClick={() => navigate("/login")}>Login</button>
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

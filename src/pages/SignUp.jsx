import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const SignUp = () => {
  const navigate = useNavigate();
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      return handleError("All fields are required");
    }

    try {
      const response = await fetch("https://auth-backend-snowy.vercel.app/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message || "Signup successful");
        setTimeout(() => navigate("/login"), 2000);
      } else if (error?.details?.[0]?.message) {
        handleError(error.details[0].message);
      } else {
        handleError(message || "Something went wrong");
      }
    } catch (err) {
      handleError(err.message || "Network error");
    }
  };

  return (
    <div className="page-center">
      <div className="container">
        <form onSubmit={handleSignup}>
          <h2>Sign Up</h2>

          <div>
            <label htmlFor="name">Name</label>
            <input
              onChange={handleChange}
              type="text"
              placeholder="Enter your name..."
              autoFocus
              name="name"
              value={signupInfo.name}
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              type="email"
              placeholder="Enter your email..."
              name="email"
              value={signupInfo.email}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              placeholder="Enter your password..."
              name="password"
              value={signupInfo.password}
            />
          </div>

          <button type="submit">Sign Up</button>

          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SignUp;

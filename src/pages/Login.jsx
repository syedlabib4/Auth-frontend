import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

const Login = () => {
  const navigate = useNavigate();
  const [LoginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  // ✅ Prevent logged-in user from seeing login page again
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = LoginInfo;

    if (!email || !password) {
      return handleError("All fields are required");
    }

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(LoginInfo),
      });

      const result = await response.json();
      console.log("Login Response:", result);
      const { success, message, error, token, name } = result;

      if (success) {
        handleSuccess(message || "Login successful");
        localStorage.setItem("token", token);
        localStorage.setItem("name", name);

        setTimeout(() => navigate("/home", { replace: true }), 2000);
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
        <form onSubmit={handleLogin}>
          <h2>Login</h2>

          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              type="email"
              placeholder="Enter your email..."
              name="email"
              value={LoginInfo.email}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              placeholder="Enter your password..."
              name="password"
              value={LoginInfo.password}
            />
          </div>

          <button type="submit">Login</button>

          <span>
            Don’t have an account? <Link to="/signup">Signup</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;

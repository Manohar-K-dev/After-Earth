import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const navigate = useNavigate(); // Initialize navigate

  // Check if user is already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userLoggedIn");
    if (isLoggedIn) {
      navigate("/home-afterearth"); // Redirect to the home page if logged in
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const showAlert = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(""), 5000); // Clear message after 5 seconds
  };

  const handleLogin = async (event) => {
    const { username, password } = formData;
    event.preventDefault();

    // Validate empty fields
    if (!username || !password) {
      showAlert("Please fill in both fields.");
      return;
    }

    // Send login data to backend
    try {
      const response = await fetch("http://localhost:5000/login-afterearth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("✅ Login Response:", data); // ✅ Debugging

      if (response.ok) {
        console.log("✅ Login Successful:", data.username);
        localStorage.setItem("username", data.username); // ✅ Save username in localStorage
        navigate("/home-afterearth");

        showAlert("Login successful! Redirecting...");
        setTimeout(() => navigate("/home-afterearth"), 2000); // Redirect after 3 seconds
      } else {
        console.error("❌ Login Failed:", data.message);
        showAlert(data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("❌ Network Error:", error);
      showAlert("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="login-signup-container">
      <div className="login-container">
        <div className="header">
          <p>Welcome</p>
          <span>Sign in to continue</span>
        </div>

        <div className="input-container">
          <div className="input-content">
            <input
              type="text"
              name="username"
              placeholder="Username"
              id="username-input"
              className="login-username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-content">
            <input
              type="password"
              name="password"
              placeholder="Password"
              id="user-password"
              className="login-password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Display error message */}
        {errorMessage && (
          <div className="error-message">
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="container-login-btn">
          <button id="login-btn" className="login-btn" onClick={handleLogin}>
            Log In
          </button>
        </div>

        <div className="container-login-footer">
          <span>
            Don't have an account?{" "}
            <span
              id="go-signup-page"
              className="go-signup-page"
              onClick={() => navigate("/signup-afterearth")}
            >
              Sign Up
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState, useEffect } from "react"; // Import useState
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isChecked, setIsChecked] = useState(false); // State for checkbox
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const navigate = useNavigate(); // Initialize navigate

  // Check if the user is already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userLoggedIn");
    if (isLoggedIn) {
      // Redirect to login page if already logged in
      navigate("/login-afterearth");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked); // Toggle checkbox state
  };

  const showAlert = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(""), 5000); // Clear message after 5 seconds
  };

  const handleSignUp = async () => {
    const { firstName, lastName, username, email, password, confirmPassword } =
      formData;

    // Validate empty fields
    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      showAlert("Please fill in all fields.");
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      showAlert("Password and Confirm Password do not match.");
      return;
    }

    // Validate if checkbox is checked
    if (!isChecked) {
      showAlert("Please agree to the privacy and policy terms.");
      return;
    }

    // Send signup data to backend
    try {
      const response = await fetch(
        "http://localhost:5000/signup-afterearth", // ✅ Change to port 5000
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            username,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        showAlert("Signup successful! Redirecting to login page...");
        navigate("/login-afterearth");
      } else {
        showAlert(data.message || "Signup failed. Please try again.");
        if (data.message === "User already exists") {
          navigate("/login-afterearth");
        }
      }
    } catch (error) {
      showAlert("An error occurred while signing up. Please try again.");
    }
  };

  return (
    <div className="login-signup-container">
      <div className="signup-container">
        <div className="header">
          <p>Create Account</p>
        </div>

        <div className="input-container">
          <div className="name-input-content">
            <div className="input-content">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                id="fistname-input"
                className="fistname-input"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-content">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                id="lastname-input"
                className="lastname-input"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="input-content">
            <input
              type="text"
              name="username"
              placeholder="Username"
              id="username-input"
              className="username-input"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-content">
            <input
              type="email"
              name="email"
              placeholder="Email"
              id="user-email"
              className="signup-email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-content">
            <input
              type="password"
              name="password"
              placeholder="Password"
              id="user-password"
              className="signup-password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-content">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Conform Password"
              id="user-Conform-password"
              className="signup-password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="container-checkbox">
          <div
            id="checkbox"
            className="checkbox"
            onClick={handleCheckboxClick} // Add onClick handler
          >
            <i
              className={isChecked ? "bx bx-check-square" : "bx bx-checkbox"}
            ></i>
            {/* Toggle icon */}
          </div>

          <span>
            I Agree with{" "}
            <a href="#" className="link">
              privacy
            </a>{" "}
            and{" "}
            <a href="#" className="link">
              policy
            </a>
          </span>
        </div>

        {/* Display error message */}
        {errorMessage && (
          <div className="error-message">
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="container-signup-btn">
          <button id="signup-btn" className="signup-btn" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>

        <div className="container-signup-footer">
          <span>
            Already have an account?{" "}
            <span
              id="go-signin-page"
              className="go-signin-page"
              onClick={() => navigate("/login-afterearth")}
            >
              Sign In
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;

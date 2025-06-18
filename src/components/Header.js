// components/Header.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import logo from "../assets/logo.png";
import user from "../assets/user.png";

const Header = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleCreateClick = () => {
    navigate("/create-afterearth"); // Navigate to the "/create-afterearth" route
  };

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login-afterearth");
  };

  return (
    <header>
      {/* navbar section */}

      <nav className="navbar">
        {/* sidebar & logo section */}

        <div className="logo-content">
          {/* open navbar --- for minimize  */}

          <div className="open-navbar">
            <i class="bx bx-menu-alt-left"></i>
          </div>

          {/* Logo Section */}

          <div className="logo-container">
            <img src={logo} alt="New Earth Logo" className="logo" />
            <span className="brand-name">AfterEarth</span>
          </div>
        </div>

        {/* Search Section */}

        <div className="search">
          <i class="bx bx-search"></i>
          <input type="search" placeholder="Search New Earth" />
        </div>

        {/* Other icons section */}

        <div className="nav-container-icons">
          {/* Create Post Section */}

          <div
            className="createpost nav-content-icons"
            onClick={handleCreateClick}
          >
            <i class="bx bx-plus"></i>
            <small>Create</small>
          </div>

          {/* Notification Icon */}

          <div className="notification nav-content-icons">
            <i class="bx bx-bell"></i>
          </div>

          {/* User Profile Section */}

          <div className="user nav-content-icons" onClick={handleProfileClick}>
            <img src={user} alt="User" />
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

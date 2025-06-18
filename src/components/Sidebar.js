// components/Sidebar.js
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
// import user from "../assets/user.png"; // Importing the logo image

const Sidebar = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleHomeClick = () => {
    navigate("/home-afterearth"); // Navigate to the "/create" route
  };

  return (
    <div className="sidenav-container">
      <div className="sidenav-content">
        <div className="sidenav-main second-style">
          <div className="home-content one-style" onClick={handleHomeClick}>
            <i class="bx bxs-home"></i>
            <a href="#home">Home</a>
          </div>

          <div className="popular-content one-style">
            <i class="bx bx-trending-up"></i>
            <a href="#popular">Popular</a>
          </div>
          <div className="all-content one-style">
            <i class="bx bx-bar-chart"></i>
            <a href="#all">All</a>
          </div>
        </div>

        {/* recent section */}

        <div className="recent-container second-style">
          <div className="recent-content">
            <span>RECENT</span>
            <i class="bx bx-chevron-down"></i>
          </div>
        </div>

        {/* app information and others */}

        <div className="app-information second-style">
          <div className="about-web one-style">
            <i class="bx bxs-group"></i>
            <a href="#about">About AfterEarth</a>
          </div>
          <div className="help one-style">
            <i class="bx bxs-help-circle"></i>
            <a href="#help">Help</a>
          </div>
        </div>

        {/* policy */}

        <div className="app-policy second-style">
          <div className="content-policy one-style">
            <i class="bx bxs-notepad"></i>
            <a href="#content">Content Policy</a>
          </div>

          <div className="privacy one-style">
            <i class="bx bxs-receipt"></i>
            <a href="#privacy">Privacy Policy</a>
          </div>

          <div className="user-agreement one-style">
            <i class="bx bxs-edit"></i>
            <a href="#agreement">User Agreement</a>
          </div>
        </div>

        <footer>
          <a href="#rights" className="copyrights">
            AfterEarth, lnc. &copy; 2024. All rights reserved.
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Sidebar;

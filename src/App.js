import React from "react";
import { Routes, Route } from "react-router-dom"; // Import required routing components
import Signup from "./components/Signup.js";
import Login from "./components/Login.js";
import Home from "./components/Home.js"; // Example home component
import CreatePage from "./components/Createpage.js";
import NotFound from "./components/NotFound.js"; // Create this file for a 404 page
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signup-afterearth" element={<Signup />} />
      <Route path="/login-afterearth" element={<Login />} />
      <Route path="/home-afterearth" element={<Home />} />
      <Route path="/create-afterearth" element={<CreatePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;

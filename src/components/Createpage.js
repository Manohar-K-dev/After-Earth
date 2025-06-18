import React, { useState } from "react";
import Header from "./Header.js";
import Sidebar from "./Sidebar.js";
import Create from "./Create.js";

const CreatePage = () => {
  const [posts, setPosts] = useState([]); // ✅ State for storing posts

  // ✅ Function to handle new post submission
  const handlePostSubmit = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]); // ✅ Update posts after creation
  };

  return (
    <>
      <Header />
      <Sidebar />
      <Create onPostSubmit={handlePostSubmit} />{" "}
      {/* ✅ Passing function properly */}
    </>
  );
};

export default CreatePage;

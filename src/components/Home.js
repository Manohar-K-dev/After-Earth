// components/Home.js
import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import Sidebar from "./Sidebar.js";
import Post from "./Post.js";
// import Create from "./Create.js";

const Home = () => {
  const [posts, setPosts] = useState([]); // ✅ Store posts

  // ✅ Fetch posts when the page loads
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/home-afterearth`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // const text = await response.text(); // Get raw response
        // if (!text) {
        //   throw new Error("Empty response from server");
        // }

        const data = await response.json();
        setPosts(data); // ✅ Store posts in state
      } catch (error) {
        console.error("❌ Failed to load posts:", error);
      }
    };

    fetchPosts();
  }, []); // ✅ Runs only on page load

  // ✅ Function to add a new post immediately after creation
  // const handlePostSubmit = (newPost) => {
  //   setPosts((prevPosts) => [newPost, ...prevPosts]); // Add new post to UI
  // };

  return (
    <>
      <Header />
      <Sidebar />

      {/* {page === "create" && <Create onPostSubmit={handlePostSubmit} />} */}

      <div className="onepost">
        {" "}
        {/* ✅ Horizontal scroll container */}
        {posts.length > 0 ? (
          posts.map((post, index) => <Post key={index} postData={post} />)
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </>
  );
};

export default Home;

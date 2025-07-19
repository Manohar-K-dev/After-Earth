import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const Create = ({ onPostSubmit }) => {
  const [title, setTitle] = useState(""); // For title input
  const [content, setContent] = useState(""); // For textarea content
  // const [uploadedFiles, setUploadedFiles] = useState([]); // For uploaded files
  const [file, setFile] = useState(null);
  const [link, setLink] = useState(""); // For link input
  const [postType, setPostType] = useState("Text"); // To track the selected post type
  const [selectedFile, setSelectedFile] = useState(null); // ✅ Declare selectedFile state
  const navigate = useNavigate(); // ✅ Initialize navigate

  // ✅ Check if onPostSubmit is missing
  if (!onPostSubmit || typeof onPostSubmit !== "function") {
    console.error("❌ ERROR: onPostSubmit is missing or not a function!");
    return null; // Prevent rendering if the function is missing
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value); // Update title input state
  };

  const handleInputChange = (e) => {
    const textarea = e.target;
    setContent(textarea.value);

    // Adjust the height dynamically
    textarea.style.height = "auto"; // Reset height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set new height
  };

  // const handleFileChange = (e) => {
  //   const files = Array.from(e.target.files); // Get the selected files
  //   setUploadedFiles((prev) => [...prev, ...files]); // Add to the existing file list
  // };

  const handleLinkChange = (e) => {
    setLink(e.target.value); // Update link input state
  };

  const handlePostTypeClick = (type) => {
    setPostType(type); // Update the current post type
  };

  const handleClearFields = () => {
    // Clear all input fields
    setContent("");
    // setUploadedFiles([]);
    setLink("");
    setTitle("");
    // Optionally reset post type
    // setPostType("Text");
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // ✅ Store uploaded file
  };

  const handlePost = async (event) => {
    console.log("mano");

    event.preventDefault();

    if (typeof onPostSubmit !== "function") {
      console.error("❌ ERROR: onPostSubmit is not a function!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("file", selectedFile);
    formData.append("link", link);
    formData.append("postType", postType);

    const username = localStorage.getItem("username"); // ✅ Get username from localStorage
    if (!username) {
      console.error("❌ No username found in localStorage!");
      return;
    }

    formData.append("username", username);

    if (file) {
      formData.append("file", file); // ✅ Append file
    }

    // let postData = { title, content: "", file: null, link: "", postType: "" };

    // if (uploadedFiles.length > 0) {
    //   postData = {
    //     ...postData,
    //     file: uploadedFiles[0].name,
    //     postType: "Image/Video",
    //   };
    // } else if (link.trim() !== "") {
    //   postData = { ...postData, link, postType: "Link" };
    // } else if (content.trim() !== "") {
    //   postData = { ...postData, content, postType: "Text" };
    // }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/home-afterearth`,
        {
          method: "POST",
          // headers: { "Content-Type": "application/json" },

          body: formData, // ✅ Send FormData instead of JSON

          // body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        throw new Error(`❌ Server Error: ${response.status}`);
      }

      const data = await response.json();
      if (response.ok) {
        console.log("✅ Post Created:", data);
        navigate("/home-afterearth");
      } else {
        console.error("❌ Post Failed:", data.message);
      }
    } catch (error) {
      console.error("❌ Network Error:", error);
    }

    //   const data = await response.json();
    //   console.log("✅ Post Created:", data);

    //   if (onPostSubmit) {
    //     onPostSubmit(data.post); // Send new post to frontend
    //   } else {
    //     console.error("Error creating post:", data.message);
    //   }
    //   navigate("/home-afterearth"); // ✅ Redirect to home page
    // } catch (error) {
    //   console.error("Network error:", error);
    // }

    setTitle("");
    setContent("");
    // setUploadedFiles([]);
    setLink("");
    setPostType("");
  };

  return (
    <div className="main-container">
      <div className="create-post-content">
        <div className="create-post-heading">
          <h2>Create post</h2>
        </div>

        <div className="select-category-container">
          <div className="select-category">
            <h4>Select a category</h4>
            <i className="bx bx-chevron-down"></i>
          </div>
        </div>

        <div className="post-type-container">
          <div className="post-type">
            <h4
              onClick={() => handlePostTypeClick("Text")}
              style={{ color: postType === "Text" ? "#fff" : "#80a2a3" }}
            >
              Text
            </h4>
            <h4
              onClick={() => handlePostTypeClick("Images & Video")}
              style={{
                color: postType === "Images & Video" ? "#fff" : "#80a2a3",
              }}
            >
              Images & Video
            </h4>
            <h4
              onClick={() => handlePostTypeClick("Link")}
              style={{ color: postType === "Link" ? "#fff" : "#80a2a3" }}
            >
              Link
            </h4>
          </div>

          {/* Title Input */}

          <div className="title-container">
            <div className="title-content">
              <input
                type="text"
                placeholder="Title*"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <h6>0/300</h6>
          </div>

          {/* Text Input */}

          <div className="upload-value-container">
            {/* Conditionally render fields based on the selected post type */}
            {postType === "Text" && (
              <form className="upload-value-content">
                <textarea
                  value={content}
                  onChange={handleInputChange}
                  placeholder="Body"
                  className="textarea text-input"
                />
              </form>
            )}

            {/* File Input */}

            {postType === "Images & Video" && (
              <form className="upload-value-content file-content">
                <input
                  type="file"
                  accept="image/*, video/*" // Allow only images and videos
                  multiple
                  onChange={handleFileChange} // ✅ Attach event handler
                  className="file-input"
                />
              </form>
            )}

            {/* Link Input */}

            {postType === "Link" && (
              <form className="upload-value-content">
                <input
                  type="url"
                  placeholder="Link*"
                  value={link}
                  onChange={handleLinkChange}
                  className="link-input"
                />
              </form>
            )}
          </div>
        </div>

        <div className="complete-btn-container">
          <div className="complete-btn-content">
            {/* Clear Button */}

            <div className="clear-btn-container one-style">
              <div className="clear-btn">
                <button type="button" onClick={handleClearFields}>
                  Clear All
                </button>
              </div>
            </div>

            {/* Post Button */}

            <div className="post-btn-container one-style">
              <div className="post-btn">
                <button type="submit" onClick={handlePost}>
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;

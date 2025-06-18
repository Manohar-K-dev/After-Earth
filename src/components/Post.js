// components/Post.js
import React from "react";
import user from "../assets/user.png";
import { formatDistanceStrict } from "date-fns"; // ✅ Import time ago function

const Post = ({ postData }) => {
  if (!postData) {
    return <p>No post available</p>; // ✅ Prevents error when postData is undefined
  }

  return (
    <div className="main-container">
      <div className="post-content">
        {/* post user container */}
        <div className="onepost">
          <div className="post-user-container group-one">
            {/* post user */}

            <div className="post-user-content">
              <img src={user} alt="User" />
              <h5 className="post-user-name">
                {postData.username || "Unknown User"}
              </h5>{" "}
              {/* ✅ Show who posted it */}
              <h6 className="post-time">
                {formatDistanceStrict(
                  new Date(postData.createdAt),
                  new Date(),
                  {
                    addSuffix: true,
                  }
                )}
              </h6>
            </div>

            {/* three(3) dot */}

            <div className="three-dot">
              <i class="bx bx-dots-vertical-rounded"></i>
            </div>
          </div>
          {/* tag line */} {/* ✅ Title */}
          <div className="tagline group-one">
            {postData.title && (
              <p className="tag post-title">{postData.title}</p>
            )}
          </div>
          {/* ✅ Display Image */}
          <div className="post-image-container group-one">
            {postData.file ? (
              <img
                src={`http://localhost:5000/uploads/${postData.file}`} // ✅ Correct image path
                alt="Post"
                className="post-image"
                onError={(e) => {
                  console.error("❌ Image failed to load:", e.target.src);
                  e.target.style.display = "none"; // Hide broken images
                }}
              />
            ) : (
              <p></p> // ✅ If no image, display text
            )}

            {/* {postData.postType === "Image/Video" && postData.file && (
              <img
                src={`http://localhost:5000/uploads/${postData.file}`}
                alt="Post"
                className="post-image"
                // onError={(e) => (e.target.style.display = "none")} // ✅ Hide broken images
              />
            )} */}

            {/* ✅ Link Preview */}
            {postData.postType === "Link" && (
              <a
                href={postData.link}
                target="_blank"
                rel="noopener noreferrer"
                className="post-image post-link"
              >
                {postData.link}
              </a>
            )}

            {/* ✅ Text Content */}
            {postData.postType === "Text" && (
              <p className="tag">{postData.content}</p>
            )}
          </div>
          {/* Like, Comment, Share Buttons */}
          <div className="post-interact group-one">
            <div className="like-div">
              <i class="bx bx-like"></i>
            </div>

            <div className="comment-div">
              <i class="bx bxs-comment-detail comment"></i>
            </div>

            <div className="share-div">
              <i class="bx bx-share bx-flip-horizontal"></i>
              <small>Share</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

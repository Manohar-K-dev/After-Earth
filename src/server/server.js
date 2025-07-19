import express, { json } from "express";
import { Schema, model } from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs"; // For password hashing
import path from "path";
import multer from "multer"; // ✅ Import multer for file uploads
import { fileURLToPath } from "url"; // Required for ES Module __dirname workaround
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000; // ✅ Use a different port for backend

// Middleware
app.use(cors());
app.use(express.json()); // ✅ Middleware to parse JSON
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // ✅ Serve uploaded files

// Serve the React frontend from the "build" folder
// app.use(express.static(path.join(__dirname, "../../build")));

// ✅ Connect to MongoDB
// const MONGO_URI = "mongodb://localhost:27017/afterEarth"; // Example local connection string

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.log("❌ MongoDB Connection Error:", error));

// ✅ Set up Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads/")); // ✅ Save files in "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // ✅ Rename file with timestamp
  },
});
const upload = multer({ storage });

// User Schema
const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
  },
  { timestamps: true }
); // ✅ Adds createdAt & updatedAt timestamps

const User = model("User", userSchema);

// API Routes

// Root route: Redirect to /signup-afterearth
app.get("/", (req, res) => {
  res.redirect("/signup-afterearth");
});

// Signup Route (handling POST requests for signup)
app.post("/signup-afterearth", async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword, // Store hashed password
    });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving user", error });
  }
});

// Login Route (new code for /login endpoint)
app.post("/login-afterearth", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if passwords match
    const isPasswordValid = await bcrypt.compare(password, user.password); // Compare hashed passwords
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Respond with success if authentication is successful
    res
      .status(200)
      .json({ message: "Login successful", username: user.username });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

// ✅ Define Post Schema
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  file: String, // ✅ Store file path
  link: String,
  postType: String,
  username: { type: String, required: true }, // ✅ Ensure username is stored
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

// ✅ Route to Upload a Post
app.post("/home-afterearth", upload.single("file"), async (req, res) => {
  console.log("🟢 Upload Request:", req.body);
  console.log("🟡 Uploaded File:", req.file); // ✅ Log file details

  const { title, content, link, postType, username } = req.body; // ✅ Get username from frontend
  const file = req.file ? req.file.filename : null; // ✅ Get uploaded file

  if (!username) {
    return res.status(400).json({ message: "❌ Username is required!" });
  }

  try {
    const newPost = new Post({
      title,
      content,
      file,
      link,
      postType,
      username,
    }); // ✅ Save username
    await newPost.save(); // ✅ Save to MongoDB
    console.log("✅ Post Created with Image:", file); // ✅ Log image file name
    console.log("✅ Post Created by:", username);

    res
      .status(201)
      .json({ message: "✅ Post created successfully", post: newPost });
  } catch (error) {
    console.error("❌ Error Saving Post:", error);
    res.status(500).json({ message: "❌ Error saving post", error });
  }
});

// ✅ Route to Fetch Posts
app.get("/home-afterearth", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // Fetch latest posts

    if (!posts || posts.length === 0) {
      return res.status(200).json([]); // ✅ Return an empty array instead of an undefined response
    }
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "❌ Error fetching posts", error });
  }
});

// Handle all other requests by serving React's `index.html`
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../../build/index.html"));
// });

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

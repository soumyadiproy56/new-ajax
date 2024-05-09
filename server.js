const express = require("express");
const path = require("path");
const fs = require("fs").promises;

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));

// Route to handle form submission
app.post("/register", async (req, res) => {
  try {
    const newUserData = req.body;

    // Path to the data file
    const dataFilePath = path.join(__dirname, "data", "data.json");
    console.log("Data file path:", dataFilePath);

    // Check if the data file is empty
    let stats;
    try {
      stats = await fs.stat(dataFilePath);
    } catch (err) {
      console.error("Error checking file stats:", err);
      stats = { size: 0 }; // If file not found, treat as empty file
    }

    // Read existing data from file
    let fileContent;
    if (stats.size === 0) {
      console.log("Data file is empty.");
      fileContent = "[]";
    } else {
      fileContent = await fs.readFile(dataFilePath, "utf-8");
    }

    // Parse existing data or initialize an empty array
    const userData = JSON.parse(fileContent);

    // Add the new user data
    userData.push(newUserData);

    // Write the updated data back to the file
    await fs.writeFile(dataFilePath, JSON.stringify(userData, null, 2));

    // Send a successful response
    res.status(201).json({
      success: true,
      message: "Data saved successfully",
      user: newUserData,
    });
  } catch (error) {
    console.error("Error handling form submission:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while posting the data",
    });
  }
});

// Route to serve user.html
app.get("/user", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "user.html"));
});

// Route to serve `all_userdetail.html`
app.get("/all_userdetail", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "all_userdetail.html"));
});

// Route to provide all user details
app.get("/api/users", async (req, res) => {
  // Path to the data file
  const dataFilePath = path.join(__dirname, "data", "data.json");

  try {
    // Read existing data from file
    const fileContent = await fs.readFile(dataFilePath, "utf-8");

    // Parse existing data
    const userData = JSON.parse(fileContent);

    // Send the data as JSON response
    res.json(userData);
  } catch (error) {
    console.error("Error retrieving user data:", error);
    res
      .status(500)
      .json({ success: false, message: "Error retrieving user data" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

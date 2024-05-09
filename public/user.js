// Function to render user data
function renderUserData() {
  // Retrieve data from local storage
  const userData = localStorage.getItem("userDetails");

  // Check if data exists
  if (userData) {
    // Parse JSON data
    const user = JSON.parse(userData);
    console.log(user);
    // Get the container element to render data
    const userDataContainer = document.getElementById("userDataContainer");

    // Create HTML content to display user data
    const userHtml = `
            <p><strong>Name:</strong> ${user.user.name}</p>
            <p><strong>Email:</strong> ${user.user.email}</p>
            <p><strong>Password:</strong> ${user.user.password}</p>
        `;

    // Update the container element with user data
    userDataContainer.innerHTML = userHtml;
  } else {
    // Display a message if no user data is found
    const userDataContainer = document.getElementById("userDataContainer");
    userDataContainer.innerHTML = "<p>No user data found.</p>";
  }
}

// Call the function to render user data when the page loads
renderUserData();

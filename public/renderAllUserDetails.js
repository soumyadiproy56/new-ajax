// Function to render all user details
async function renderAllUserDetails() {
  try {
    // Make a GET request to the /api/users endpoint
    const response = await fetch("/api/users");

    // Check if the response status is ok (2xx)
    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    // Parse the JSON response
    const userData = await response.json();

    // Get the container element to render data
    const userDetailsContainer = document.getElementById(
      "userDetailsContainer"
    );

    // Initialize an empty string to build the HTML table content
    let allUserHtml = "";

    // Start the HTML table
    allUserHtml += `
            <table border="1">
                <thead>
                    <tr>
                        <th>User #</th>
                        <th>Name</th>
                        <th>Email</th>
                       
                    </tr>
                </thead>
                <tbody>
        `;

    // Iterate over the user data and build the HTML content
    userData.forEach((user, index) => {
      allUserHtml += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                </tr>
            `;
    });

    // Close the HTML table
    allUserHtml += `
                </tbody>
            </table>
        `;

    // Update the container element with all user details
    userDetailsContainer.innerHTML = allUserHtml;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

// Call the function to render all user details when the page loads
window.onload = renderAllUserDetails;

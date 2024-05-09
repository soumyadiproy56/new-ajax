// Function to handle form submission
async function handleFormSubmission(event) {
  event.preventDefault(); // Prevent default form submission

  // Collect form data
  const formData = new FormData(event.target);

  // Convert FormData to a plain object
  const data = Object.fromEntries(formData.entries());

  try {
    console.log(JSON.stringify(data));
    // Use fetch API to send AJAX POST request
    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Check if the response status is ok (2xx)
    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    // Parse the JSON response
    const responseData = await response.json();

    // Save the response data to local storage
    localStorage.setItem("userDetails", JSON.stringify(responseData));

    // Additional code to render or use the data
    window.location.href = "/user";
  } catch (error) {
    console.error("Error during AJAX POST request:", error);
  }
}

// Add event listener to the form
document
  .getElementById("registrationForm")
  .addEventListener("submit", handleFormSubmission);

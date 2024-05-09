// Function to handle form submission
async function handleFormSubmission(event) {
  event.preventDefault(); // Prevent default form submission

  // Collect form data
  const formData = new FormData(event.target);

  // Convert FormData to a plain object
  const data = Object.fromEntries(formData.entries());

  try {
    console.log(JSON.stringify(data));

    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Configure the request
    xhr.open("POST", "/register");

    // Set the request header
    xhr.setRequestHeader("Content-Type", "application/json");

    // Define what happens when the request completes
    xhr.onload = function () {
      // Check if the response status is ok (2xx)
      if (xhr.status >= 200 && xhr.status < 300) {
        // Parse the JSON response
        const responseData = JSON.parse(xhr.responseText);

        // Save the response data to local storage
        localStorage.setItem("userDetails", JSON.stringify(responseData));

        // Redirect to the user page
        window.location.href = "/user";
      } else {
        console.error(`Server error: ${xhr.statusText}`);
      }
    };

    // Define what happens in case of an error
    xhr.onerror = function () {
      console.error("Error during AJAX POST request");
    };

    // Send the request with the data
    xhr.send(JSON.stringify(data));
  } catch (error) {
    console.error("Error during AJAX POST request:", error);
  }
}

// Add event listener to the form
document
  .getElementById("registrationForm")
  .addEventListener("submit", handleFormSubmission);

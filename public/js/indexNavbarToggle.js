document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("loginButton");
    const registerButton = document.getElementById("registerButton");
    const indexButton = document.getElementById("indexButton");

       
  
    // Check if token exists in local storage
    const token = localStorage.getItem("token");
    if (token) {
      // Token exists, show profile button and hide login and register buttons
      loginButton.classList.add("d-none");
      registerButton.classList.add("d-none");

    } else {
      // Token does not exist, show login and register buttons and hide profile and logout buttons
      loginButton.classList.remove("d-none");
      registerButton.classList.remove("d-none");

    }
});
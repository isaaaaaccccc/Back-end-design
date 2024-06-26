document.addEventListener("DOMContentLoaded", function () {
    const profileButton = document.getElementById("profileButton");
    const logoutButton = document.getElementById("logoutButton");
    const userinfoButton = document.getElementById("userinfoButton");
    const blogButton = document.getElementById("blogButton");
    const questButton = document.getElementById("questButton");
    const shopButton = document.getElementById("shopButton");
    const indexButton = document.getElementById("indexButton");
    
       
  
    // Check if token exists in local storage
    const token = localStorage.getItem("token");
    if (token) {
      // Token exists, show profile button and hide login and register buttons
      indexButton.classList.add("d-none");

      userinfoButton.classList.remove("d-none");
      blogButton.classList.remove("d-none");
      questButton.classList.remove("d-none");
      shopButton.classList.remove("d-none");


      profileButton.classList.remove("d-none");
      logoutButton.classList.remove("d-none");
    } else {
      // Token does not exist, show login and register buttons and hide profile and logout buttons
      indexButton.classList.remove("d-none");

      userinfoButton.classList.add("d-none");
      blogButton.classList.add("d-none");
      questButton.classList.add("d-none");
      shopButton.classList.add("d-none");

      
      profileButton.classList.add("d-none");
      logoutButton.classList.add("d-none");
    }
  
    logoutButton.addEventListener("click", function () {
      // Remove the token from local storage and redirect to index.html
      localStorage.removeItem("token");
      localStorage.clear();
      
      window.location.href = "index.html";
    });
  });
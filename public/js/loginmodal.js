document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
      // console.log("responseStatus:", responseStatus);
      // console.log("responseData:", responseData);
      if (responseStatus == 200) {
        // Check if login was successful
        if (responseData.token) {
          // Store the token in local storage
          localStorage.setItem("token", responseData.token);//changes login into logout 
          // save userid in local storage
          localStorage.setItem("user_id", responseData.user_id);
          // Redirect or perform further actions for logged-in user
          window.location.href = `profile.html`;// bring to login successful page
        }
      } else {
        warningCard.classList.remove("d-none");
        warningText.innerText = responseData.message;
      }
    };
  
    const loginForm = document.getElementById("loginForm");
  
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");
  
    loginForm.addEventListener("submit", function (event) {
      // console.log("loginForm.addEventListener");
      event.preventDefault();
  
      const email = document.getElementById("email_login").value;
      const password = document.getElementById("password_login").value;
  
      const data = {
        email: email,
        password: password,
      };
      // Perform login request
      fetchMethod(currentUrl + "/api/login", callback, "POST", data);
  
      // Reset the Modal fields
      loginForm.reset();
    });
  });
  
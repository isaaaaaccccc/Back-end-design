document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");
    const warningCard = document.getElementById("warningCardRegister");
    const warningText = document.getElementById("warningTextRegister");

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

    
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if(password.value != confirmPassword.value){
            alert("Passwords do not match");
            return;
        }


        // Perform signup logic
        if (password === confirmPassword) {
    // Passwords match, proceed with signup
        // console.log("Signup successful");
        // console.log("Username:", username);
        // console.log("Email:", email);
        // console.log("Password:", password);
        warningCard.classList.add("d-none");
        
        const data = {
        username: username,
        email: email,
        new_password: password
        };
        
    const callback = (responseStatus, responseData) => {
    // console.log("responseStatus:", responseStatus);
    // console.log("responseData:", responseData);
    if (responseStatus == 200) {
        // Check if signup was successful
        if (responseData.token) {
        // Store the token in local storage
        localStorage.setItem("token", responseData.token);//changes login into logout 
        localStorage.setItem("user_id", responseData.user_id);
        // Redirect or perform further actions for logged-in user
        window.location.href = `profile.html`;// bring to login successful page
        }
    } else {
        warningCard.classList.remove("d-none");
        warningText.innerText = responseData.message;
    }
    };
    
    // Perform signup request
    fetchMethod(currentUrl + "/api/register", callback, "POST", data);
    
    // Reset the form fields
    registerForm.reset();

        } 
        else {
        // Passwords do not match, handle error
        warningCard.classList.remove("d-none");
         warningText.innerText = "Passwords do not match";
        }
      });
  });
  
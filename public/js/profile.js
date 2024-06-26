document.addEventListener("DOMContentLoaded", function () {
    // DOMContentLoaded= when all the html content on a page is fully loaded
    // url = new URL(document.URL);
    // const urlParams = url.searchParams;
    // const user_id = urlParams.get("user_id");

    // define constants and variables
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const userProfilepicture = document.getElementById("userProfilepicture");
    const userID = document.getElementById("userID");
    const userName = document.getElementById("userName");
    const userBio = document.getElementById("userBio");
    const userEmail = document.getElementById("userEmail");
    const userCreatedon = document.getElementById("userCreatedon");
    const userRank = document.getElementById("userRank");
    const userTotalpoints = document.getElementById("userTotalpoints");
    const userPoints = document.getElementById("userPoints");

    const editUsername = document.getElementById("editUsername");   
    const editEmail = document.getElementById("editEmail");
    const editBio = document.getElementById("editBio");
    const editProfilePicture = document.getElementById("editProfilePicture");
    const editSubmitbutton = document.getElementById("editSubmitbutton");

    const userDeleteButton = document.getElementById("userDeleteButton");
 
 
    const oldPassword = document.getElementById("oldPassword");   
    const newPassword = document.getElementById("newPassword");
    const newPasswordAgain = document.getElementById("newPasswordAgain");
    const PasswordchangeSubmitButton = document.getElementById("PasswordchangeSubmitButton");

//   callback for displaying user info
    const callbackForUserInfo = (responseStatus, responseData) => {
        if (responseStatus === 401) {
            alert("You are not authorized to view this page. Please login and try again.");
            window.location.href = "index.html";
            localStorage.removeItem("token");
          }

        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
    
        const UserInfo = document.getElementById("Userinfo");
        const token = localStorage.getItem("token");

        if (responseStatus == 404) {
          UserInfo.innerHTML = `${responseData.message}`;
          return;
        }
        


//     display user info
        userProfilepicture.src = `${responseData[0].profile_picture}`;
        userID.innerHTML = `${user_id}`;
        userName.innerHTML = `${responseData[0].username}`;
        userBio.innerHTML = `${responseData[0].bio}`;
        userEmail.innerHTML = `${responseData[0].email}`;
        userCreatedon.innerHTML = `${responseData[0].created_on}`;
        userRank.innerHTML = `${responseData[0].user_rank}`;
        userTotalpoints.innerHTML = `${responseData[0].total_points}`;
        userPoints.innerHTML = `${responseData[0].spendable_points}`;



        editUsername.value = `${responseData[0].username}`;
        editEmail.value = `${responseData[0].email}`;
        editBio.value = `${responseData[0].bio}`;
        editProfilePicture.value = `${responseData[0].profile_picture}`;




    };
    
    
//   fetch user info
    fetchMethod(currentUrl + `/api/users/${user_id}`, callbackForUserInfo,"GET",null,token);

// generic callback for all fetch requests
    const callback = (responseStatus, responseData) => {

        // console.log("responseStatus:", responseStatus);
        // console.log("responseData:", responseData);


    }

//  event listeners for when edit submit button is clicked to send request
    editSubmitbutton.addEventListener("click", function (event) {
        event.preventDefault();
        data1={
            username : editUsername.value,
        }
        data2={
            email : editEmail.value
        }
        data3={
            bio : editBio.value,
        }
        data4={
            profile_picture : editProfilePicture.value
        }


  
        fetchMethod(currentUrl + `/api/users/username/${user_id}`, callback, "PUT", data1,token);
        fetchMethod(currentUrl + `/api/users/email/${user_id}`, callback, "PUT", data2,token);
        fetchMethod(currentUrl + `/api/users/bio/${user_id}`, callback, "PUT", data3,token);
        fetchMethod(currentUrl + `/api/users/picture/${user_id}`, callback, "PUT", data4,token);
        window.location.reload(true);
    });

    // event listener for when delete button is clicked to send request
    userDeleteButton.addEventListener("click", function (event) {
        event.preventDefault();
        fetchMethod(currentUrl + `/api/users/${user_id}`, callback, "DELETE",null,token);
        localStorage.removeItem("token");
        window.location.href = "index.html";
    });

    // event listener for when change password submit button is clicked to send request
    PasswordchangeSubmitButton.addEventListener("click", function (event) {
        if(newPassword.value != newPasswordAgain.value){
            alert("Passwords do not match");
            return;
        }
        if(newPassword.value==oldPassword.value){
            alert("New password should be different from old password");
            return;
        }
        if(newPassword.value==undefined||newPassword.value==null||newPassword.value==""||oldPassword.value==undefined||oldPassword.value==null||oldPassword.value==""||newPasswordAgain.value==undefined||newPasswordAgain.value==null||newPasswordAgain.value==""){
            alert("Please fill in all the fields");
            return;
        }

        event.preventDefault();
        data={
            user_id : Number(user_id),
            password : oldPassword.value,
            new_password : newPassword.value
        }
        fetchMethod(currentUrl + `/api/change_password`, callback, "PUT", data,token);
        window.location.reload(true);

        
    });

//   callback for displaying task progress info
    const callbackForTaskProgressInfo = (responseStatus, responseData) => {
        // console.log("responseStatus:", responseStatus);
        // console.log("responseData:", responseData);
  
        responseData.forEach((TaskProgress) => {
        const TaskProgressList = document.getElementById("TaskProgressList");
        const displayItem = document.createElement("div");
          displayItem.className =
            "col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 p-3";
          displayItem.innerHTML = `
          <div class="card h-100">
          <div class="card-body d-flex flex-column justify-content-center align-items-center">
              <img src="${TaskProgress.image}" alt="Task Image" style="width: 350px; height: 200px; "></img>
              <h5 class="card-title">${TaskProgress.title}</h5>
              <p class="card-text ">
                  user: ${TaskProgress.username}<br>
                  description: ${TaskProgress.description}<br>
                  notes: ${TaskProgress.notes}<br>
                  points: ${TaskProgress.points}<br>
                  Completion Date: ${TaskProgress.completion_date}<br>
                  
              </p>
              <button type="button" class="btn btn-secondary" style="width: 100%;" id="questEditButton" data-toggle="modal" data-target="#editTaskProgressModal">Edit</button>

          </div>
          </div>
            `;
            TaskProgressList.appendChild(displayItem);

            const editNotes = document.getElementById("editNotes");
            editNotes.value=TaskProgress.notes;

            const editTaskProgressSubmitbutton = document.getElementById(`editTaskProgressSubmitbutton`);

            // event listener for when edit button is clicked to send request
            editTaskProgressSubmitbutton.addEventListener("click", function (event) {
                event.preventDefault();
                const callbackForEdit = (responseStatus, responseData) => {
                    // console.log("responseStatus:", responseStatus);
                    // console.log("responseData:", responseData);
                }

                data={
                    notes : editNotes.value
                }

                fetchMethod(currentUrl + `/api/task_progress/${TaskProgress.progress_id}`, callbackForEdit, "PUT", data,token);
                window.location.reload(true);

            });

          });


  
    }

// callback for displaying user info
    const callback2 = (responseStatus, responseData) => {

        responseData.forEach((user) => {
            // console.log("responseStatus:", responseStatus);
            // console.log("responseData:", responseData);
            if(user.user_id!=user_id){
            const dropdownList= document.getElementById("UserSelect");
                
            // Create a new <a> element
            const dropdownItem = document.createElement("option");

            dropdownItem.setAttribute("class", "dropdown-item");
            dropdownItem.setAttribute("id", user.user_id);
        
            // Set the text content of the <a> element
            dropdownItem.textContent = "User: "+user.username+"   ,Current points: "+user.spendable_points;
        
            // Append the <a> element to the dropdownList
            dropdownList.appendChild(dropdownItem);
            }
        });
    }
    

// fetch user info
    fetchMethod(currentUrl + "/api/users", callback2,"GET",null,token);
    
// callback for getting item list
    const ItemList = document.getElementById("ItemList");
    const callbackForItemList = (responseStatus, responseData) => {
        // console.log("responseStatus:", responseStatus);
        // console.log("responseData:", responseData);
        responseData.forEach((Item) => {
            const displayItem = document.createElement("div");
            displayItem.className =
              "col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12 p-3";
            displayItem.innerHTML = `
            <div class="card h-100">
                <div class="card-body d-flex flex-column justify-content-center align-items-center text-center">
                <img src="${Item.image}" alt="User Profile Picture" style="width: 200px; height: 200px;"></img>
                    <h5 class="card-title">${Item.item_description}</h5>
                    <div class="mt-auto">
                        <p class="card-text">
                            Attack power: ${(Item.cost)*2}
                        </p>
                        <a id="attackButton" class="btn btn-danger text-white" data-toggle="modal" data-target="#attackModal">Attack</a>
                    </div>
                </div>
            </div>`;

            const dropdownList= document.getElementById("itemSelect");
                
            // Create a new <a> element
            const dropdownItem = document.createElement("option");

            dropdownItem.setAttribute("class", "dropdown-item");
            dropdownItem.setAttribute("id", Item.item_id);
            // Set the text content of the <a> element
            dropdownItem.textContent = "Item: "+Item.item_description+"   ,Cost: "+Item.cost;
        
            // Append the <a> element to the dropdownList
            dropdownList.appendChild(dropdownItem);
            ItemList.appendChild(displayItem);
            
            

        });
        
        const attackSubmitButton = document.getElementById("attackSubmitButton");
        const itemIdField = document.getElementById("itemIdField");

        // event listener for when attack button is clicked to send request
        attackSubmitButton.addEventListener("click", function (event) {
            event.preventDefault();
            const userSelect= document.getElementById("UserSelect");
            const selectedOption = userSelect.selectedOptions[0];
            const victim_id = selectedOption.id;

            const itemSelect= document.getElementById("itemSelect")
            const selectedOption2 = itemSelect.selectedOptions[0];
            const item_id = selectedOption2.id;

            const data = {
                user_id: user_id,
                victim_id: victim_id,
                item_id: item_id

            };
            fetchMethod(currentUrl + `/api/shops/attack/${Number(user_id)}`, callback, "POST", data, token)
           
            fetchMethod(currentUrl + `/api/shops/attack/${item_id}`, callback, "DELETE", null, token);

            window.location.reload(true);
        });
    };

    // fetch methods to get item list and to get task progress info
    fetchMethod(currentUrl + `/api/shops/${user_id}`, callbackForItemList,"GET",null,token);
    
    fetchMethod(currentUrl + `/api/task_progress/user/${user_id}`, callbackForTaskProgressInfo,"GET",null,token);


  });
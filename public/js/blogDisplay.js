// only start running the code below when the DOM is ready
document.addEventListener("DOMContentLoaded", function () {


    // yank the user_id from local storage
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");





    // define the calllback for displaying posts
    const callback = (responseStatus, responseData) => {
        if (responseStatus === 401) {
            alert("You are not authorized to view this page. Please login and try again.");
            window.location.href = "index.html";
            localStorage.removeItem("token");
          }
    //   console.log("responseStatus:", responseStatus);
    //   console.log("responseData:", responseData);

      
        
    // for each post in the response data, create a new <div> element
        responseData.forEach((post) => {
        
        // display username instead of user_id
        var recepient_id=post.recepient_id;
        var recipient_username=post.recipient_usernamee;
        if(recepient_id==0){
            recipient_username="Everyone";
        }
        else if(recepient_id==user_id){
            recipient_username="You";
        }
        else if(recepient_id>0){
            recipient_username=post.recipient_username;
        }

        // logic for deciding which list to append to

        if(post.recepient_id==0){
            var postList = document.getElementById("postList");
        }
        else if(post.recepient_id==user_id){
            var postList = document.getElementById("recievedPostList");
        }
        else if(post.user_id==user_id){
            var postList= document.getElementById("sentPostList");
        }
        else{
            return;
        }
        // displaying the posts
            const displayItem = document.createElement("div");
            displayItem.className =
            "col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 p-3 ";
            displayItem.innerHTML = `
            <div class="card h-100 d-flex flex-column">
                    <div class="card-body">
                        <div class="row">                  
                            <h2 class="pl-2 card-title">${post.sender_username} says:</h2>
                            <a class="btn btn-secondary mt-2 ml-auto" id=editButton${post.post_id} data-toggle="modal" data-target="#editPostModal">edit</a>
                            <a class="btn btn-danger mt-2 " id=deleteButton${post.post_id}>delete</a>
                        </div>
                    </div>
                <div class="mt-auto m-3 ">
                    <p class="card-text" id="Content${post.post_id}"><h3>${post.content}</h3></p>
                    <p class="card-text"><h4>To:${recipient_username}</h4></p>
                    
                    <p class="card-text">Created at: ${post.created_at}</p>
                </div>
                
            </div>
            `;

          postList.appendChild(displayItem);

        // creating edit and delete buttons for each post
          const editButton = document.getElementById(`editButton${post.post_id}`);
          const deleteButton = document.getElementById(`deleteButton${post.post_id}`);
          if(post.user_id==user_id){

            editButton.classList.remove("d-none");

            deleteButton.classList.remove("d-none");
            }
            else{
                editButton.classList.add("d-none");
                deleteButton.classList.add("d-none");
            }
            editButton.addEventListener("click", function (event) {

                const callback4 = (responseStatus, responseData) => {

                    // console.log("responseStatus:", responseStatus);
                    // console.log("responseData:", responseData);

                }
                const editContentfield = document.getElementById("editContent");
                editContentfield.value=post.content;

                const content= document.getElementById(`Content${post.post_id}`).value;
                const post_id=post.post_id;
                const editPostForm = document.getElementById("editPostForm");
                event.preventDefault();

                // event listener to send put request when edit post form is submitted
                editPostForm.addEventListener("submit", function (event) {
                const data = {
                    content : editContentfield.value
                };
                event.preventDefault();
                fetchMethod(currentUrl + `/api/posts/${post_id}`, callback4, "PUT", data,token);
                window.location.reload(true);
                });
            
            });
            // event listener to send delete request when delete button is clicked
            deleteButton.addEventListener("click", function (event) {
                event.preventDefault();
                const callback5 = (responseStatus, responseData) => {

                    // console.log("responseStatus:", responseStatus);
                    // console.log("responseData:", responseData);

                }
                const post_id=post.post_id;
                
                event.preventDefault();
                fetchMethod(currentUrl + `/api/posts/${post_id}`, callback5, "DELETE",null,token);
                window.location.reload(true);
            });

        });

            

    };

    // define the callback for displaying users in the dropdown list
    const callback2 = (responseStatus, responseData) => {
        responseData.forEach((user) => {
            // console.log("responseStatus:", responseStatus);
            // console.log("responseData:", responseData);
            const dropdownList= document.getElementById("UserSelect");
                
            // Create a new <a> element
            const dropdownItem = document.createElement("option");

            dropdownItem.setAttribute("class", "dropdown-item");
            dropdownItem.setAttribute("id", user.user_id);
        
            // Set the text content of the <a> element
            dropdownItem.textContent = user.username;
        
            // Append the <a> element to the dropdownList
            dropdownList.appendChild(dropdownItem);
        });
    }
    
    

    fetchMethod(currentUrl + "/api/users", callback2,"GET",null,token);



    const postButton= document.getElementById("postButton");

// generic callback for post requests
    const callback3= (responseStatus, responseData) => {
        // console.log("responseStatus:", responseStatus);
        // console.log("responseData:", responseData);
    }
   
    // event listener to send post request when post button is clicked
    postButton.addEventListener("click", function (event) {
        const userSelect= document.getElementById("UserSelect");
        const selectedOption = userSelect.selectedOptions[0];
        // Get the id of the currently selected option
        const selectedOptionId = selectedOption.id;
        const data = {
            recepient_id : selectedOptionId,
            content : document.getElementById("postField").value

        };
        event.preventDefault();
        fetchMethod(currentUrl + `/api/posts/${user_id}`, callback3, "POST", data,token);
        window.location.reload(true);

    });



  
    fetchMethod(currentUrl + "/api/posts", callback,"GET",null,token);
  });
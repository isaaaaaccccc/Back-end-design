
document.addEventListener("DOMContentLoaded", function () {

  const token=localStorage.getItem("token");
  
  const callback = (responseStatus, responseData) => {
    if (responseStatus === 401) {
      alert("You are not authorized to view this page. Please login and try again.");
      window.location.href = "index.html";
      localStorage.removeItem("token");
    }

    // console.log("responseStatus:", responseStatus);
    // console.log("responseData:", responseData);

    const questList = document.getElementById("questList");

    responseData.slice().reverse().forEach((task) => {
      const displayItem = document.createElement("div");

      const task_id = task.task_id;

      displayItem.className =
        "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 p-3 ";
      displayItem.innerHTML = `
        <div class="card h-100 d-flex flex-column">
            <div class="card-body">
                <h2 class="card-title">${task.title}</h2>
                
            </div>

            <div style="display: flex; justify-content: center;" >
              <img src="${task.image}" alt="task image" style="width: 300px; height: 200px;"></img>
            </div>
            <div class="mt-auto m-3 ">
              <p class="card-text"><h5>Points for completing:</h5>${task.points}</p>
              <p class="card-text"><h5>Description:</h5>${task.description}</p>
              
            </div>
            <div class="form-group mt-auto m-3 ">    
              <form id='taskprogressForm${task_id}'>
              <label for="Note${task_id}">Notes:</label>
                <textarea class="form-control " id="Note${task_id}" rows="3" required></textarea>
                <button type="submit" class="btn btn-primary w-100 mt-2" id=button${task_id}>Do quest</button>
              </form>
              <div class="btn-group mt-1" style="width: 100%;" role="group">
                <button type="button" class="btn btn-secondary" style="width: 50%;" id="questEditButton${task_id}" data-toggle="modal" data-target="#questEditModal">Edit</button>
                <button type="button" class="btn btn-danger" style="width: 50%;" id="questDeleteButton${task_id}" data-toggle="modal" data-target="#questDeleteModal">Delete</button>
              </div>
            </div>
        </div>
        `;

      const user_id = localStorage.getItem("user_id");

      questList.prepend(displayItem);
      const form = document.getElementById(`taskprogressForm${task_id}`);

      form.addEventListener("submit", function (event) {
        const notes = document.getElementById(`Note${task_id}`).value;
        event.preventDefault();
        const questCompletedModal = document.getElementById("questCompletedModal");
        const modal = new bootstrap.Modal(questCompletedModal);
        modal.show();
        const data = {
          token: token,
          user_id: user_id,
          task_id: task_id,
          notes: notes
        };

        fetchMethod(currentUrl + "/api/task_progress", callback, "POST", data,token);
        window.location.reload(true);
      });

        questEditButton = document.getElementById(`questEditButton${task_id}`);
        questDeleteButton = document.getElementById(`questDeleteButton${task_id}`);
        
        questEditButton.addEventListener("click", function (event) {
          const callback2 = (responseStatus, responseData) => {
            // console.log("responseStatus:", responseStatus);
            // console.log("responseData:", responseData);
          }
          questEditSubmitbutton=document.getElementById("questEditSubmitbutton");
          questEditPoints=document.getElementById("questEditPoints");
          questEditDescription=document.getElementById("questEditDescription");
          questEditTitle=document.getElementById("questEditTitle");
          questEditImage=document.getElementById("questEditImage");

          questEditTitle.value=task.title;
          questEditDescription.value=task.description;  
          questEditPoints.value=task.points;
          questEditImage.value=task.image;

  
      
          questEditSubmitbutton.addEventListener("click", function (event) {
            const data = {
              title: questEditTitle.value,
              description: questEditDescription.value,
              points: questEditPoints.value,
              image: questEditImage.value

            };
            event.preventDefault();
            fetchMethod(currentUrl + `/api/tasks/${task_id}`, callback2, "PUT", data,token) 
            window.location.reload(true);
          });
        });
    questDeleteButton.addEventListener("click", function (event) {
      
      const callback3 = (responseStatus, responseData) => {
        // console.log("responseStatus:", responseStatus);
        // console.log("responseData:", responseData);
      }
      event.preventDefault();
      const questDeleteSubmitButton = document.getElementById("questDeleteSubmitButton");
      
      questDeleteSubmitButton.addEventListener("click", function (event) {
        event.preventDefault();
        fetchMethod(currentUrl + `/api/tasks/${task_id}`, callback3, "DELETE",null,token) 
        window.location.reload(true);
      });



    });

    });




    const newQuestForm = document.getElementById("newQuestForm");
    newQuestForm.addEventListener("submit", function (event) {

      event.preventDefault();

      const newTaskImage = document.getElementById("newTaskImage").value;
      const newTaskTitle = document.getElementById("newTaskTitle").value;
      const newTaskDescription = document.getElementById("newTaskDescription").value;
      const newTaskPoints = document.getElementById("newTaskPoints").value;
      
      // console.log("newTaskImage:", newTaskImage);
      // console.log("newTaskTitle:", newTaskTitle); 
      // console.log("newTaskDescription:", newTaskDescription);
      // console.log("newTaskPoints:", newTaskPoints);
      
      data2 = {
        title: newTaskTitle,
        image: newTaskImage,
        description: newTaskDescription,
        points: newTaskPoints
      };
      // console.log(data2)


      const addTaskCallback = (responseStatus, responseData) => {
        // console.log("responseStatus:", responseStatus);
        // console.log("responseData:", responseData);
      }

      fetchMethod(currentUrl + "/api/tasks", addTaskCallback, "POST", data2, token);
      // Refresh the page to display the new task
      window.location.reload();
    });
  };

  fetchMethod(currentUrl + "/api/tasks", callback,"GET",null,token);
});




    
  

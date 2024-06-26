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
  
      const userList = document.getElementById("userList");
      const sortedUsers = responseData.sort((a, b) => b.spendable_points - a.spendable_points);

      // Select the top 3 users
      const topUsers = sortedUsers.slice(0, 3);
      topUsers.forEach((user) => {
        const displayItem = document.createElement("div");
        displayItem.className =
          "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 p-3";
        displayItem.innerHTML = `
        <div class="card">
        <div class="card-body d-flex flex-column justify-content-center align-items-center">
            <img src="${user.profile_picture}" alt="User Profile Picture" style="width: 200px; height: 200px; border-radius: 50%;"></img>
            <h5 class="card-title">${user.username}</h5>
            <p class="card-text">
                rank: ${user.user_rank}
            </p>
            <p class="card-text">
                Points: ${user.spendable_points}

            </p>
        </div>
        </div>
          `;
          userLeaderboard.appendChild(displayItem);
      });

      responseData.forEach((user) => {
        

        if(user.followed_count==null||user.followed_count==undefined){
          user.followed_count=0
        }
        if(user.follower_count==null||user.follower_count==undefined){
          user.follower_count=0
        }
        

        const displayItem = document.createElement("div");
        displayItem.className =
          "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 p-3";
        displayItem.innerHTML = `
        <div class="card h-100">
        <div class="card-body d-flex flex-column justify-content-center align-items-center">
            <img src="${user.profile_picture}" alt="User Profile Picture" style="width: 200px; height: 200px; border-radius: 50%;"></img>
            <h5 class="card-title">${user.username}</h5>
            <p class="card-text">
                rank: ${user.user_rank}<br>
                points: ${user.spendable_points}<br>
                lifetime points: ${user.total_points}<br>
                bio: ${user.bio}<br>
                date joined: ${user.created_on}<br>
                followers: ${user.follower_count}<br>
                following: ${user.followed_count}<br>

            </p>
            <a class="btn btn-primary text-white w-100 mt-2" id=FollowButton${user.user_id} data-toggle="modal" data-target="#followedModal" >Follow </a>
        </div>
        </div>
          `;
          userList.appendChild(displayItem);
      });

      responseData.forEach((user) => {
        const FollowButton = document.getElementById(`FollowButton${user.user_id}`);
        user_id = localStorage.getItem("user_id");
        if(user.followed==null||user.followed==undefined){
          user.followed=0
        }
        if(user.follower==null||user.follower==undefined){
          user.follower=0
        }
        if(user.user_id==user_id){
          FollowButton.classList.add("d-none");
        }
        else{
          FollowButton.classList.remove("d-none");
        }
      
        // Get follow state from local storage
        let followState = localStorage.getItem(`followState${user.user_id}`);
        if (!followState) {
          followState = 'follow';
          localStorage.setItem(`followState${user.user_id}`, followState);
        }
        FollowButton.dataset.followState = followState; // Set the button's state
      
        // Update button text and class based on follow state
        if (followState === 'follow') {
          FollowButton.innerHTML = 'Follow';
          FollowButton.classList.remove('btn-secondary');
          FollowButton.classList.add('btn-primary');
        } else {
          FollowButton.innerHTML = 'Unfollow';
          FollowButton.classList.remove('btn-primary');
          FollowButton.classList.add('btn-secondary');
        }
      
        FollowButton.addEventListener("click", function (event) {
          event.preventDefault();
          const isFollowing = FollowButton.dataset.followState === 'follow';
          const data = {
            followed : user.user_id
          };
          if (isFollowing) {
            FollowButton.innerHTML = 'Unfollow';
            FollowButton.dataset.followState = 'unfollow';
            FollowButton.classList.remove('btn-primary');
            FollowButton.classList.add('btn-secondary');
            fetchMethod(currentUrl + `/api/follows/${user_id}`, callback, "POST", data,token);
            window.location.reload(true);
          } else {
            FollowButton.innerHTML = 'Follow';
            FollowButton.dataset.followState = 'follow';
            FollowButton.classList.remove('btn-secondary');
            FollowButton.classList.add('btn-primary');
            fetchMethod(currentUrl + `/api/follows/${user_id}`, callback, "DELETE", data,token);
            window.location.reload(true);
          }
      
          // Save follow state in local storage
          localStorage.setItem(`followState${user.user_id}`, FollowButton.dataset.followState);
        });
      });
      
    };

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
        </div>
        </div>
          `;
          TaskProgressList.appendChild(displayItem);
        });

    }
    


  
    fetchMethod(currentUrl + "/api/users", callback,"GET",null,token);
    fetchMethod(currentUrl + "/api/task_progress", callbackForTaskProgressInfo,"GET",null,token);
  });
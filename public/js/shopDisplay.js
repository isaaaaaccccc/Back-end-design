document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    const user_id= localStorage.getItem("user_id");


    const callback = (responseStatus, responseData) => {
        if (responseStatus === 401) {
            alert("You are not authorized to view this page. Please login and try again.");
            window.location.href = "index.html";
            localStorage.removeItem("token");
          }
        // console.log("responseStatus:", responseStatus);
        // console.log("responseData:", responseData);
    
        const shopList = document.getElementById("shopList");
        responseData.forEach((shop) => {
          const displayItem = document.createElement("div");
          displayItem.className =
            "col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12 p-3";
          displayItem.innerHTML = `
            <div class="card h-100">
            
                <div class="card-body d-flex flex-column justify-content-center align-items-center text-center">
                <img src="${shop.image}" alt="User Profile Picture" style="width: 200px; height: 200px;"></img>
                    <h5 class="card-title">${shop.item_description}</h5>
                    <div class="mt-auto">
                        <p class="card-text">
                            Cost: ${shop.cost}
                        </p>
                        <a id=purchaseButton${shop.shop_id} class="btn btn-primary text-white">Purchase</a>
                    </div>
                </div>
            </div>
            `;
          shopList.appendChild(displayItem);
          const purchaseButton = document.getElementById(`purchaseButton${shop.shop_id}`);
            purchaseButton.addEventListener("click", function (event) {
                
                event.preventDefault();
                const data = {
                shop_id: shop.shop_id
                };
                if(localStorage.getItem("walletBalance")<shop.cost){
                    alert("Not enough points in wallet")
                    return;
                }else{
                fetchMethod(currentUrl + `/api/shops/purchase/${user_id}`, callback, "POST", data,token);
                alert("Purchase Successful");
                localStorage.setItem("walletBalance", localStorage.getItem("walletBalance")-shop.cost);
                }
                window.location.reload(true);
            });
        });
      };

    fetchMethod(currentUrl + "/api/shops", callback,"GET",null,token);
    


    const callback2 = (responseStatus, responseData) => {
        // console.log("responseStatus:", responseStatus);
        // console.log("responseData:", responseData);
        const walletBalance = document.getElementById("walletBalance");
        walletBalance.placeholder = `Current Wallet Balance: ${responseData[0].spendable_points}`;
        localStorage.setItem("walletBalance", responseData[0].spendable_points);
        
    };
    fetchMethod(currentUrl + `/api/shops/wallet/${user_id}`, callback2,"GET",null,token);


});
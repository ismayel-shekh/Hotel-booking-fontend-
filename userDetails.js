const loadUserDetails = () => {
    const user_id = localStorage.getItem("user_id");
    console.log(user_id);
    fetch(`https://hotel-boking-system.onrender.com/user/list/?user_id=${user_id}`)
      .then((res) => res.json())
      .then((dataex) => {
        console.log("user_id", dataex)
        dataex?.forEach((datax) =>{
          console.log(datax.id)
          fetch(`https://hotel-boking-system.onrender.com/user/Details/${user_id}`)
          .then((res) => res.json())
          .then((dataa) => {
            console.log(dataa);
            const parent = document.getElementById("detailinformation");
            const div = document.createElement("div");
            div.classList.add("wrapper");
            div.innerHTML = `
            <div class="left">
        <img src="images/userimg.png" 
        alt="user" width="100">
        <h4></h4>
         <p></p>
    </div>
    <div class="right">
        <div class="info">
            <h3>Information</h3>
            <div class="info_data">
                 <div class="data">
                    <h4>Balance</h4>
                    <p>${datax.balance} $</p>
                 </div>
                 <div class="data">
                   <h4>Phone</h4>
                    <p>${datax.mobile_no
                    }</p>
              </div>
            </div>
        </div>
      
      <div class="projects">
            <h3></h3>
            <div class="projects_data">
                 <div class="data">
                    <h4>Name</h4>
                    <p>${dataa.first_name} ${dataa.last_name}</p>
                 </div>
                 <div class="data">
                   <h4>Email</h4>
                    <p>${dataa.email}</p>
              </div>
            </div>
        </div>
      
        <div class="social_media">
            <ul>
              <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
              <li><a href="#"><i class="fab fa-twitter"></i></a></li>
              <li><a href="#"><i class="fab fa-instagram"></i></a></li>
          </ul>
      </div>
    </div>
            `;
            parent.appendChild(div);
        })
        


        // const parent = document.getElementById("user-detais-container");
        // const div = document.createElement("user-all");
        // div.classList.add("user-all");
        // div.innerHTML = `
        //     <div class="user-img">
        //     <img src="./Images/man-1.jpg" alt="" />
        //   </div>
        //   <div class="user-info">
        //     <h1>${data.username}</h1>
        //     <h3>${data.first_name + data.last_name}</h3>
        //     <h3>${data.email}</h3>
        //   </div>
        //     `;
        // parent.appendChild(div);
      
    });
});
  };
  loadUserDetails();

  const loadAllAppointment = () => {
    const customer_id = localStorage.getItem("user_id");
    console.log(customer_id);
    fetch(
      `https://hotel-boking-system.onrender.com/booking/?user_id=${customer_id}`
    )
    .then((res) => res.json())
    .then((data) => {
      const promises = data.map((item) => {
        console.log("user id by search ",item);
        const fetchHotelPromise = fetch(`https://hotel-boking-system.onrender.com/hotel/list/${item.hotel}`)
          .then((res) => res.json());
  
        const fetchUserPromise = fetch(`https://hotel-boking-system.onrender.com/user/list/${item.customer}`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            return fetch(`https://hotel-boking-system.onrender.com/user/Details/${data.user}`)
              .then((res) => res.json());
          });
  
        return Promise.all([fetchHotelPromise, fetchUserPromise])
          .then(([hotel_data, user_data]) => {
            const parent = document.getElementById("table-body");
            const tr = document.createElement("tr");
            tr.innerHTML = `
              <td>${item.id}</td>
              <td>${hotel_data.hotel_name}</td>
              <td>${item.rooms}</td>
              <td>${item.rooms*hotel_data.room_price} tk</td>
            `;
            parent.appendChild(tr);
          });
      });
  
      return Promise.all(promises);
    });
  };
  
  loadAllAppointment();
  
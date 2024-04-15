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
            <td>${user_data.first_name + " " + user_data.last_name}</td>
            <td>${item.rooms}</td>
            <td>${item.rooms*hotel_data.room_price}</td>
            <td>1200</td>
          `;
          parent.appendChild(tr);
        });
    });

    return Promise.all(promises);
  });
};

loadAllAppointment();

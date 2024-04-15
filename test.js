const loadAllAppointment = () => {
    const customer_id = localStorage.getItem("user_id");
    console.log(customer_id);
    fetch(
      `https://hotel-boking-system.onrender.com/booking/?customer_id=${customer_id}`
    )
    .then((res) => res.json())
    .then((data) => {
        console.log(data6)
    });
}
  
  loadAllAppointment();
  
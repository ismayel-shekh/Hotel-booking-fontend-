const getparmas = () => {
    const param = new URLSearchParams(window.location.search).get("hotelId");
    fetch(`https://hotel-boking-system.onrender.com/hotel/list/${param}`)
    .then(res => res.json())
    .then((data) => displayDetails(data))

    fetch(`https://hotel-boking-system.onrender.com/hotel/review/?hotel_id=${param}`)
    .then(res => res.json())
    .then(data =>{ 
      const lasttenReviews = data.slice(-6)
      hotelReview(lasttenReviews)
    })
}
const hotelReview = (reviews) =>{
    reviews?.forEach((review) => {
        const parent = document.getElementById("review-sl");
        const div = document.createElement("div");
        div.classList.add("ag-courses_item");
        div.innerHTML = `
        <a href="#" class="ag-courses-item_link">
        <div class="ag-courses-item_bg"></div>

        <div class="ag-courses-item_title">
        ${review.name}
        <p >${review.rating}</p>
        <p>${review.body}</p>
        </div>
        <div class="ag-courses-item_date-box">
          
          <span class="ag-courses-item_date">
          ${review.created.slice(0, 10)}
          </span>
        </div>
      </a>

        `;
        parent.appendChild(div);
    })
}

const userreview = (event) =>{
    event.preventDefault();
    const param = new URLSearchParams(window.location.search).get("hotelId");
    const name = getValue("Name");
    const body = getValue("review");
    const rating = document.getElementById('ratings').value;

    const info = {
        "name": name,
        "body": body,
        "rating": rating,
        "hotel": param
    }
    console.log(info);
    fetch("https://hotel-boking-system.onrender.com/hotel/review/",{
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(info),        
    })
    .then(res => res.json())
    .then(data => {
        
        console.log(data)
        location.reload()
    })
}

const displayDetails = (hotel) =>{
    console.log(hotel)
    const parent = document.getElementById("hot-details");
    const div = document.createElement("div");
    // div.classList.add("hot-details-container");
    div.classList.add("container");
    div.innerHTML=`

      <div class="row mb-5">
        <div class="col-md-12 heading-wrap text-center">
          <h2 class="sub-heading title">Our Luxury Rooms</h2>

        </div>
      </div>
      <div class="row ">
        <div class="col-md-7">
          <div class="media room mb-0">
            <figure>
              <img src="${hotel.card_image}" alt="Generic placeholder image" class="img-fluid">
              <div class="overlap-text">
                <span>
                  Featured Room 
                  <span class="ion-ios-star"></span>
                  <span class="ion-ios-star"></span>
                  <span class="ion-ios-star"></span>
                </span>
              </div>
            </figure>
            <div class="media-body">
              <h3 class="mt-0"><a > ${hotel.hotel_name}</a></h3>
              <ul class="room-specs">
                <li><span class="ion-ios-people-outline"></span>Avilable Room : ${hotel.avilable_room}</li>
                <li><span class="ion-ios-people-outline"></span> Room Price: ${hotel.room_price} Taka</li>
                <li><span class="ion-ios-crop"></span>Address : ${hotel.location} <sup></sup></li>
              </ul>
              <p>${hotel.details} </p>
              ${localStorage.user_id ? `<p><button class="btn btn-primary btn-sm" onclick="openBookingModal()">Book Now</button></p>` : '<p><a href="login.html" class="btn btn-primary btn-sm">Book Now</a></p>'}
            </div>
          </div>
        </div>
        <div class="col-md-5 room-thumbnail-absolute">
          <a href="#" class="media d-block room bg first-room" style="background-image: url(${hotel.image_1}); ">
            <!-- <figure> -->
              <div class="overlap-text">
                <span>
                  Hotel Room 
                  <span class="ion-ios-star"></span>
                  <span class="ion-ios-star"></span>
                  <span class="ion-ios-star"></span>
                </span>
                <span class="pricing-from">
                  
                </span>
              </div>
            <!-- </figure> -->
          </a>

          <a href="#" class="media d-block room bg second-room" style="background-image: url(${hotel.image_2}); ">
            <!-- <figure> -->
              <div class="overlap-text">
                <span>
                  Hotel Room 
                  <span class="ion-ios-star"></span>
                  <span class="ion-ios-star"></span>
                  <span class="ion-ios-star"></span>
                </span>
                <span class="pricing-from">
                  
                </span>
              </div>
            <!-- </figure> -->
          </a>
          
        </div>
      </div>

    `
    parent.appendChild(div);
}

const openBookingModal = () => {
  // event.preventDefault();
  const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
  modal.show();

}
// const showBookingInput = () => {
//   const bookingInputDiv = document.getElementById("booking-input");
//   bookingInputDiv.innerHTML = `
//     <div class="form-group">
//       <label for="booking-rooms">Number of Rooms:</label>
//       <input type="number" class="form-control" id="booking-rooms" placeholder="Enter number of rooms">
//     </div>
//     <button class="btn btn-primary" onclick="handleBooking()">Confirm Booking</button>
//   `;
// }

const showBookingInput = () => {
    const numberOfRooms = document.getElementById("booking-rooms").value;
    console.log("Number of rooms booked: " + numberOfRooms);
  };

const handleBooking = () =>{
    const param = new URLSearchParams(window.location.search).get("hotelId");
    const bookingroom = document.getElementById("booking-rooms").value;
    const cust = localStorage.user_id;


    console.log(cust);
    console.log(bookingroom)
    const info = {
        "rooms": bookingroom,
        "hotel": param,
        "customer": cust
    }
    console.log("my user info", info);
    fetch("https://hotel-boking-system.onrender.com/booking/", {
        method: "POST",
        headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(info),
      })
      .then((res) => res.json())
      .then((data) =>{
        console.log(data)
        if (data.error === "Insufficient balance") {
          Swal.fire({
            title: "Insufficient balance",
            text: `Please deposited amount`,
            icon: "error",
          })
          .then((result) => {
            if (result.isConfirmed) {
              window.location.href = "deposit.html";
            }
        });
          
            
        }
        else if (data.error === "Not Available rooms") {
          Swal.fire({
            title: "Sorry!",
            text: `Not Available rooms`,
            icon: "error",
          })
          .then((result) => {
            if (result.isConfirmed) {
              window.location.href = "allhotel.html";
            }
        });
          
            
        }
        else if (data.message === "Booking successful Chack your email") {
          Swal.fire({
            title: " Successful!",
            text: `Booking successful Chack your email`,
            icon: "success",
          })
          .then((result) => {
            if (result.isConfirmed) {
              window.location.href = "allhotel.html";
            }
        });
          
            
        }

        else{
          Swal.fire({
            title: "error",
            text: `something is wrong`,
            icon: "error",
          })
          .then((result) => {
            if (result.isConfirmed) {
              window.location.href = "index.html";
            }
        });
          
            
        }
      })
}

getparmas()



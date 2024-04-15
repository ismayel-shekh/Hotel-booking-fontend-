const loadhotels = (search) => {
    console.log(search)
    document.getElementById("hotels").innerHTML = "";
    const user_id = localStorage.getItem("user_id");
    console.log(user_id)
    // document.getElementById("spinner").style.display = "block";
    
    fetch(`https://hotel-boking-system.onrender.com/hotel/list/?search=${search ? search : ""}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        if(data.length > 0){
            displayHotels(data)
            // document.getElementById("spinner").style.display = "none";
            document.getElementById("nodata").style.display = "none";
        }
        else{
            // document.getElementById("spinner").style.display = "none";
            document.getElementById("hotels").innerHTML = "";
            document.getElementById("nodata").style.display = "block";
        }
    })
}
const displayHotels = (hotels) =>{
    console.log(hotels)
    hotels?.forEach((hotel) => {
        console.log(hotel)
        const parent=document.getElementById("hotels")
        const div = document.createElement("div");
        div.classList.add("hot-card");
        div.innerHTML =`
        <img class="hot-img" src="${hotel?.image_1}" alt=""/>
            <h2>${hotel?.hotel_name}</h2>
            <h4>${hotel?.category}</h4>
            <p>${hotel?.details.slice(0, 135)}</p>
            <button><a  href="hotelDetails.html?hotelId=${hotel.id}">Details</a></button>

        `;
        parent.appendChild(div)
    })
    console.log("Login user_id", localStorage.user_id);
}

loadhotels()

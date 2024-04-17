

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
            const popular = data.slice(-5)
            displayHotels(popular)
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

const loadcatagory = () => {
    fetch("https://hotel-boking-system.onrender.com/hotel/catagory/")
    .then(res => res.json())
    .then(data => {
        data.forEach((item) => {
            console.log(item)
            const parent = document.getElementById("buttons");
            const li = document.createElement("button");
            li.classList.add("button-value");
            li.textContent = item.name;
            li.onclick = () => {
                filterProduct(item.name);
                loadhotels(item.name);
              };
              
            parent.appendChild(li);

        })
    })
}

function filterProduct(value) {
    console.log("hellow bro")
    //Button class code
    let buttons = document.querySelectorAll(".button-value");
    buttons.forEach((button) => {
      //check if value equals innerText
      if (value.toUpperCase() == button.innerText.toUpperCase()) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  
  }

  

const handleSearch = () => {
    const value = document.getElementById("search-input").value;
    loadhotels(value)
}

const loadreview = () =>{
    fetch("https://hotel-boking-system.onrender.com/hotel/review/")
    .then(res => res.json())
    .then(data => {
        
        const lasttenReviews = data.slice(-6)
        displayReview(lasttenReviews)
    })
}
const displayReview = (reviews) =>{
    const parent = document.getElementById("review-sl");
    parent.innerHTML = ``;
    reviews?.forEach((review) => {
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
loadhotels()
loadcatagory()
loadreview()


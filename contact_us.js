

const handleContact = (event) =>{
    event.preventDefault();
    const name = getValue("con-name");
    const phone = getValue("con-phone");
    const message = getValue("con-message");
    const info ={
        "name": name,
        "phone": phone,
        "message": message
    }
    console.log(info)
    fetch("https://hotel-boking-system.onrender.com/contact_us/", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(info),
        })
          .then((res) => res.json())
          .then((data) => {
          console.log(data)
          if (data){
            Swal.fire({
              title: "Thanks!",
              text: "Succesfully Send Your Message!",
              icon: "success",
            })
            .then((result) => {
              if (result.isConfirmed) {
                  window.location.href = "index.html";
              }
          });

          }}
          );
    
}
const getValue = (id) => {
  return document.getElementById(id).value;
};
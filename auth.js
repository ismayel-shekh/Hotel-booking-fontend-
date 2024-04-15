// alert()

const handleRegistration = (event) => {
    event.preventDefault();
    const username = getValue("username");
    const first_name = getValue("first_name");
    const last_name = getValue("last_name");
    const email = getValue("email");
    const mobile_no = getValue("mobile_no");
    const password = getValue("password");
    const confirm_password = getValue("confirm_password");
    const info = {
      username,
      first_name,
      last_name,
      email,
      mobile_no,
      password,
      confirm_password,
    };
    console.log(info)

    if (password === confirm_password) {
      document.getElementById("error").innerText = "";
      if (
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)
      ) {
        console.log(info);
        // https://hotel-boking-system.onrender.com/user/register/
          fetch("https://hotel-boking-system.onrender.com/user/register/", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(info),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log( "line 37", data);
            if (data.success){
              Swal.fire({
                title: "Success!",
                text: `Dear ${info.first_name} ${info.last_name}, please go to your email ${info.email} inbox and click on the received activation link to confirm and complete the registration. Note: Check your spam folder.`,
                icon: "success",
              })
              .then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "login.html";
                }
            });
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Email or username Already exists ! Please try again !',
          });
          }
          });

      } else {
        document.getElementById("error").innerText =
          "pass must contain eight characters, at least one letter, one number and one special character:";
      }
    } else {
      document.getElementById("error").innerText =
        "password and confirm password do not match";
    }
  };
  


  // const getValue = (id) => {
  //   console.log("line 48", id)
  //   const value = document.getElementById(id).value;

  //   console.log(value);
  //   return value;
  // };
  
  const handleLogin = (event) => {
    
    event.preventDefault();
    const username = getValue("login-username");
    const password = getValue("login-password");
    console.log(username, password);
    if ((username, password)) {
      // https://hotel-boking-system.onrender.com/user/login/
      fetch("https://hotel-boking-system.onrender.com/user/login/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
  
          if (data.token && data.user_id) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user_id", data.user_id);
            Swal.fire({
              title: "Login Successful!",
              text: "Walcome to ISBN BD!",
              icon: "success",
            })
            .then((result) => {
              if (result.isConfirmed) {
                  window.location.href = "index.html";
              }
            });
          }
          else{
            Swal.fire({
              title: "error",
              text: `user name or password incorrect please try again`,
              icon: "error",
            })
            .then((result) => {
              if (result.isConfirmed) {
                window.location.href = "login.html";
              }
          });
            
              
          }
        });
    }
  };

//   const handldeposit = (event) => {
//     event.preventDefault();
//     const dep = getValue("deposit-money");
//     const cus = localStorage.user_id;
//     const token = localStorage.token;
//     console.log(localStorage.user_id);
//     console.log(cus);
//     const info ={
//       "deposit": dep,
//       "customer": cus
//   };

//     if (dep > 0) {
//         fetch("https://hotel-boking-system.onrender.com/deposit/", {
//                 method: "POST",
//                 headers: {
//                   "content-type": "application/json",
//                   "Authorization": `Bearer ${token}`
//                 },
//                 body: JSON.stringify(info),
//             })
//             .then((res) => res.json())
//             .then((data) => {
//                 console.log(data);
//                 if (data.message === "Deposit successful. Check email") {
//                     window.location.href = "index.html";
//                 }
//             })
//     }
// }


const handldeposit = (event) => {
    event.preventDefault();
    const dep = parseFloat(getValue("deposit-money")); 
    const cus = localStorage.user_id.toString(); 
    const token = localStorage.token;
    console.log(localStorage.user_id);
    console.log(cus);
    const info ={
        "deposit": dep,
        "customer": cus
    };

    if (dep > 0) {
        fetch("https://hotel-boking-system.onrender.com/deposit/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(info),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);
            if (data.message === "Deposit successful. Check email") {
              Swal.fire({
                title: "Payment Successful!",
                text: `We’ve confirmed your ${dep} taka payment. please Chack your Email`,
                icon: "success",
              })
              .then((result) => {
                if (result.isConfirmed) {
                  window.location.href = "index.html";
                }
            });
              
                
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            
        });
    } else {
        console.error('Deposit amount must be greater than 0');
        
    }
};

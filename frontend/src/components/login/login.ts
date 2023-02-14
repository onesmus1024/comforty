
let loginBtn = document.getElementById("login-btn")! as HTMLButtonElement;


loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    let email = document.getElementById("email")! as HTMLInputElement;
    let password = document.getElementById("password")! as HTMLInputElement;
    
   if (email.value === "" || password.value === "") {
        alert("Please enter a valid email and password");
    }else{
        let authData = await login(email.value, password.value);
        if (authData) {
            let user = authData['user']
            let token = authData['token']
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            if (user.is_admin === true) {
                window.location.href = "../admin/admin.html";
            } else {
            window.location.href = "../../../index.html";
            }
        }
    }

   

});



const login = async (email: string, password: string) => {
    let response = await fetch("http://localhost:3002/api/users/login", {
        method: "POST",
        body: JSON.stringify({
            email,
            password
        }),
        headers: {
            "content-type": "application/json"
        }
    });
    
    if (response.status === 401) {
        alert("Invalid Credentials");
    } else if (response.status === 200) {
        return await response.json();
    } else {
        alert("Something went wrong");
    }
    }




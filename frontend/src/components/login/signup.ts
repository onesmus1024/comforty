
let signupBtn = document.getElementById("signup-btn") as HTMLButtonElement;
let formgroup = document.querySelector(".form-group") as HTMLDivElement; 

signupBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("clicked");
    let email = document.getElementById("email") as HTMLInputElement;
    let password = document.getElementById("password1") as HTMLInputElement;
    let password2 = document.getElementById("password2") as HTMLInputElement;
    let phone = document.getElementById("phone") as HTMLInputElement;

    if (email.value === "" || password.value === "" || password2.value === "" || phone.value === "") {
        let error = document.createElement("p");
        error.innerHTML = "Please fill all fields";
        error.style.color = "red";
        error.style.fontSize = "12px";
        formgroup.insertAdjacentElement("afterbegin", error);
        setTimeout(() => {
            error.remove();
        }, 3000);

    } else if (password.value !== password2.value) {
        let error = document.createElement("p");
        error.innerHTML = "Passwords do not match";
        error.style.color = "red";
        error.style.fontSize = "12px";
        formgroup.insertAdjacentElement("afterbegin", error);
        setTimeout(() => {
            error.remove();
        }, 3000);
    }
    else {
        let authData = await signup(email.value, password.value, phone.value);
        if (authData) {
            let token = authData['token']
            localStorage.setItem("token", token);
            window.location.href = "../../../index.html";
        }
    }
});


const signup = async (email: string, password: string, phone: string) => {
    let response = await fetch("https://ridespark.ml/api/users/register", {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
            phone
        }),
        headers: {
            "content-type": "application/json"
        }
    });

    if (response.status === 401) {
        let error = document.createElement("p");
        error.innerHTML = "Invalid email or password";
        error.style.color = "red";
        error.style.fontSize = "12px";
        formgroup.insertAdjacentElement("afterbegin", error);
        setTimeout(() => {
            error.remove();
        }, 3000);
    } else if (response.status === 400) {
        let error = document.createElement("p");
        error.innerHTML = "User already exists";
        error.style.color = "red";
        error.style.fontSize = "12px";
        formgroup.insertAdjacentElement("afterbegin", error);
        setTimeout(() => {
            error.remove();
        }, 3000);
    } else {
        let data = await response.json();
        return data;
    }
}


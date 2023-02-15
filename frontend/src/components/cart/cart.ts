
import cart from "../../services/cart.js";
let deleteBtn = document.querySelector("#delete-btn")!
let minusBtn = document.querySelector("#minus-btn")! as HTMLButtonElement;
let plusBtn = document.querySelector("#add-btn")! as HTMLButtonElement;
let numberOfItem = document.querySelector("#items-number")! as HTMLSpanElement;
let cartItems = document.querySelector(".cart-items")
let numberOfItems = document.getElementById("number-of-items")! as HTMLDivElement;
let placeOrder =  document.querySelector("#place-order")! as HTMLButtonElement;
console.log(placeOrder);
// plusBtn.addEventListener("click", () => {
//     numberOfItem.innerHTML = (parseInt(numberOfItem.innerHTML) + 1).toString();
//     console.log("hello");
// }
// );

// minusBtn.addEventListener("click", () => {
//     numberOfItem.innerHTML = (parseInt(numberOfItem.innerHTML) - 1).toString();
// }
// );

// deleteBtn.addEventListener("click", () => {
//     numberOfItem.innerHTML = "0";
 


// }
// );

if (cart.getItems().length === 0) {
    numberOfItems.style.display = "none";
}
else {
    numberOfItems.style.display = "block";
}

numberOfItem.innerHTML = cart.getItems().length.toString();

const getProductById = async (product_id:string) => {
    let res = await fetch('https://ridespark.ml/api/products/'+product_id).then(res => res.json()).then
        (data => {
            return data;
        }
        ).catch(err => console.log(err))
    return res;
};



const getCartItem = async () => {
    let res = await fetch('http://localhost:3002/api/cartitems', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + localStorage.getItem("token")
        }

    }).then(res => res.json()).then
        (data => {
            return data;
        }
        ).catch(err => console.log(err))
    return res;
};


getCartItem().then(data=> {
    numberOfItems.style.display = "block";
    numberOfItems.innerHTML = data.length.toString();

    data.forEach((item: { product_id: string,quantity:string })  => {
        getProductById(item.product_id).then(product => {
            let cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
            <div class="item-image">
            <img src="${product[0].product_image_url}" alt="item" style="width: 100px; height: 100px;">
            </div>
            <div class="item-info">
            <div class="wrapper">
            <h3> ${product[0].name} <h3>
            <p> $ ${product[0].price}</p>
            </div>
            <div class="actions">
            <span><ion-icon name="trash-outline" id="delete-btn"></ion-icon></span>
            <span> <ion-icon name="remove-outline" id="minus-btn"></ion-icon></span>
            <p id="items-number">${item.quantity}</p>
            <span>
            <ion-icon name="add-outline" id="add-btn"></ion-icon>
            </span>
            </div>
            </div>
        `

            cartItems?.insertAdjacentElement("afterbegin",cartItem)
        })
    }
    )

})



placeOrder.addEventListener("click", () => {
    window.location.href = "../checkout/checkout.html";

})
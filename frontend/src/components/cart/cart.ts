
import cart from "../../services/cart.js";
let deleteBtn = document.querySelector("#delete-btn")! 
let minusBtn = document.querySelector("#minus-btn")! as HTMLButtonElement;
let plusBtn = document.querySelector("#add-btn")! as HTMLButtonElement;
let numberOfItem = document.querySelector("#items-number")! as HTMLSpanElement;


plusBtn.addEventListener("click", () => {
    numberOfItem.innerHTML = (parseInt(numberOfItem.innerHTML) + 1).toString();
    console.log("hello");
}
);

minusBtn.addEventListener("click", () => {
    numberOfItem.innerHTML = (parseInt(numberOfItem.innerHTML) - 1).toString();
}
);

deleteBtn.addEventListener("click", () => {
    numberOfItem.innerHTML = "0";
    console.log(cart.getItems());
    
}
);

numberOfItem.innerHTML = cart.getItems().length.toString();



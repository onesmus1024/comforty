import cart from "./services/cart.js";

let carouselText = document.getElementById("carousel-text")! as HTMLParagraphElement;
let carouselImage = document.getElementById("carousel-image")! as HTMLImageElement;
let dots = document.querySelectorAll(".dot") as NodeListOf<HTMLDivElement>;
let carouselLeftArrow = document.getElementById("carousel-left-arrow")! as HTMLDivElement;
let carouselRightArrow = document.getElementById("carousel-right-arrow")! as HTMLDivElement;
let cartIcon = document.getElementById("cart-icon")! as HTMLDivElement;
let numberOfItems = document.getElementById("number-of-items")! as HTMLDivElement;
let addToCartBtn = document.getElementById("add-to-cart")! as HTMLButtonElement
let utils = document.querySelector(".utils")! as HTMLDivElement;

let featuredProductsContainer = document.querySelector("#featured-product")! as HTMLDivElement;
let topCategoriesContainer = document.querySelector("#top-categories")! as HTMLDivElement;
let ourProductsContainer = document.querySelector("#our-products")! as HTMLDivElement;
let recentlyAddedContainer = document.querySelector("#recently-added")! as HTMLDivElement;
let logout = document.getElementById("logout")! as HTMLButtonElement;

cart.getItemsFromDB();
interface CarouselItem {
    text: string;
    image: string;
}

// make utils stick to top when scrolling

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 0) {
        utils.style.position = "fixed";
        utils.style.top = "0";
        utils.style.width = "99%";
   
        utils.style.zIndex = "100";
    }
    else {
        utils.style.position = "relative";
        utils.style.top = "0";
        utils.style.width = "100%";
        utils.style.zIndex = "100";

    }
}
);





if (cart.getItems().length === 0) {
    numberOfItems.style.display = "none";
}
else {
    numberOfItems.style.display = "block";
}

let carouselItems: CarouselItem[] = [
    {
        text: "Best furniture <br> collection for <br> your <br> interior",
        image: "./asset/Image-2.png"
    },
    {
        text: "Find your <br> perfect <br> furniture",
        image: "./asset/Image-3.png"
    },
    {
        text: "shop <br> with <br> confidence",
        image: "./asset/Image-4.png"
    }];

setInterval(() => {
    let randomIndex = Math.floor(Math.random() * carouselItems.length);
    carouselText.innerHTML = carouselItems[randomIndex].text;
    carouselImage.src = carouselItems[randomIndex].image;
    dots.forEach(dot => {
        dot.classList.remove("active");
    }
    );
    dots[randomIndex].classList.add("active");

}, 5000);

carouselLeftArrow.addEventListener("click", () => {
    let activeDot = document.querySelector(".dot.active")! as HTMLDivElement;
    let activeDotIndex = Array.from(dots).indexOf(activeDot);
    let nextDotIndex = activeDotIndex === 0 ? dots.length - 1 : activeDotIndex - 1;
    dots.forEach(dot => {
        dot.classList.remove("active");
    }
    );
    dots[nextDotIndex].classList.add("active");
    carouselText.innerHTML = carouselItems[nextDotIndex].text;
    carouselImage.src = carouselItems[nextDotIndex].image;
}
);


carouselRightArrow.addEventListener("click", () => {
    let activeDot = document.querySelector(".dot.active")! as HTMLDivElement;
    let activeDotIndex = Array.from(dots).indexOf(activeDot);
    let nextDotIndex = activeDotIndex === dots.length - 1 ? 0 : activeDotIndex + 1;
    dots.forEach(dot => {
        dot.classList.remove("active");
    }
    );
    dots[nextDotIndex].classList.add("active");
    carouselText.innerHTML = carouselItems[nextDotIndex].text;
    carouselImage.src = carouselItems[nextDotIndex].image;
}
);


// page navigations
cartIcon.addEventListener("click", () => {
    window.location.href = "./src/components/cart/cart.html";
}
);





const updateCartNumber =async () => {
    numberOfItems.style.display = "block";
    
    console.log(cart.getItems());

    if (cart.getItems().length === 0) {
        numberOfItems.style.display = "none";
    }
    else {
        numberOfItems.style.display = "block";
        numberOfItems.innerHTML = await cart.getItems().length.toString();
    }
}


logout.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "./src/components/login/login.html";
}
);



const getProducts = async () => {
    let res = await fetch("https://ridespark.ml/api/products")
        .then(res => res.json()).then
        (data => {
            return data;
        }
        ).catch(err => console.log(err))
    return res;
};


const addToCart = (e: any, product_id:any) => {
    e.stopPropagation();
    // cart.addItem(product);
    // numberOfItems.style.display = "block";
    // numberOfItems.innerHTML = cart.getItems().length.toString();
    console.log("in add to cart", product_id);
}

getProducts().then(data => {
    data.forEach((product: any) => {
       if(product.is_deleted === false) {
        let productCard = document.createElement("div");
        productCard.classList.add("product");
        productCard.innerHTML = `
        <img src="${product.product_image_url}" alt="product">
        <div class="product-text">
        <div class="product-attribute">
        <h3>${product.name}</h3>
        <p>$ ${product.price}</p>
        </div>
        <button class="add-to-cart" id=${product.id}>Add to cart</button>
        </div>

        `;
        featuredProductsContainer.appendChild(productCard);
       }
    }
    );
}
);


getProducts().then(data => {
    data.forEach((product: any) => {
        if(product.is_deleted === false && product.recently_added === true) {
            let productCard = document.createElement("div");
            productCard.classList.add("product");
            productCard.innerHTML = `
            <img src="${product.product_image_url}" alt="product">
                <div class="categories">
                    <h3>${product.name}</h3>
                    <p><span id="number">3000</span> Products</p>
                </div>
    
            `;
            topCategoriesContainer.appendChild(productCard);
           }
    }
    );
}
);




getProducts().then(data => {
    data.forEach((product: any) => {
        if(product.is_deleted === false) {
            let productCard = document.createElement("div");
            productCard.classList.add("product");
            productCard.innerHTML = `
            <img src="${product.product_image_url}" alt="product">
            <div class="product-text">
            <div class="product-attribute">
            <h3>${product.name}</h3>
            <p>$ ${product.price}</p>
            </div>
            <button class="add-to-cart" id=${product.id}>Add to cart</button>
            </div>
    
            `;
            ourProductsContainer.appendChild(productCard);
           }
    }
    );
}
);

getProducts().then(data => {
    data.forEach((product: any) => {
        if(product.is_deleted === false) {
            let productCard = document.createElement("div");
            productCard.classList.add("product");
            productCard.innerHTML = `
            <img src="${product.product_image_url}" alt="product">
            <div class="product-text">
            <div class="product-attribute">
            <h3>${product.name}</h3>
            <p>$ ${product.price}</p>
            </div>
            <button class="add-to-cart" id=${product.id}>Add to cart</button>
            </div>
    
            `;
            recentlyAddedContainer.appendChild(productCard);
           }
    }
    );
}
);








featuredProductsContainer.addEventListener("click", (e) => {
    e.stopPropagation();
    let target = e.target as HTMLButtonElement;
    if (target.className == "add-to-cart") {
        cart.createItem(target.id);
      
        updateCartNumber();
        // cart.removeItem('e5fd457a-5c3a-40c6-8ea0-2ab2ac58e17f');
    }
}
);

topCategoriesContainer.addEventListener("click", (e) => {
    e.stopPropagation();
    let target = e.target as HTMLButtonElement;
    if (target.className == "add-to-cart") {
        cart.createItem(target.id);
        updateCartNumber();
        // cart.removeItem('e5fd457a-5c3a-40c6-8ea0-2ab2ac58e17f');
    }
}
);

ourProductsContainer.addEventListener("click", (e) => {
    e.stopPropagation();
    let target = e.target as HTMLButtonElement;
    if (target.className == "add-to-cart") {
        cart.createItem(target.id);
        updateCartNumber();
        // cart.removeItem('e5fd457a-5c3a-40c6-8ea0-2ab2ac58e17f');
    }
}
);

recentlyAddedContainer.addEventListener("click", (e) => {
    e.stopPropagation();
    let target = e.target as HTMLButtonElement;
    if (target.className == "add-to-cart") {
        cart.createItem(target.id);
        updateCartNumber();
        // cart.removeItem('e5fd457a-5c3a-40c6-8ea0-2ab2ac58e17f');
    }
}
);


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

getCartItem().then(data => {

    numberOfItems.style.display = "block";
    numberOfItems.innerHTML = data.length.toString();

})

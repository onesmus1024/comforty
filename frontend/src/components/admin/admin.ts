let addProductButton = document.getElementById("add-product")!;
let productFormGroup = document.querySelector(".product-form-group")!;
let submitBtn = document.getElementById("submit-btn")!;
let users = document.getElementById("users")!;
let orders = document.getElementById("orders")!;
let products = document.getElementById("products")!;
let delivered = document.getElementById("delivered")!;
let container = document.querySelector(".stats-table-data")!;

addProductButton.addEventListener("click", () => {
    productFormGroup.classList.toggle("hidden");
});


submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    let name = document.getElementById("name")! as HTMLInputElement;
    let description = document.getElementById("description")! as HTMLInputElement;
    let price = document.getElementById("price")! as HTMLInputElement;
    let image = document.getElementById("image")! as HTMLInputElement;
    let category = document.getElementById("category")! as HTMLInputElement;
    let recentlyAdded = document.getElementById("recently-added")! as HTMLInputElement;
    let featured = document.getElementById("featured")! as HTMLInputElement;
    let isDeleted = document.getElementById("is-deleted")! as HTMLInputElement;
    let product = await addProduct(name.value, description.value, price.value, image.value, category.value, recentlyAdded, featured, isDeleted);
    if (product) {
        window.location.href = "admin.html";
    }
});


const addProduct = async (name: string, description: string, price: string, image: string, category: string, recentlyAdded:HTMLInputElement, featured: HTMLInputElement, isDeleted: HTMLInputElement) => {
    console.log(name, description, price, image, category, recentlyAdded, featured, isDeleted);
    let response = await fetch(" http://localhost:3002/api/products", {
        method: "POST",
        body: JSON.stringify({
            name,
            description,
            price,
            product_image_url: image,
            category_id:"3bd5ab2c-e17f-4d35-8f2f-c7d22b4018f3",
            recently_added: recentlyAdded.checked?"1":"0",
            featured: featured.checked?"1":"0",
            is_deleted: isDeleted.checked?"1":"0"
        }),
        headers: {
            "content-type": "application/json"
        }
    });
    if (response.status === 200) {
        let product = await response.json();
        return product;
    } else {
        console.log("error");
    }
}




const getProducts = async () => {
    let response = await fetch("https://ridespark.ml/api/products");
    if (response.status === 200) {
        let products = await response.json();
        return products;
    } else {
        console.log("error");
    }
}

const getOrders = async () => {
    let response = await fetch("https://ridespark.ml/api/orders");
    if (response.status === 200) {
        let orders = await response.json();
        return orders;
    } else {
        console.log("error");
    }
}

const getUsers = async () => {
    let response = await fetch("https://ridespark.ml/api/users");
    if (response.status === 200) {
        let users = await response.json();
        return users;
    } else {
        console.log("error");
    }
}

users.addEventListener("click", async () => {
    let users = await getUsers();
    users.forEach((user: any) => {
        let row = document.createElement("tr");
        let id = document.createElement("td");
        let name = document.createElement("td");
        let email = document.createElement("td");
        let is_admin = document.createElement("td");
        let created_at = document.createElement("td");
        let updated_at = document.createElement("td");
        id.innerHTML = user.id;
        name.innerHTML = user.name;
        email.innerHTML = user.email;
        is_admin.innerHTML = user.is_admin;
        created_at.innerHTML = user.created_at;
        updated_at.innerHTML = user.updated_at;
        row.appendChild(id);
        row.appendChild(name);
        row.appendChild(email);
        row.appendChild(is_admin);
        row.appendChild(created_at);
        row.appendChild(updated_at);
        container.appendChild(row);
    });
}
);


orders.addEventListener("click", async () => {
    let orders = await getOrders();
    container.innerHTML = "";
    orders.forEach((order: any) => {
        let row = document.createElement("tr");
        let id = document.createElement("td");
        let user_id = document.createElement("td");
        let order_status = document.createElement("td");
        let total_price = document.createElement("td");
        let created_at = document.createElement("td");
        let updated_at = document.createElement("td");
        id.innerHTML = order.id;
        user_id.innerHTML = order.user_id;
        order_status.innerHTML = order.order_status;
        total_price.innerHTML = order.total_price;
        created_at.innerHTML = order.created_at;
        updated_at.innerHTML = order.updated_at;
        row.appendChild(id);
        row.appendChild(user_id);
        row.appendChild(order_status);
        row.appendChild(total_price);
        row.appendChild(created_at);
        row.appendChild(updated_at);
        container.insertAdjacentElement
    });
}
);


products.addEventListener("click", async () => {
    let products = await getProducts();
    products.forEach((product: any) => {
        let row = document.createElement("tr");
        let id = document.createElement("td");
        let name = document.createElement("td");
        let description = document.createElement("td");
        let price = document.createElement("td");
        
        let category_id = document.createElement("td");
        let recently_added = document.createElement("td");
        let featured = document.createElement("td");
        let is_deleted = document.createElement("td");
        let created_at = document.createElement("td");
        let updated_at = document.createElement("td");
        id.innerHTML = product.id;
        name.innerHTML = product.name;
        description.innerHTML = product.description;
        price.innerHTML = product.price;
        category_id.innerHTML = product.category_id;
        recently_added.innerHTML = product.recently_added;
        featured.innerHTML = product.featured;
        is_deleted.innerHTML = product.is_deleted;
        created_at.innerHTML = product.created_at;
        updated_at.innerHTML = product.updated_at;
        row.appendChild(id);
        row.appendChild(name);
        row.appendChild(description);
        row.appendChild(price);
        row.appendChild(category_id);
        row.appendChild(recently_added);
        row.appendChild(featured);
        row.appendChild(is_deleted);
        row.appendChild(created_at);
        row.appendChild(updated_at);
        container.insertAdjacentElement("beforeend", row);
    });
}
);


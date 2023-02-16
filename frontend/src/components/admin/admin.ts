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
    container.innerHTML = "";
    users.forEach((user: any) => {
        // create table header
        let table = document.createElement("table");
        let thead = document.createElement("thead");
        let tr = document.createElement("tr");
        let th1 = document.createElement("th");
        let th2 = document.createElement("th");
        th1.innerHTML = "Email";
        th2.innerHTML = "Is Admin";
        tr.appendChild(th1);
        tr.appendChild(th2);
        thead.appendChild(tr);
        table.appendChild(thead);

        // create table body
        let tbody = document.createElement("tbody");
        let tr1 = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        td1.innerHTML = user.email;
        td2.innerHTML = user.is_admin;
        tr1.appendChild(td1);
        tr1.appendChild(td2);
        tbody.appendChild(tr1);
        table.appendChild(tbody);
        container.appendChild(table);

    });
}
);


orders.addEventListener("click", async () => {
    let orders = await getOrders();
    container.innerHTML = "";
    orders.forEach((order: any) => {
 
        // create table header
        let table = document.createElement("table");
        let thead = document.createElement("thead");
        let tr = document.createElement("tr");
        let th1 = document.createElement("th");
        let th2 = document.createElement("th");
        let th3 = document.createElement("th");
        th1.innerHTML = "IS Paid";
        th2.innerHTML = "Amount";
        th3.innerHTML = "IS Delivered"
        tr.appendChild(th1);
        tr.appendChild(th2);
        thead.appendChild(tr);
        table.appendChild(thead);

        // create table body
        let tbody = document.createElement("tbody");
        let tr1 = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        td1.innerHTML = order.is_paid;
        td2.innerHTML = order.amount;
        tr1.appendChild(td1);
        tr1.appendChild(td2);
        tbody.appendChild(tr1);
        table.appendChild(tbody);
        container.appendChild(table);

        
    });
}
);


products.addEventListener("click", async () => {
    let products = await getProducts();
    products.forEach((product: any) => {
        // create table header
        let table = document.createElement("table");
        let thead = document.createElement("thead");
        let tr = document.createElement("tr");
        let th1 = document.createElement("th");

        let th2 = document.createElement("th");
        let th3 = document.createElement("th");
        let th4 = document.createElement("th");
        let th5 = document.createElement("th");
        let th6 = document.createElement("th");
        let th7 = document.createElement("th");
        th1.innerHTML = "Name";
        th2.innerHTML = "Description";
        th3.innerHTML = "Price";
        th4.innerHTML = "Recently Added";
        th5.innerHTML = "Featured";
        th6.innerHTML = "Is Deleted";
        th7.innerHTML = "edit";
        th7.id = product.id;
        th7.className = "edit";
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        tr.appendChild(th4);
        tr.appendChild(th5);
        tr.appendChild(th6);
        tr.appendChild(th7);
        thead.appendChild(tr);
        table.appendChild(thead);
        
        // create table body
        let tbody = document.createElement("tbody");
        let tr1 = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");
        let td6 = document.createElement("td");
        let td7 = document.createElement("td");
        td1.innerHTML = product.name;
        td2.innerHTML = product.description;
        td3.innerHTML = product.price;
        td4.innerHTML = product.recently_added;
        td5.innerHTML = product.featured;
        td6.innerHTML = product.is_deleted;
        td7.innerHTML = '<ion-icon name="create-outline"></ion-icon>';
        tr1.appendChild(td1);
        tr1.appendChild(td2);
        tr1.appendChild(td3);
        tr1.appendChild(td4);
        tr1.appendChild(td5);
        tr1.appendChild(td6);
        tr1.appendChild(td7);
        tbody.appendChild(tr1);
        table.appendChild(tbody);
        container.appendChild(table);

        
    });
}
);


delivered.addEventListener("click", async () => {
    // display orders that is_delivered is true
    console.log("delivered");
    let orders = await getOrders();
    container.innerHTML = "";
    orders.forEach((order: any) => {
        if (!order.is_delivered) {
            // create table header
            let table = document.createElement("table");
            let thead = document.createElement("thead");
            let tr = document.createElement("tr");
            let th1 = document.createElement("th");
            let th2 = document.createElement("th");
            th1.innerHTML = "IS Paid";
            th2.innerHTML = "Amount";
            tr.appendChild(th1);
            tr.appendChild(th2);
            thead.appendChild(tr);
            table.appendChild(thead);

            // create table body
            let tbody = document.createElement("tbody");
            let tr1 = document.createElement("tr");
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            td1.innerHTML = order.is_paid;
            td2.innerHTML = order.amount;
            tr1.appendChild(td1);
            tr1.appendChild(td2);
            tbody.appendChild(tr1);
            table.appendChild(tbody);
            container.appendChild(table);
        }
    }
    );
}
);



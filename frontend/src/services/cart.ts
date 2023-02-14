
// create a new cart class add method to add item to cart
// add method to remove item from cart
// add method to update item in cart
// add method to get all items in cart
// add method to get total price of cart
// consider id of item, quantity, price, name, image

interface CartItem {
    id: string;
    quantity: number;
    price: number;
    name: string;
    image: string;
}

class Cart {
    private items: CartItem[] = [];
    constructor() {
        fetch('http://localhost:3002/api/cartitems ',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem("token")
            }

        }).then(res => res.json())
        .then(data => {
            this.items = data;

        })

        
    }

    async getItemsFromDB() {

       await  fetch('http://localhost:3002/api/cartitems',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem("token")
            }

        }).then(res => res.json())
        .then(data => {

            this.items = data;

        })


    }
    async createItem(product_id: string) {
        await fetch('http://localhost:3002/api/cartitems',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify({
                "product_id": product_id,
                "quantity": 1
                }
            )

        }).then(res => res.json())
        .then(async data => {
            await this.getItemsFromDB();
          

        }
        )

    }


    async addItem(product_id: string) {
    await fetch('http://localhost:3002/api/cartitems',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify({
                "id": "ba11b26b-a535-42ac-b610-827b5529bbf4",
                "user_id": "3711d8fc-0fed-49c4-a019-f03c862ecf92",
                "product_id": product_id,
                "quantity": 1
              }
            )

        }).then(res => res.json())
        .then(data => {
            this.getItemsFromDB();
            this.items = this.items.map(item => item.id == data.id ? data : item);
            if (!this.items.find(item => item.id === data.id)) {
                this.items.push(data);
            }

            console.log(this.items)

        }
        )

    }
    async removeItem(cartItem_id: string) {
        await fetch('http://localhost:3002/api/cartitems/' + cartItem_id,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify({
                "quantity": "1"
            }
            )}
        ).then(res => res.json())
        .then(data => {
            this.getItemsFromDB();
            // replace the cart item with the updated one if it already exists in the cart or add it to the cart
            this.items = this.items.map(item => item.id === data.id ? data : item);
            if (this.items.find(item => item.id === data.id)?.quantity === 0) {
                this.items = this.items.filter(item => item.id !== data.id);
            }
        })


    }
    getItems() {
        return this.items;
    }
    getTotalPrice() {
        this.getItemsFromDB();
        return this.items.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    }
}

let cart = new Cart();


export default cart;

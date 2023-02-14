
// create a new cart class add method to add item to cart
// add method to remove item from cart
// add method to update item in cart
// add method to get all items in cart
// add method to get total price of cart
// consider id of item, quantity, price, name, image
const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM3MTFkOGZjLTBmZWQtNDljNC1hMDE5LWYwM2M4NjJlY2Y5MiIsImVtYWlsIjoidGVzdDFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkYnpRUkdpMy91cXouWVpzM0dsaDJZdU52SVM1MnRQOEw1VGVHL0ppS211eC5UOG0yRkgzVVciLCJjcmVhdGVkX2F0IjoiMjAyMy0wMi0xMlQwMDowMDowMC4wMDBaIiwiaXNfYWRtaW4iOmZhbHNlLCJpc19kZWxldGVkIjp0cnVlLCJwaG9uZSI6IjA3MTAzODM1NTEiLCJpc19zZW50IjpmYWxzZSwiaWF0IjoxNjc2MzA3NzEyLCJleHAiOjE2NzYzOTQxMTJ9.SHcDmT0Gesz6-N0T8mZhwqoomQrDb86Yg_A_mtnpkdA'
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
        fetch('https://ridespark.ml/api/cartitems/3711d8fc-0fed-49c4-a019-f03c862ecf92',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }

        }).then(res => res.json())
        .then(data => {
            this.items = data;

        })

        
    }

    getItemsFromDB() {

        fetch('https://ridespark.ml/api/cartitems/3711d8fc-0fed-49c4-a019-f03c862ecf92',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }

        }).then(res => res.json())
        .then(data => {

            this.items = data;

        })


    }
    createItem(product_id: string) {
        fetch('https://ridespark.ml/api/cartitems',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                "product_id": product_id,
                "quantity": 1
                }
            )

        }).then(res => res.json())
        .then(data => {
            this.getItemsFromDB();
            this.items =this.items.map(item => item.id == data.id ? data : item);
            if (!this.items.find(item => item.id === data.id)) {
                this.items.push(data);
            }
        
            console.log(this.items)

        }
        )

    }


    addItem(product_id: string) {
        fetch(' https://ridespark.ml/api/cartitems',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
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
    removeItem(cartItem_id: string) {
        fetch('https://ridespark.ml/api/cartitems/' + cartItem_id,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
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

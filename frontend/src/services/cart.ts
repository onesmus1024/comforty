
// create a new cart class add method to add item to cart
// add method to remove item from cart
// add method to update item in cart
// add method to get all items in cart
// add method to get total price of cart
// consider id of item, quantity, price, name, image
const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM3MTFkOGZjLTBmZWQtNDljNC1hMDE5LWYwM2M4NjJlY2Y5MiIsImVtYWlsIjoidGVzdDFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkYnpRUkdpMy91cXouWVpzM0dsaDJZdU52SVM1MnRQOEw1VGVHL0ppS211eC5UOG0yRkgzVVciLCJjcmVhdGVkX2F0IjoiMjAyMy0wMi0xMlQwMDowMDowMC4wMDBaIiwiaXNfYWRtaW4iOmZhbHNlLCJpc19kZWxldGVkIjp0cnVlLCJwaG9uZSI6IjA3MTAzODM1NTEiLCJpc19zZW50IjpmYWxzZSwiaWF0IjoxNjc2MjM3NDM4LCJleHAiOjE2NzYzMjM4Mzh9.mcuZyckd-8Sz-Fw206kHx_9k_ahEGoKrFsz0JQiilrI'
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
        fetch('http://localhost:3002/api/cartitems/8fe3f01c-5d55-41ca-93ef-a84dcf27c2f8',{
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

        fetch('http://localhost:3002/api/cartitems/8fe3f01c-5d55-41ca-93ef-a84dcf27c2f8',{
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

    addItem(product_id: string) {



        fetch(' http://localhost:3002/api/cartitems',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                "product_id": product_id,
                "quantity": "1"
            }
            )

        }).then(res => res.json())
        .then(data => {
            this.getItemsFromDB();
            this.items = this.items.map(item => item.id == data.id ? data : item);
            if (!this.items.find(item => item.id === data.id)) {
                this.items.push(data);
            }

            // console.log(this.items)

        }
        )

    }
    removeItem(cartItem_id: string) {
        fetch('http://localhost:3002/api/cartitems/' + cartItem_id,{
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

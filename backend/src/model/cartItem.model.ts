// CREATE TABLE Cart_items (
//     id VARCHAR(255) PRIMARY KEY,
//     user_id VARCHAR(255) NOT NULL,
//     product_id VARCHAR(255) NOT NULL,
//     quantity INTEGER NOT NULL,
//     CHECK (quantity > 0),
//     FOREIGN KEY (user_id) REFERENCES Users(id),
//     FOREIGN KEY (product_id) REFERENCES Products(id),
// );

// create a cart item model class to be used as a type for the cart item

class CartItemModel {
  id: string;
  user_id: string;
  product_id: string;
  quantity: string;

  constructor(id: string, user_id: string, product_id: string, quantity: string) {
    this.id = id;
    this.user_id = user_id;
    this.product_id = product_id;
    this.quantity = quantity;
  }
}


export default CartItemModel;
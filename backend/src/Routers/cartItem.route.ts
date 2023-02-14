import { Router } from "express";
import { createCartItem, updateCartItem,deleteCartItem,getCartItemByUserId,removeOrReduceQuantity } from "../controller/cartItem.controller";

const cartItemRouter = Router();

cartItemRouter.post("", createCartItem);
cartItemRouter.put("", updateCartItem);
cartItemRouter.delete("/:id", deleteCartItem);
cartItemRouter.get("/:user_id", getCartItemByUserId);
cartItemRouter.put("/removeOrReduceQuantity/:id", removeOrReduceQuantity);



export default cartItemRouter;
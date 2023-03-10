"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("../controller/order.controller");
const orderRouter = (0, express_1.Router)();
orderRouter.post("", order_controller_1.createOrder);
orderRouter.get("", order_controller_1.getAllOrders);
orderRouter.get("/:id", order_controller_1.getOrderById);
orderRouter.put("/:id", order_controller_1.updateOrder);
orderRouter.delete("/:id", order_controller_1.deleteOrder);
orderRouter.get("/user/:user_id", order_controller_1.getOrdersByUserId);
exports.default = orderRouter;

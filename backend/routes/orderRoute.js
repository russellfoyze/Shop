import express from "express";
import { createOrder, listOrders, updateOrderStatus } from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";

const orderRouter = express.Router();

orderRouter.post("/create", createOrder);
orderRouter.get("/list", adminAuth, listOrders);
orderRouter.post("/update-status", adminAuth, updateOrderStatus);

export default orderRouter;

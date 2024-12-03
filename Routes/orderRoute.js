import express from "express"
import authMiddleware from "../Middleware/auth.js"
import { orderList, placeOrder, updateStatus, userOrders, verifyOrder } from "../Controllers/orderController.js"


const orderRouter = express.Router()

orderRouter.post("/place",authMiddleware,placeOrder)
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userorders",authMiddleware,userOrders)
orderRouter.get("/list",orderList)
orderRouter.post("/status",updateStatus)

export default orderRouter 
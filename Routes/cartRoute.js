import express from 'express'
import { addToCart,removeFromCart,getcart } from '../Controllers/cartController.js'
import authMiddleware from '../Middleware/auth.js'
const cartRouter = express.Router()

cartRouter.post("/add",authMiddleware,addToCart)
cartRouter.post("/remove",authMiddleware,removeFromCart)
cartRouter.post("/get",authMiddleware,getcart)


export default cartRouter
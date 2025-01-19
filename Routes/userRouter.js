import express from 'express'
import { adminLogin, loginUser, resisterUser } from '../Controllers/userControllers.js'

const userRouter = express.Router()

userRouter.post("/register",resisterUser) 
userRouter.post("/login",loginUser)

export default userRouter;  
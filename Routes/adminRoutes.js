import express from 'express'
import { adminLogin } from '../Controllers/userControllers.js'

const adminRouter = express.Router()

adminRouter.post('/login',adminLogin)

export default adminRouter
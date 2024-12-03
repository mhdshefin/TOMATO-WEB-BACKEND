import express from 'express'
import cors from 'cors'
import { DBconnect } from './Config/db.js';
import foodRouter from './Routes/foodRoute.js';
import userRouter from './Routes/userRouter.js';
import dotenv from 'dotenv'
import cartRouter from './Routes/cartRoute.js';
import orderRouter from './Routes/orderRoute.js';


dotenv.config()


// app config

const app = express()
const port = process.env.PORT || 4000;

// middleware

app.use(express.json())
app.use(cors())

// database connection

DBconnect()

// api endpoints

app.use("/api/food",foodRouter)
app.use("/images",express.static('Uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
    
})
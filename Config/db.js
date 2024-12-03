import mongoose from "mongoose";

export const DBconnect = async ()=>{
    await mongoose.connect(process.env.MONGODB_SECRET).then(()=>console.log("db connected"))
    
} 
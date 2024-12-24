import mongoose from "mongoose";

const FoodShcema = new mongoose.Schema({
    name:{type:String,requireed:true},
    description:{type:String,requireed:true},
    price:{type:Number,requireed:true},
    image:{type:String,requireed:true},
    category:{type:String,requireed:true},
})

const foodModel = mongoose.model.food || mongoose.model("food",FoodShcema)

export default foodModel;
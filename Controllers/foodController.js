import foodModel from "../Models/foodModel.js";
import fs from 'fs'

// add food item

const addFood = async (req, res) => {

    let food_Filename = `${req.file.filename}` 

    const food = new foodModel({
        name: req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:food_Filename
    })
try {
    food.save()
    res.json({success:true,message:"Food added"})
} catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
}
}

// list all food items

const Food_list = async (req,res)=>{
    try {
        const foods = await foodModel.find({})
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    } 
}

// remove food 

const Remove_food = async (req,res)=>{
    try {
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`Uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Food Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
 
export { addFood , Food_list ,Remove_food }
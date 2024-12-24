import foodModel from "../Models/foodModel.js";
import { v2 as cloudianry } from 'cloudinary'
import fs from 'fs'

// add food item

const addFood = async (req, res) => {

    try {
        const { name, description, price, category } = req.body;

        if (!req.file) {
            return res.status(400).json({ success: false, message: "No image file provided" });
        }
        const image = req.file.path
        let result = await cloudianry.uploader.upload(image, { resource_type: 'image' });

        fs.unlinkSync(req.file.path);
        const food = new foodModel({
            name,
            description,
            price,
            category,
            image: result.secure_url
        })
        await food.save()
        console.log(food);

        res.json({ success: true, message: "Food added" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

// list all food items

const Food_list = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// remove food 

const Remove_food = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id)
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Food Removed" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { addFood, Food_list, Remove_food }
import express from 'express'
import { addFood, Food_list, Remove_food } from '../Controllers/foodController.js'
import upload from '../Middleware/multer.js';
const foodRouter = express.Router();

foodRouter.post("/add",upload.single('image'),addFood)
foodRouter.get("/list",Food_list)
foodRouter.post("/remove",Remove_food)

export default foodRouter;
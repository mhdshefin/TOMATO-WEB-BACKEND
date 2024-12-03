import express from 'express'
import { addFood, Food_list, Remove_food } from '../Controllers/foodController.js'
import multer from 'multer'

const foodRouter = express.Router();

// Image storage engine

const storage = multer.diskStorage({
    destination:"Uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const Upload = multer({storage:storage})

foodRouter.post("/add",Upload.single("image"),addFood)
foodRouter.get("/list",Food_list)
foodRouter.post("/remove",Remove_food)

export default foodRouter;
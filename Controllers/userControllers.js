import userModel from "../Models/userModels.js"
import jwt from 'jsonwebtoken'
import validator  from 'validator'
import bcrypt from 'bcryptjs'



// login user

const loginUser = async (req,res)=>{

    const {email,password} = req.body;

    try {
        const user = await userModel.findOne({email})

        if (!user) {
            return res.json({success:false,message:"No user found"})
        }
    
        const isMatch = await bcrypt.compare(password,user.password)
    
        if (!isMatch) {
            return res.json({success:false,message:"Wrong password"})
        }
    
        const token = await createToken(user._id)
        res.json({success:true,token})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
    
}

const createToken = async (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
    
}



const resisterUser = async (req,res)=>{

    const {name,password,email} = req.body;

    try {
        const exists = await userModel.findOne({email})
        if (exists) {
            return res.json({success:false,message:"User exist with same email"})
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }

        if (password.length<8) {
            return res.json({success:false,message:"Please enter a strong password"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save()
        const token = await createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {loginUser,resisterUser}

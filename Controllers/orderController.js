import orderModel from "../Models/order-model.js";
import userModel from "../Models/userModels.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET)

const frontend_Url = "http://localhost:5174";
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    console.log("Received order data:", req.body);
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    const session = await stripe.checkout.sessions.create({
      line_items: items.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: { name: item.name },
          unit_amount: item.price * 100 * 80,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${frontend_Url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_Url}/verify?success=false&orderId=${newOrder._id}`,
    });
    return res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error processing order:", error);
    return res.status(500).json({ success: false, message: "Error processing order." });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true" || success === true) {
      await orderModel.findByIdAndUpdate(orderId, { payment: true })
      res.json({ success: true, message: "Paid" })
      
    } else {
      await orderModel.findByIdAndDelete(orderId)
      res.json({ success: false, message: "Not paid" })
      console.log(orderId);
      
    } 
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })

  }
}


const userOrders = async (req, res) => {
  try {
    const deleteOrder = await orderModel.deleteMany({payment:false})
    const orders = await orderModel.find({ userId: req.body.userId })
    res.json({ success: true, data: orders })
  } catch (error) {
    console.log(error);

    res.json({ success: false, message: "Error" })
  }

}

const orderList = async (rerq,res)=>{
try {
  const order = await orderModel.find({})
  res.json({success:true,data:order})
} catch (error) {
  console.log(error);
  res.json({success:false,message:"Error"})
}
}

const updateStatus = async (req,res)=>{
try {
  await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
  res.json({success:true,message:"Status Updated"})
} catch (error) {
  res.json({success:false,message:"Error"})
}
}

export { placeOrder, verifyOrder, userOrders ,orderList,updateStatus};

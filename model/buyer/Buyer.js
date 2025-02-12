const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema({
      buyerid:{
        type:String,
        required:true,
        default:()=>{
            return(
                "buyer"+
                 Math.floor(100 + Math.random () * 999999)
            )
        }
      },
     
      name:{
        type:String,
        required:true
      },
      lname:{
        type:String,
      },
      email:{
        type:String,
      },
      mobile:{
        type:Number,
        required:true
      },
      status:{
        type:String,
        enum:['active','pending','disable'],
        default:"pending"
      },
      user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
      }
},{timestamps:true})

const Buyer = mongoose.model("Buyer",buyerSchema);
module.exports = Buyer;


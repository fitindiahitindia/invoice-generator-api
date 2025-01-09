const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
      sellerid:{
        type:String,
        required:true,
        default:()=>{
            return(
                "sell"+
                 Math.floor(100 + Math.random () * 999999)
            )
        }
      },
      billtype:{
        type:String,
        required:true
      },
      companyname:{
        type:String,
        required:true
      },
      mobile:{
        type:Number,
        required:true
      },
      email:{
        type:String,
        required:true
      },
      address:{
        type:String,
        default:null
      },
      status:{
        type:String,
        enum:['active','pending','disable'],
        default:"pending"
      },
},{timestamps:true})

const Seller = mongoose.model("Seller",sellerSchema);
module.exports = Seller;


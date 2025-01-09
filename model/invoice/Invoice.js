const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
      invoiceid:{
        type:String,
        required:true,
        default:()=>{
            return(
                "inv"+
                 Math.floor(100 + Math.random () * 999999)
            )
        }
      },
      seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Seller",
        required:true
      },
      buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Buyer",
        required:true
      },
      products:{
        type:Array,
        required:true
      },
      download:{
        type:String,
        default:""
      },
      date:{
        type:String,
        required:true
      }
},{timestamps:true})

const Invoice = mongoose.model("Invoice",invoiceSchema);
module.exports = Invoice;


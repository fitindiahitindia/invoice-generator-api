const mongoose = require("mongoose");

// async function fetchDynamicDesignations() {
//   const Designation = mongoose.model('designation', new mongoose.Schema({ name: String,default:"hr" }));
//   const designations = await Designation.find({});
//   return designations.map((designation) => designation.name);
// }

const productSchema = new mongoose.Schema({
      proid:{
        type:String,
        required:true,
        default:()=>{
            return(
                "pro"+
                 Math.floor(100 + Math.random () * 999999)
            )
        }
      },
     
      productname:{
        type:String,
        required:true
      },
      description:{
        type:String,
        required:true
      },
      quantity:{
        type:Number,
        required:true
      },
      saleprice:{
        type:Number,
        required:true
      },
      discount:{
        type:Number,
        default:0
      },
      discounttype:{
        type:String,
        default:null
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

const Product = mongoose.model("Product",productSchema);
module.exports = Product;


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true,
  },
  name:{
    type:String,
    required:true,
  },
  mobile:{
    type:Number,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  status:{
    type:Boolean,
    required:true,
    default:true,
  },
  role:{
    type:String,
    enum:['user','admin'],
    default:'user'
  }
},{timestamps:true})

//user
const User = mongoose.model("User",userSchema)
module.exports = User;
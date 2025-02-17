const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  roleId:{
    type:String,
    required:true
  },
  name:{
    type:String,
    required:true
  }  
},{timestamps:true})

const Role = mongoose.model("Role",roleSchema);
module.exports = Role;
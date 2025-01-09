const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  depId:{
    type:String,
    require:true
  },
  name:{
    type:String,
    required:true
  }  
},{timestamps:true})

const Department = mongoose.model("Department",departmentSchema);
module.exports = Department;
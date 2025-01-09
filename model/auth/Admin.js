const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    mobile:{
        type:Number,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    status:{
        type:Boolean,
        require:true,
        default:true
    },
    role:{
        type:String,
        default:"admin"
    }
},{timestamps:true}
)

//model
const Admin = mongoose.model("Admin",adminSchema);
module.exports = Admin;
const expressAsyncHandler = require("express-async-handler")

exports.userRegister = expressAsyncHandler(async (req,res)=>{
    return res.status(201).json({
        status:"success",
    })
})

exports.userLogin = expressAsyncHandler(async (req,res)=>{
    return res.status(201).json({
        status:"success"
    })
})


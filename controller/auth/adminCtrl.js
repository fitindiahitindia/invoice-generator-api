const expressAsyncHandler = require("express-async-handler");
const Admin = require("../../model/auth/Admin");
const { hashPassword, isPassMatch } = require("../../utility/helper");
const generateToken = require("../../utility/generateToken");

//@desc    register admin
//@route   POST api/v1/adminAuth/adminRegister
//@access  private
exports.adminRegister = expressAsyncHandler(async (req,res)=>{
    const{name,mobile,email,password}=req.body;
    
    //request body empty
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "parameter is empty" });
    }

    // is admin exist
    const isAdminFind = await Admin.findOne({
        email
    }) 
    if (isAdminFind) {
        throw new Error('Admin Already Exist')
    } else if (!name) {
        throw new Error('Name is Required')
    } else if (!email) {
        throw new Error('Email is Required')
    }
      else if (!mobile) {
        throw new Error('Mobile is Required')
    }
     else if (!password) {
        throw new Error('Password is Required')
    }
    
    //register
    try {
    const admin = await Admin.create({
        name,
        email,
        mobile,
        password:await hashPassword(password)
    })  
    } catch (error) {
        return res.status(503).json({message:"interal server error try again"})
    }
    
    //response
    return res.status(201).json({
        status:"success",
        message:"admin register successfully"
    })

})

//@desc    login admin
//@route   POST api/v1/adminAuth/adminLogin
//@access  private
exports.adminLogin = expressAsyncHandler(async (req,res)=>{
    const{email,password}=req.body;

    //find admin
    if(email =="" || email == null){
        return res.status(401).json({
            message:"email is required"
        })
    }
    if(password == "" || password == null){
        return res.status(401).json({
            message:"password is required"
        })
    }
    try{
    const findAdmin = await Admin.findOne({
        email
    });

    if(findAdmin){
        const status = findAdmin.status;
         if(status==false){
          return res.status(401).json({
              status:"failed",
              message:"account is disabled"
          })
         }
      }
      if (!findAdmin) {
          return res.status(401).json({
              message: "Invalid login crendentials",
              status: "failed"
          })
      }
      //find password
      const findPassword  = await isPassMatch(password,findAdmin.password);
      if (!findPassword) {
          return res.status(401).json({
              message: "Invalid login crendentials",
              status: "failed"
          })
      } else {
          return res.status(200).json({
              status: "success",
              token: generateToken(findAdmin._id),
              message: "Admin logged in successfully",
          });
      }
    } catch (error) {
      res.status(503).json({message:"interal server error try again"})
    }

   
})
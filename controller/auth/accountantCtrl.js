const expressAsyncHandler = require("express-async-handler");
const { isPassMatch } = require("../../utility/helper");
const generateToken = require("../../utility/generateToken");
// const Employee = require("../../model/product/Employee);

//@desc    login accountant
//@route   POST api/v1/employee/accountant/login
//@access  private
exports.accountantLogin = expressAsyncHandler(async (req,res)=>{
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
    const findEmployee = await Employee.findOne({
        email
    });

    if(findEmployee){
        const status = findEmployee.status;
         if(status==false){
          return res.status(401).json({
              status:"failed",
              message:"account is disabled"
          })
         }
      }
      if (!findEmployee) {
          return res.status(401).json({
              message: "Invalid login crendentials",
              status: "failed"
          })
      }
      //find password
      const findPassword  = await isPassMatch(password,findEmployee.password);
      if (!findPassword) {
          return res.status(401).json({
              message: "Invalid login crendentials",
              status: "failed"
          })
      } else {
          return res.status(200).json({
              status: "success",
              token: generateToken(findEmployee._id),
              message: "accountant logged in successfully",
          });
      }
    } catch (error) {
        return res.status(503).json({message:"interal server error try again"+error})
    }

   
})
const Employee = require("../model/employee/Employee");

const isAccountant = async(req,res,next)=>{
    //find the accountant
    const accountantId = req?.userAuth?._id;
    if(accountantId==undefined || accountantId == null){
        const err = new Error("Token Missing");
        return res.json({
          status:"failed",
          message:"Token is required"
      })
     }
      const employeeFound = await Employee.findById({_id:accountantId});
      //check if accountant
      if(employeeFound?.role === 'employee' && employeeFound?.department === "finance" && employeeFound?.designation === "accountant" ){
        next();
      }else{
        next(res.status(401).json({message:"Access Denied, Accountant only"}));
      }
    };

    module.exports = isAccountant;

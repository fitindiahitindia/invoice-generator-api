const Employee = require("../model/product/Employee);

const isHr = async(req,res,next)=>{
    //find the hr
    const hrId = req?.userAuth?._id;
    if(hrId==undefined || hrId == null){
        const err = new Error("Token Missing");
        return res.json({
          status:"failed",
          message:"Token is required"
      })
     }
      const employeeFound = await Employee.findById({_id:hrId});
      //check if hr
      if(employeeFound?.role === 'hr' && employeeFound?.department === "operations" ){
        next();
      }else{
        next(new Error("Access Denied, HR only"));
      }
    };

    module.exports = isHr;

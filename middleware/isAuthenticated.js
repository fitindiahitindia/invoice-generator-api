const { verifyToken } = require("../utility/verifyToken");

const isAuthenticated = (model) =>{
    return async (req,res,next)=>{
        //get token from header
        const headerObj = req.headers;
        //if token does not exist
        if(headerObj.authorization==undefined){
            const err = new Error("Token Missing");
            return res.json({
              status:"failed",
              message:"login required"
          })
        }

        const token = headerObj?.authorization?.split(" ")[1];
        //verify token
        const verifiedToken = verifyToken(token);
        if(verifiedToken ==true){
            return res.json({
              status:"failed",
              message:"Token maybe missing or wrong"
          })
       }

       if (verifiedToken) {
        //find the admin 
         const user = await model.findById(verifiedToken.id).select(
          "name role"
          );
          //save the user into req.obj
          req.userAuth = user;
        next();
       
         } else {
        const err = new Error("Token expired/invalid");
        next(err);
      }

    };
}


module.exports = isAuthenticated;
const jwt = require("jsonwebtoken");

exports.verifyToken = token =>{
    return jwt.verify(token,process.env.TOKEN_KEY,(err,decoded)=>{
        if (err) {
            return true
          } else {
            return decoded;
          }
    })
}

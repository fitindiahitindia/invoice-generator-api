const jwt = require("jsonwebtoken");

const generateToken = id =>{
    const jwtGen = jwt.sign({id},process.env.TOKEN_KEY,{expiresIn:"1d"});
    return jwtGen;
}

module.exports = generateToken;
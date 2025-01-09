const Employee = require("../model/product/Employee);
const { verifyToken } = require("../utility/verifyToken");

const isHrLogin = async (req, res, next) => {
  //get token from header
  const headerObj = req.headers;
  const token = headerObj?.authorization?.split(" ")[1];

  //verify token
  const verifiedToken = verifyToken(token);
  if (verifiedToken) {
    //find the hr
    const user = await Employee.findById(verifiedToken.id).select(
      "fullname email role"
    );
    //save the user into req.obj
    req.userAuth = user;
    next();
  } else {
    const err = new Error("Token expired/invalid");
    next(err);
  }
};

module.exports = isHrLogin;

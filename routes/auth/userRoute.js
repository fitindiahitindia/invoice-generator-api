const express = require("express");
const { userRegister, userLogin } = require("../../controller/auth/userCtrl");
const userRoute = express.Router();

userRoute.post("/register",userRegister);
userRoute.post("/login",userLogin);

module.exports = userRoute;
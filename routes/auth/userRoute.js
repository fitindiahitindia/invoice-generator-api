const express = require("express");
const { userRegister, userLogin } = require("../../controller/auth/userCtrl");
const userRoute = express.Router();

userRoute.post("/userRegister",userRegister)
userRoute.get("/userlogin",userLogin)

module.exports = userRoute;
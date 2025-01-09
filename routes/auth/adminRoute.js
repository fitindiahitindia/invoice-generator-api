const express = require("express");
const { adminRegister, adminLogin } = require("../../controller/auth/adminCtrl");
const adminRoute = express.Router();

adminRoute.post("/adminRegister",adminRegister);
adminRoute.post("/adminLogin", adminLogin);

module.exports = adminRoute;
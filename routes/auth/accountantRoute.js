const express = require("express");
const accountantRoute = express.Router();

const { accountantLogin } = require("../../controller/auth/accountantCtrl");

accountantRoute.post("/login", accountantLogin)

module.exports = accountantRoute;
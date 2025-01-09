const express = require("express");
const hrRoute = express.Router();

const { hrLogin } = require("../../controller/auth/hrCtrl");

hrRoute.post("/login", hrLogin)

module.exports = hrRoute;
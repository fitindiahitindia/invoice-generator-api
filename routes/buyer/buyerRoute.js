const express = require("express");
const { 
    addBuyer,
    viewBuyer,
    viewBuyers,
    updateBuyer,
    // deleteBuyer,
 } = require("../../controller/buyer/buyerCtrl");
const isAuthenticated = require("../../middleware/isAuthenticated");
const User = require("../../model/auth/User");

const buyerRoute = express.Router();

//create
buyerRoute.post("/addBuyer",isAuthenticated(User) ,addBuyer)
//view
buyerRoute.get("/viewBuyer/:id",isAuthenticated(User), viewBuyer)
buyerRoute.get("/viewBuyers",isAuthenticated(User),viewBuyers)
//update
buyerRoute.put("/updateBuyer/:id",isAuthenticated(User),updateBuyer)
//delete
// buyerRoute.delete("/deleteBuyer/:id",deleteBuyer)


module.exports = buyerRoute;
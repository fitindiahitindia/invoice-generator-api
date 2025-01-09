const express = require("express");
const { 
    addBuyer,
    viewBuyer,
    viewBuyers,
    updateBuyer,
    // deleteBuyer,
 } = require("../../controller/buyer/buyerCtrl");

const buyerRoute = express.Router();

//create
buyerRoute.post("/addBuyer",addBuyer)
//view
buyerRoute.get("/viewBuyer/:id", viewBuyer)
buyerRoute.get("/viewBuyers",viewBuyers)
//update
buyerRoute.put("/updateBuyer/:id",updateBuyer)
//delete
// buyerRoute.delete("/deleteBuyer/:id",deleteBuyer)


module.exports = buyerRoute;
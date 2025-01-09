const express = require("express");
const { 
    addSeller,
    viewSeller,
    updateSeller,
 } = require("../../controller/seller/sellerCtrl");

const sellerRoute = express.Router();

//create
sellerRoute.post("/addSeller",addSeller)
//view
sellerRoute.get("/viewSeller", viewSeller)
//update
sellerRoute.put("/updateSeller/:id",updateSeller)


module.exports = sellerRoute;
const express = require("express");
const { 
    addProduct,
    viewProduct,
    viewProducts,
    // hrLogin,
    updateProduct,
    deleteProduct,
    // deleteEmployees,
 } = require("../../controller/product/productCtrl");
// const roleRestriction = require("../../middleware/roleRestriction");
// const isHr = require("../../middleware/isHr");
// const isHrLogin = require("../../middleware/isHrLogin");
// const isAdmin = require("../../middleware/isAdmin");
// const isAuthenticated = require("../../middleware/isAuthenticated");
// const Admin = require("../../model/auth/Admin");
const productRoute = express.Router();

//create
productRoute.post("/addProduct",addProduct)
//view
productRoute.get("/viewProduct/:id", viewProduct)
productRoute.get("/viewProducts",viewProducts)
//update
productRoute.put("/updateProduct/:id",updateProduct)
//delete
productRoute.delete("/deleteProduct/:id",deleteProduct)
// productRoute.delete("/deleteEmployee",deleteEmployees)


module.exports = productRoute;
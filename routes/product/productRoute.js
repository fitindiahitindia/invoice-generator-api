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
const isAuthenticated = require("../../middleware/isAuthenticated");
const User = require("../../model/auth/User");
// const roleRestriction = require("../../middleware/roleRestriction");
// const isHr = require("../../middleware/isHr");
// const isHrLogin = require("../../middleware/isHrLogin");
// const isAdmin = require("../../middleware/isAdmin");
// const isAuthenticated = require("../../middleware/isAuthenticated");
// const Admin = require("../../model/auth/Admin");
const productRoute = express.Router();

//create
productRoute.post("/addProduct",isAuthenticated(User),addProduct)
//view
productRoute.get("/viewProduct/:id",isAuthenticated(User), viewProduct)
productRoute.get("/viewProducts",isAuthenticated(User),viewProducts)
//update
productRoute.put("/updateProduct/:id",isAuthenticated(User),updateProduct)
//delete
productRoute.delete("/deleteProduct/:id",isAuthenticated(User),deleteProduct)
// productRoute.delete("/deleteEmployee",deleteEmployees)


module.exports = productRoute;
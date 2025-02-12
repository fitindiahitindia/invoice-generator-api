const express = require("express");
const { 
    downloadInvoice,
    viewInvoice,
    generateInvoice,
    viewInvoices
 } = require("../../controller/invoice/invoiceCtrl");
const isAuthenticated = require("../../middleware/isAuthenticated");
const User = require("../../model/auth/User");

const invoiceRoute = express.Router();

//create
invoiceRoute.get("/downloadInvoice/:id",downloadInvoice)
//view
invoiceRoute.get("/viewInvoice/:id", viewInvoice)
invoiceRoute.get("/viewInvoices",isAuthenticated(User),viewInvoices)

//generate
invoiceRoute.post("/generateInvoice",isAuthenticated(User), generateInvoice)

//update
// invoiceRoute.put("/updateProduct/:id",updateProduct)
//delete
// invoiceRoute.delete("/deleteProduct/:id",deleteProduct)
// invoiceRoute.delete("/deleteEmployee",deleteEmployees)

module.exports = invoiceRoute;
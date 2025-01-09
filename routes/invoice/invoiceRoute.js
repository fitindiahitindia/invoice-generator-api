const express = require("express");
const { 
    downloadInvoice,
    viewInvoice,
    generateInvoice,
    viewInvoices
 } = require("../../controller/invoice/invoiceCtrl");

const invoiceRoute = express.Router();

//create
invoiceRoute.get("/downloadInvoice/:id",downloadInvoice)
//view
invoiceRoute.get("/viewInvoice/:id", viewInvoice)
invoiceRoute.get("/viewInvoices",viewInvoices)

//generate
invoiceRoute.post("/generateInvoice", generateInvoice)

//update
// invoiceRoute.put("/updateProduct/:id",updateProduct)
//delete
// invoiceRoute.delete("/deleteProduct/:id",deleteProduct)
// invoiceRoute.delete("/deleteEmployee",deleteEmployees)

module.exports = invoiceRoute;
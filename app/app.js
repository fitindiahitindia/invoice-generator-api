const express = require("express");
const cors = require("cors")
const userRoute = require("../routes/auth/userRoute");
const adminRoute = require("../routes/auth/adminRoute");
const productRoute = require("../routes/product/productRoute");
const sellerRoute = require("../routes/seller/sellerRoute");
const buyerRoute = require("../routes/buyer/buyerRoute");
const { notFoundErr, globalErrHangler } = require("../middleware/globalErrHandler");
const invoiceRoute = require("../routes/invoice/invoiceRoute");
const accountantRoute = require("../routes/auth/accountantRoute");
const departmentRoute = require("../routes/department/departmentRoute");
const roleRoute = require("../routes/role/roleRoute");
const app = express();
const path = require('path');

app.set('view engine','ejs');

app.set('views',path.join(__dirname,'../views'));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

// app.use("/api/v1/adminAuth",adminRoute);
// app.use("/api/v1/userAuth",userRoute);
app.use("/api/v1/product",productRoute);
app.use("/api/v1/seller",sellerRoute);
app.use("/api/v1/buyer",buyerRoute);
app.use("/api/v1/invoice",invoiceRoute);
// app.use("/api/v1/hr",hrRoute);
// app.use("/api/v1/accountant",accountantRoute);
// app.use("/api/v1/department",departmentRoute);
// app.use("/api/v1/role",roleRoute);



// static  url
app.use('/assets',express.static(path.join(__dirname,'../public/assets')))
app.use('/invoices',express.static(path.join(__dirname,'../public')))



//Error middlewares
app.use(notFoundErr);
app.use(globalErrHangler);

module.exports = app;
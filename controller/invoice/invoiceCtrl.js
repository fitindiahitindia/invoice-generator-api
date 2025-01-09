const expressAsyncHandler = require("express-async-handler");
const Product = require("../../model/product/Product");
const puppeteer = require("puppeteer");
const path = require("path");
const Seller = require("../../model/seller/Seller");
const Buyer = require("../../model/buyer/Buyer");
const Invoice = require("../../model/invoice/Invoice");
const fs = require('fs');

//@desc    download invoice
//@route   POST api/v1/invoice/downloadInvoice/:id
//@access  private
exports.downloadInvoice = expressAsyncHandler(async (req, res) => {
  try {
    
    //is invoice id exist
    const existInvoiceId = await Invoice.findOne(
      {invoiceid: req.params.id}
    )
    if(!existInvoiceId){
     return res.status(200).json({ message: "invoice id is not exist" });
    }
    if(existInvoiceId.download !== '' && existInvoiceId.download !== null){
      const pdfUrl = path.join(
        __dirname,
        "../../public",
        req.params.id + ".pdf"
      );

      //get file size
      const fileStats = fs.statSync(pdfUrl);
      const fileSize = fileStats.size;
      res.set({
        "Content-Type": "application/pdf",
        "Content-Length":fileSize
      });
      res.sendFile(pdfUrl);
      return;
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto (
      `${req.protocol}://${req.get("host")}` + "/api/v1/invoice/viewInvoice/"+req.params.id,
      {
        waitUntil: "networkidle2",
      }
    );

    await page.setViewport({ width: 1080, height: 720 });
    await page.screenshot({
      path: path.join(__dirname, "../../public", req.params.id + ".png"),
    });
    const pdfGen = await page.pdf({
      path: `${path.join(
        __dirname,
        "../../public",
        req.params.id + ".pdf"
      )}`,
      printBackground: true,
      format: "A4",
    });

    await browser.close();

    const pdfUrl = path.join(
      __dirname,
      "../../public",
      req.params.id + ".pdf"
    );


    //store in db

    if(pdfUrl){

      await Invoice.updateOne(
      { invoiceid: existInvoiceId.invoiceid },
      {
        $set: {
          download: await `${req.protocol}://${req.get("host")}`+ "/invoices/"+req.params.id,
        },
      }
    );
    }

    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdfGen.length,
    });

    res.sendFile(pdfUrl);
  
  } catch (error) {
    console.log(error.message);
  }
});

//@desc    generate invoice
//@route   POST api/v1/invoice/generateInvoice
//@access  private
exports.generateInvoice = expressAsyncHandler(async (req, res) => {
  const { sellerid, buyerid, products } = req.body;
  //request body empty
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "body parameter is empty" });
  }
  if (!sellerid) {
    return res.status(200).json({ message: "seller id is Required" });
  } else if (!buyerid) {
    return res.status(200).json({ message: "buyer id is Required" });
  } else if (Object.keys(products).length <=0) {
    return res.status(200).json({ message: "products is Required" });
  }

  try {
    //is exist seller
    const seller = await Seller.findById(sellerid);
    //is exist buyer
    const buyer = await Buyer.findById(buyerid);

    if (!seller) {
      return res.status(200).json({ message: "seller does not exist" });
    }
    if (!buyer) {
      return res.status(200).json({ message: "buyer does not exist" });
    }
    

    //date
    const todayDate = new Date();

    // store invoice
    const invoice = await Invoice.create({
      seller: seller._id,
      buyer: buyer._id,
      products: products,
      date: todayDate.toLocaleDateString(),
    });

    return res.status(201).json({
      status: "success",
      message: "invoice created successfully",
      data: invoice.invoiceid,
    });
  } catch (error) {
    return res.status(200).json({
      status: "failed",
      message: error.message
    });
  }
});

//@desc    view invoice
//@route   POST api/v1/invoice/viewInvoice/:id
//@access  private
exports.viewInvoice = expressAsyncHandler(async (req, res) => {
  try {
    //is exist invoice

    const invoice = await Invoice.findOne(
      { invoiceid: req.params.id },
      {
        createdAt: false,
        updatedAt: false,
        __v: false,
      }
    ).populate("seller", "-createdAt -updatedAt -__v -status")
      .populate("buyer", "-createdAt -updatedAt -__v -status");

    let storedProducts =await invoice.products;
    
    
    getProducts = async () => {
      for (let i = 0; i < storedProducts.length; i++) {
        const products = await Product.findOne(
          { proid: storedProducts[i].proid },
          {
            _id: false,
            createdAt: false,
            updatedAt: false,
            __v: false,
          }
        );
        if (!products) {
          return res.status(200).json({ message: "product does not exist" });
        }
        await storedProducts.map((item) => {
          if (item.proid === products.proid && item.discounttype == "aw") {
            item.productname = products.productname;
            item.description = products.description;
            item.saleprice = item.saleprice | products.saleprice;
            item.totalprice = item.saleprice * item.quantity - item.discount;
          } else if (
            item.proid === products.proid &&
            item.discounttype == "pw"
          ) {
            item.productname = products.productname;
            item.description = products.description;
            item.saleprice = products.saleprice;
            item.totalprice =
              item.saleprice * item.quantity -
              (item.discount / 100) * item.saleprice;
          } else if (item.discounttype == "" || item.discounttype == "") {
            item.productname = products.productname;
            item.description = products.description;
            item.saleprice = products.saleprice;
            item.totalprice = item.saleprice * item.quantity;
          }
        });
      }
      return storedProducts;
    };
    const updatedProducts = await getProducts();
    // Calculate grand total
    const grandTotal = updatedProducts.reduce(
      (acc, product) => acc + product.totalprice,
      0
    );

    const invoiceUpdate = {
      date: invoice.date,
      invoiceid: invoice.invoiceid,
      seller: {
        sellerid: invoice.seller.sellerid,
        billtype: invoice.seller.billtype,
        companyname: invoice.seller.companyname,
        mobile: invoice.seller.mobile,
        email: invoice.seller.email,
        address: invoice.seller.address,
      },
      buyer: {
        buyerid: invoice.buyer.buyerid,
        name: invoice.buyer.name,
        email: invoice.buyer.email,
        mobile: invoice.buyer.mobile,
        lname: invoice.buyer.lname,
      },
      products: updatedProducts,
      grandTotal: grandTotal,
    };
    if (!invoice) {
      return res.status(200).json({ message: "invoice does not exist" });
    }
    res.render("acquaInvoice", { invoiceUpdate });
  } catch (error) {
    console.log(error);
  }
});

//@desc    view products
//@route   GET api/v1/product/viewproducts
//@access  private
exports.viewInvoices = expressAsyncHandler(async (req, res) => {
  const invoices = await Invoice.find(
    {},
    {
      _id: false,
      createdAt: false,
      updatedAt: false,
      __v: false,
    }
  )
    .sort({ createdAt: -1 })
    .populate("seller", "-createdAt -updatedAt -__v -status")
    .populate("buyer", "-createdAt -updatedAt -__v -status");

  return res.status(200).json({
    status: "success",
    message: "All invoice fetched successfully",
    data: invoices,
  });
});

//@desc    update product
//@route   PUT api/v1/product/updateproduct/:id
//@access  private
exports.updateInvoice = expressAsyncHandler(async (req, res) => {
  const {
    productname,
    description,
    quantity,
    saleprice,
    discount,
    discounttype,
  } = req.body;
  //request body empty
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "body parameter is empty" });
  }
  try {
    const updatePro = await Product.findOne({ proid: req.params.id });
    if (!updatePro) {
      return res.status(200).json({ message: "product does not exist" });
    }
    if (!productname) {
      throw new Error("product name is Required");
    }

    // is product exist
    await Product.updateOne(
      { proid: updatePro.proid },
      {
        $set: {
          productname: productname,
          description: description,
          quantity: quantity,
          saleprice: saleprice,
          discount: discount,
          discounttype: discounttype,
        },
      }
    );
    return res.status(200).json({
      status: "success",
      message: "product updated successfully",
    });
  } catch (error) {
    return res
      .status(503)
      .json({ message: "interal server error try again:" + error });
  }
});

//@desc    delete product
//@route   DELETE api/v1/product/deleteProduct/:id
//@access  private
exports.deleteInvoice = expressAsyncHandler(async (req, res) => {
  try {
    const deleteProId = await Product.findOne({ proid: req.params.id });
    if (!deleteProId) {
      return res.status(200).json({ message: "product does not exist" });
    }
    const findbyname = await Product.deleteOne({
      proid: deleteProId.proid,
    });
    return res.status(200).json({
      status: "success",
      message: "product deleted successfully",
    });
  } catch (error) {
    return res
      .status(503)
      .json({ message: "interal server error try again:" + error });
  }
});

//@desc    delete products
//@route   DELETE api/v1/product/deleteproducts
//@access  private
exports.deleteInvoices = expressAsyncHandler(async (req, res) => {
  try {
    await product.deleteMany({});
    return res.status(200).json({
      status: "success",
      message: "all product deleted successfully",
    });
  } catch (error) {
    return res
      .status(503)
      .json({ message: "interal server error try again:" + error });
  }
});

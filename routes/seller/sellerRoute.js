const express = require("express");
const { 
    addSeller,
    viewSeller,
    updateSeller,
    uploadLogo,
    viewSellerLogo,
 } = require("../../controller/seller/sellerCtrl");
const isAuthenticated = require("../../middleware/isAuthenticated");
const User = require("../../model/auth/User");
const sellerRoute = express.Router();
const { v4: uuidv4 } = require('uuid');


const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './public/sellerLogo')
    },
    filename: function (req, file, cb) {
      // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      // return cb(null, file.fieldname + '-' + uniqueSuffix)
      return cb(null,`${uuidv4()}-${file.originalname}`);
    }
  })

  //for image filter
  const fileFilter = (req,file,cb)=>{
    (file.mimetype === "image/jpeg" || file.mimetype === "image/png") ? cb(null,true) : cb(null,false)
    
  } // const upload = multer({ dest: "uploads/" })
  const upload = multer({
    storage:storage,
    fileFilter:fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }
    
})



//create
sellerRoute.post("/addSeller",isAuthenticated(User),upload.single("file"),addSeller)
//view
sellerRoute.get("/viewSeller",isAuthenticated(User), viewSeller)
//update
sellerRoute.put("/updateSeller/:id",isAuthenticated(User),updateSeller)
//upload logo
sellerRoute.post("/uploadLogo/:id",isAuthenticated(User),upload.single("file"),uploadLogo)
//view logo
sellerRoute.get("/viewLogo/:id",isAuthenticated(User),viewSellerLogo)

module.exports = sellerRoute;
const expressAsyncHandler = require("express-async-handler");
const Seller = require("../../model/seller/Seller");
const fs = require('fs')
const path = require('path');

//@desc    create seller
//@route   POST api/v1/seller/addSeller
//@access  public
exports.addSeller = expressAsyncHandler(async (req, res) => {
  const { billtype, companyname, mobile, email, address } = req.body;

  //request body empty
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "body parameter is empty" });
  }

  // is Seller exist
  const issellerFind = await Seller.findOne({
    mobile,
  });

  if (issellerFind) {
    throw new Error("seller already exist");
  } else if (!billtype) {
    throw new Error("bill type is required");
  } else if (!companyname) {
    throw new Error("company name is required");
  } else if (!mobile) {
    throw new Error("mobile is required");
  } else if (!email) {
    throw new Error("email is required");
  } else if (!address) {
    throw new Error("address is required");
  }


  //Seller created
  if (!issellerFind) {
    try {
      await Seller.create({
        billtype: billtype,
        companyname: companyname,
        mobile: mobile,
        email: email,
        address: address,
        user: await req.userAuth._id,
        logo: req.headers.host+'/sellerLogo/'+req?.file?.filename
      });
      //response
      return res.status(201).json({
        status: "success",
        message: "seller created successfully",
      });
    } catch (error) {
      return res
        .status(503)
        .json({ message: "interal server error try again:" + error });
    }
  } else {
    throw new Error("seller exist");
  }
});

//@desc    view single seller
//@route   GET api/v1/seller/viewSeller/:id
//@access  private

// exports.viewSeller = expressAsyncHandler(async (req,res)=>{
//     try{
//     const viewSeller  = await Seller.findOne({sellerid:req.params.id});
//     if(!viewSeller){
//        return res.status(404).json({message:"seller does not exist"})
//      }

//      const viewSellerObj={
//         billtype:viewSeller.billtype,
//         companyname:viewSeller.companyname,
//         mobile:viewSeller.mobile,
//         email:viewSeller.email,
//         address:viewSeller.address,
//     }
//     return res.status(200).json({
//        status:"success",
//        message:"seller fetched successfully",
//        data:viewSellerObj
//     })

//     } catch (error) {
//         return res.status(503).json({message:"interal server error try again"})
//     }

// })

//@desc    view single seller
//@route   GET api/v1/seller/viewSeller
//@access  public

exports.viewSeller = expressAsyncHandler(async (req, res) => {
  const viewSeller = await Seller.find(
    { user: req.userAuth._id },
    {
      createdAt: false,
      updatedAt: false,
      __v: false,
      status: false,
    }
  ).sort({ createdAt: -1 });

  return res.status(200).json({
    status: "success",
    message: "seller fetched successfully",
    data: viewSeller,
  });
});

//@desc    update seller
//@route   PUT api/v1/seller/updateSeller/:id
//@access  public
exports.updateSeller = expressAsyncHandler(async (req, res) => {
  const { billtype, companyname, mobile, email, address } = req.body;
  //request body empty
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "body parameter is empty" });
  }
  try {
    const updateSeller = await Seller.findOne({ sellerid: req.params.id });
    if (!updateSeller) {
      return res.status(200).json({ message: "seller does not exist" });
    }
    if (!billtype) {
      throw new Error("bill type is Required");
    } else if (!companyname) {
      throw new Error("company name is Required");
    } else if (!mobile) {
      throw new Error("mobile is Required");
    } else if (!email) {
      throw new Error("email is Required");
    } else if (!address) {
      throw new Error("address is Required");
    }

    // is seller exist
    await Seller.updateOne(
      { sellerid: updateSeller.sellerid },
      {
        $set: {
          billtype: billtype,
          companyname: companyname,
          mobile: mobile,
          email: email,
          address: address,
        },
      }
    );
    return res.status(200).json({
      status: "success",
      message: "seller updated successfully",
    });
  } catch (error) {
    return res
      .status(503)
      .json({ message: "interal server error try again:" + error });
  }
});

//@desc    upload logo
//@route   POST api/v1/seller/uploadLogo/:id
//@access  public
exports.uploadLogo = expressAsyncHandler(async (req, res) => {
  try {
    const updateSeller = await Seller.findOne({ sellerid: req.params.id });
    if (!updateSeller) {
      return res.status(200).json({ message: "seller does not exist" });
    }
    
    //delete old logo file
    const logoPath = updateSeller.logo
    const fileName = logoPath.split('/').pop()
    const undefinedfilename = logoPath.split('/').pop();
    console.log(req.file.filename)
    if(undefinedfilename!=undefined){
      fs.unlinkSync('public/sellerLogo/'+fileName)
    }
    // is seller exist
    await Seller.updateOne(
      { sellerid: updateSeller.sellerid },
      {
        $set: {
          logo:req.headers.host+'/sellerLogo/'+req.file.filename
        },
      }
    );
    return res.status(200).json({
      status: "success",
      message: "seller logo updated successfully",
    });
  } catch (error) {
    return res
      .status(503)
      .json({ message: "interal server error try again:" + error });
  }
})


//@desc    view seller logo
//@route   GET api/v1/seller/viewLogo/:id
//@access  public

exports.viewSellerLogo = expressAsyncHandler(async (req, res) => {
  const sellerLogo = await Seller.find(
    { user: req.userAuth._id },
    { 
      _id:false,
      logo:true
    }
  )

  return res.status(200).json({
    status: "success",
    message: "seller logo fetched successfully",
    data: sellerLogo,
  });
});
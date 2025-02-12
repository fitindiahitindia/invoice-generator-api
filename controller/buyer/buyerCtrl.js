const expressAsyncHandler = require("express-async-handler");
const Buyer = require("../../model/buyer/Buyer");

//@desc    create buyer
//@route   POST api/v1/buyer/addBuyer
//@access  private
exports.addBuyer = expressAsyncHandler(async (req,res)=>{
    
    const{name,lname,mobile,email}=req.body
    
    //request body empty
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "body parameter is empty" });
    }
    // is buyer exist
    const isbuyerFind = await Buyer.findOne({
        name:new RegExp(name,'i'),
        mobile:mobile
    }) 
    if (isbuyerFind) {
        throw new Error('buyer already exist')
    }else if (!name) {
        throw new Error('name is required')
    }else if (!mobile) {
        throw new Error('mobile is required')
    }
    
    //buyer created
    try {
    await Buyer.create({
        name:name,
        lname:lname,
        mobile:mobile,
        email:email,
        user:await req.userAuth._id
    })
    //response    
    return res.status(201).json({
        status:"success",
        message:"buyer created successfully",
    })
    } catch (error) {
        return res.status(503).json({message:"interal server error try again:"+error})
    }
})

//@desc    view single buyer
//@route   GET api/v1/buyer/viewBuyer/:id
//@access  private
exports.viewBuyer = expressAsyncHandler(async (req,res)=>{
    try{
    const viewBuyer  = await Buyer.findOne({buyerid:req.params.id});
    if(!viewBuyer){
       return res.status(404).json({message:"buyer does not exist"})
     }

     const viewBuyerObj={
        _id:viewBuyer._id,
        buyerid:viewBuyer.buyerid,
        name:viewBuyer.name,
        lname:viewBuyer.lname,
        mobile:viewBuyer.mobile,
        email:viewBuyer.email,
    }
    return res.status(200).json({
       status:"success",
       message:"buyer fetched successfully",
       data:viewBuyerObj
    })

    } catch (error) {
        return res.status(503).json({message:"interal server error try again"})
    }

    
})

//@desc    view buyers
//@route   GET api/v1/buyer/viewBuyers
//@access  private
exports.viewBuyers = expressAsyncHandler(async (req,res)=>{
    const viewbuyers  = await Buyer.find({user:req.userAuth._id},{
        createdAt:false,
        updatedAt:false,
        __v:false,
        status:false
    }).sort({ createdAt: -1 });
    
   return res.status(200).json({
       status:"success",
       message:"All buyers fetched successfully",
       data:viewbuyers
    })
})

//@desc    update buyer
//@route   PUT api/v1/buyer/updateBuyer/:id
//@access  private
exports.updateBuyer = expressAsyncHandler(async (req,res)=>{
    const{name,lname,mobile,email}=req.body
    //request body empty
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "body parameter is empty" });
    }
    try{
        const updateBuyer  = await Buyer.findOne({buyerid:req.params.id});
        if(!updateBuyer){
           return res.status(200).json({message:"buyer does not exist"})
         }
           if (!name) {
            throw new Error('buyer name is Required')
            } else if(!mobile){
                throw new Error('mobile is Required')
            }
            
          // is buyer exist
               await Buyer.updateOne(
                {buyerid:updateBuyer.buyerid},
                {$set:{
                    name:name,
                    lname:lname,
                    mobile:mobile,
                    email:email,
                    }
                }
                ) 
            return res.status(200).json({
                status:"success",
                message:"buyer updated successfully",
             })
    } catch (error) {
       return res.status(503).json({message:"interal server error try again:" +error})
    }
})

//@desc    delete product
//@route   DELETE api/v1/product/deleteProduct/:id
//@access  private
exports.deleteProduct = expressAsyncHandler(async (req,res)=>{
    try{
        const deleteProId  = await Product.findOne({proid:req.params.id});
        if(!deleteProId){
           return res.status(200).json({message:"product does not exist"})
         }
           const findbyname =  await Product.deleteOne({
            proid:deleteProId.proid,
            })
                return res.status(200).json({
                    status:"success",
                    message:"product deleted successfully",
                 })
     
    } catch (error) {
       return res.status(503).json({message:"interal server error try again:"+error})
    }  
})

//@desc    delete products
//@route   DELETE api/v1/product/deleteproducts
//@access  private
exports.deleteproducts = expressAsyncHandler(async (req,res)=>{
    try{
        await product.deleteMany({})
             return res.status(200).json({
                 status:"success",
                 message:"all product deleted successfully",
              })
  
 } catch (error) {
    return res.status(503).json({message:"interal server error try again:"+error})
 }  
})



const expressAsyncHandler = require("express-async-handler");
const Product = require("../../model/product/Product");

//@desc    create product
//@route   POST api/v1/product/createProduct
//@access  private
exports.addProduct = expressAsyncHandler(async (req,res)=>{
    
    const{productname,description,quantity,saleprice,discount,discounttype}=req.body
    
    //request body empty
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "body parameter is empty" });
    }
    // is product exist
    const isproductFind = await Product.findOne({
        productname:new RegExp(productname,'i'),
    }) 
    if (isproductFind) {
        throw new Error('product Already Exist')
    }else if (!(discounttype==="pw" || discounttype==="aw") && discount > 0) {
        throw new Error('discount type must be pw or aw')

    }
    
    //product created
    try {
     await Product.create({
        productname:productname,
        description:description,
        quantity:quantity,
        saleprice:saleprice,
        discount:discount,
        discounttype:discounttype,
        user:await req.userAuth._id
    })
    //response    
    return res.status(201).json({
        status:"success",
        message:"product created successfully",
    })
    } catch (error) {
        return res.status(503).json({message:"interal server error try again:"+error})
    }
})

//@desc    view single product
//@route   GET api/v1/product/viewProduct/:id
//@access  private
exports.viewProduct = expressAsyncHandler(async (req,res)=>{
    try{
    const viewPro  = await Product.findOne({proid:req.params.id});
    if(!viewPro){
       return res.status(404).json({message:"product does not exist"})
     }

     const viewProObj={
        proid:viewPro.empid,
        productname:viewPro.productname,
        description:viewPro.description,
        quantity:viewPro.quantity,
        saleprice:viewPro.saleprice,
        discount:viewPro.discount,
        discounttype:viewPro.discounttype,
    }
    return res.status(200).json({
       status:"success",
       message:"product fetched successfully",
       data:viewProObj
    })

    } catch (error) {
        return res.status(503).json({message:"interal server error try again"})
    }

    
})

//@desc    view products
//@route   GET api/v1/product/viewproducts
//@access  private
exports.viewProducts = expressAsyncHandler(async (req,res)=>{
    const viewproducts  = await Product.find({user:req.userAuth._id},{
        _id:false,
        createdAt:false,
        updatedAt:false,
        __v:false,
    }).sort({ createdAt: -1 });
    
   return res.status(200).json({
       status:"success",
       message:"All products fetched successfully",
       data:viewproducts
    })
})

//@desc    update product
//@route   PUT api/v1/product/updateproduct/:id
//@access  private
exports.updateProduct = expressAsyncHandler(async (req,res)=>{
    const{productname,description,quantity,saleprice,discount,discounttype}=req.body
    //request body empty
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "body parameter is empty" });
    }
    try{
        const updatePro  = await Product.findOne({proid:req.params.id});
        if(!updatePro){
           return res.status(200).json({message:"product does not exist"})
         }
           if (!productname) {
            throw new Error('product name is Required')
            } 
            
          // is product exist
               await Product.updateOne(
                {proid:updatePro.proid},
                {$set:{
                    productname:productname,
                    description:description,
                    quantity:quantity,
                    saleprice:saleprice,
                    discount:discount,
                    discounttype:discounttype,
                    }
                }
                ) 
            return res.status(200).json({
                status:"success",
                message:"product updated successfully",
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



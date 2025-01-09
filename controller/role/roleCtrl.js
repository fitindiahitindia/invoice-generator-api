const expressAsyncHandler = require("express-async-handler");
const Role = require("../../model/role/Role");
const generateId = require("../../utility/generateId");

//@desc    create Role
//@route   POST api/v1/role/createRole
//@access  private
exports.createRole = expressAsyncHandler(async (req,res)=>{
    const{name}=req.body;
     //request body empty
     if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "body parameter is empty" });
    }
    //exist role
    const existRole = await Role.findOne({
        name:new RegExp(name,'i')
    })

    if(existRole){
        throw new Error("role is already exist");
    }
        else if(!name){
           throw new Error("name is required")
        }
    
    //create role
    try{
      await Role.create({
        roleId:await generateId("rol"),
        name:name
      })

       //response    
       return res.status(201).json({
        status:"success",
        message:"Create role successfully",
    })
    }
    catch(error){
        return  res.status(503).json({message:"interal server error try again:"+error})
    }
})

//@desc    view Role
//@route   GET api/v1/role/viewRole/:id
//@access  private
exports.viewRole = expressAsyncHandler(async (req,res)=>{
    try{
        const viewRole  = await Role.findOne({roleId:req.params.id});
        if(!viewRole){
            return res.status(404).json({message:"role does not exist"})
         }
         //make object
         const viewRoleObj={
            roleId:viewRole.roleId,
            name:viewRole.name,
        }
        return res.status(200).json({
           status:"success",
           message:"role fetched successfully",
           data:viewRoleObj
        })
    
        } catch (error) {
            return  res.status(503).json({message:"interal server error try again:"+error})
        }
})

//@desc    view Roles
//@route   GET api/v1/role/viewRoles
//@access  private
exports.viewRoles = expressAsyncHandler(async (req,res)=>{
    const viewRoles = await Role.find({},{
        _id:false,
        __v:false,
        createdAt:false,
        updatedAt:false,
    })
    return res.status(200).json({
        status:"success",
        message:"all role fetched successfully",
        data:viewRoles
     })
})

//@desc    update Roles
//@route   PUT api/v1/role/updateRole/:id
//@access  private
exports.updateRole = expressAsyncHandler(async (req,res)=>{
    const{name}=req.body;
    //request body empty
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "body parameter is empty" });
    }
    try{
        const updateRole  = await Role.findOne({roleId:req.params.id});
        if(!updateRole){
           return res.status(200).json({message:"role does not exist"})
         }
        if(updateRole){
           const findbyname =  await Role.findOne({
                name:new RegExp(name,'i'),
            })
            if(findbyname){

               return res.status(200).json({message:"role already exist"})
            }else{
                const updateById = await Role.updateOne(
                    {roleId:updateRole.roleId},
                    {$set:{name:name}}
                 )
            
                return res.status(200).json({
                    status:"success",
                    message:"role updated successfully",
                 })
            }
           
        }
        
     
    } catch (error) {
       return res.status(503).json({message:"interal server error try again:"+error})
    }
})

//@desc    delete Role
//@route   DELETE api/v1/role/deleteRole/:id
//@access  private
exports.deleteRole = expressAsyncHandler(async (req,res)=>{
    try{
        const deleteRoleId  = await Role.findOne({roleId:req.params.id});
        if(!deleteRoleId){
           return res.status(200).json({message:"role does not exist"})
         }
           const findbyname =  await Role.deleteOne({
                roleId:deleteRoleId.roleId,
            })
                return res.status(200).json({
                    status:"success",
                    message:"role deleted successfully",
                 })
     
    } catch (error) {
       return res.status(503).json({message:"interal server error try again:"+error})
    }  
})

//@desc    delete Roles
//@route   DELETE api/v1/role/deleteRoles
//@access  private
exports.deleteRoles = expressAsyncHandler(async (req,res)=>{
    try{
        await Role.deleteMany({})
             return res.status(200).json({
                 status:"success",
                 message:"all roles deleted successfully",
              })
  
 } catch (error) {
    return res.status(503).json({message:"interal server error try again:"+error})
 }  
})


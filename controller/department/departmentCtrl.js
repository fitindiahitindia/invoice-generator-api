const expressAsyncHandler = require("express-async-handler");
const Department = require("../../model/department/Department");
const generateId = require("../../utility/generateId");

//@desc    create department
//@route   POST api/v1/department/createDepartment
//@access  private
exports.createDepartment = expressAsyncHandler(async (req,res)=>{
    const{name}=req.body;
     //request body empty
     if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "body parameter is empty" });
    }
    //exist department
    const existDepartment = await Department.findOne({
        name:new RegExp(name,'i')
    })

    if(existDepartment){
        throw new Error("department is already exist");
    }
        else if(!name){
           throw new Error("name is required")
        }
    
    //create department
    try{
      await Department.create({
        depId:await generateId("dep"),
        name:name
      })

       //response    
       return res.status(201).json({
        status:"success",
        message:"Create department successfully",
    })
    }
    catch(error){
        return res.status(503).json({message:"interal server error try again:"+error})
    }
})

//@desc    view department
//@route   GET api/v1/department/viewDepartment/:id
//@access  private
exports.viewDepartment = expressAsyncHandler(async (req,res)=>{
    try{
        const viewDep  = await Department.findOne({depId:req.params.id});
        if(!viewDep){
            return res.status(404).json({message:"Department does not exist"})
         }
         //make object
         const viewDepObj={
            depId:viewDep.depId,
            name:viewDep.name,
        }
        return res.status(200).json({
           status:"success",
           message:"Department fetched successfully",
           data:viewDepObj
        })
    
        } catch (error) {
            return res.status(503).json({message:"interal server error try again"})
        }
})

//@desc    view departments
//@route   GET api/v1/department/viewDepartments
//@access  private
exports.viewDepartments = expressAsyncHandler(async (req,res)=>{
    const viewDepartments = await Department.find({},{
        _id:false,
        __v:false,
        createdAt:false,
        updatedAt:false,
    })
    return res.status(200).json({
        status:"success",
        message:"All Departments fetched successfully",
        data:viewDepartments
     })
})

//@desc    update departments
//@route   PUT api/v1/department/updateDepartment/:id
//@access  private
exports.updateDepartment = expressAsyncHandler(async (req,res)=>{
    const{name}=req.body;
    //request body empty
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "body parameter is empty" });
    }
    try{
        const updateDep  = await Department.findOne({depId:req.params.id});
        if(!updateDep){
           return res.status(200).json({message:"Department does not exist"})
         }
        if(updateDep){
           const findbyname =  await Department.findOne({
                name:new RegExp(name,'i'),
            })
            if(findbyname){

               return res.status(200).json({message:"Department already exist"})
            }else{
                const updateById = await Department.updateOne(
                    {depId:updateDep.depId},
                    {$set:{name:name}}
                 )
            
                return res.status(200).json({
                    status:"success",
                    message:"department updated successfully",
                 })
            }
           
        }
        
     
    } catch (error) {
       return res.status(503).json({message:"interal server error try again:"+error})
    }
})

//@desc    delete department
//@route   DELETE api/v1/department/deleteDepartment/:id
//@access  private
exports.deleteDepartment = expressAsyncHandler(async (req,res)=>{
    
    try{
        const deleteDepId  = await Department.findOne({depId:req.params.id});
        if(!deleteDepId){
           return res.status(200).json({message:"Department does not exist"})
         }
           const findbyname =  await Department.deleteOne({
                depId:deleteDepId.depId,
            })
                return res.status(200).json({
                    status:"success",
                    message:"department deleted successfully",
                 })
     
    } catch (error) {
       return res.status(503).json({message:"interal server error try again:"+error})
    }
})

//@desc    delete departments
//@route   DELETE api/v1/department/deleteDepartments
//@access  private
exports.deleteDepartments = expressAsyncHandler(async (req,res)=>{
    try{
           await Department.deleteMany({})
                return res.status(200).json({
                    status:"success",
                    message:"all departments deleted successfully",
                 })
     
    } catch (error) {
       return res.status(503).json({message:"interal server error try again:"+error})
    }
})


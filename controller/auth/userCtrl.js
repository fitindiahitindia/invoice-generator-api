const expressAsyncHandler = require("express-async-handler");
const User = require("../../model/auth/User");
const { hashPassword, isPassMatch } = require("../../utility/helper");
const generateToken = require("../../utility/generateToken");

//@desc     register user
//@route    POST api/v1/userAuth/register
//@access   public

exports.userRegister = expressAsyncHandler(async (req, res) => {
    const { email,mobile,name,password } = req.body;

    //request body empty
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "body parameter is empty" });
    }

    try {
        //isEmailExist
        const isEmailExist = await User.findOne({ email:new RegExp(email,'i') })

        if(isEmailExist){
            return res.status(400).json({ message: "email already exist" });
        }

        //create
        await User.create({
            email:email,
            name:name,
            mobile:mobile,
            password:await hashPassword(password)
        })

        return res.status(201).json({
            status: "success",
            message:"user created successfully",
        })
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
     }

})


//@desc     login user
//@route    POST api/v1/userAuth/login
//@access   public
exports.userLogin = expressAsyncHandler(async (req, res) => {
    const{email,password}=req.body
    
    //request body empty
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "body parameter is empty" });
    }

    if(email==null || email==''){
        return res.status(401).json({
            message:"email is required"
        })
    }
    if(password==null || password==''){
        return res.status(401).json({
            message:"password is required"
        })
    }

    try {
      //find email
      const finduser = await User.findOne({
        email:new RegExp(email,'i')
      })

      //account disabled
      if(finduser){
        const status = finduser.status;
        if(status==false){
            return res.status(401).json({
                status:"failed",
                message:"account is disabled"
            })
        }
      }

      if (!finduser) {
        return res.status(401).json({
            message: "invalid login crendentials",
            status: "failed"
        })
    }

      //find password
      const findpassword=await isPassMatch(password,finduser.password);

      if(!findpassword){
        return res.status(401).json({
            message: "invalid login crendentials",
            status: "failed"
        })
      }else{
        return res.status(200).json({
            status: "success",
            token: generateToken(finduser._id),
            message: "user logged in successfully",
        });
      }
    } catch (error) {
        return res.status(500).json({ message: "something went wrong"+error.message }); 
    }
})


const mongoose = require("mongoose");

mongoose.set("strictQuery",false);

const dbConnect = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB Connected Successfully")
    }
    catch(error){
        console.log("DB Connected Failed --> ", error)
    }
}

dbConnect();

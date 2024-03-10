const mongoose=require("mongoose")
const authSchema=new mongoose.Schema(
    {
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        phone:
        {
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        pincode:{
            type:String,
            required:true
        }

    }
)
module.exports=mongoose.model("Auth",authSchema)
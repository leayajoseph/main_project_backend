const express=require("express")

const router=express.Router()

const authModel=require("../models/authModel")
const bcrypt=require("bcryptjs")

hashPasswordGenerator=async(pass)=>{
    const salt=await bcrypt.genSalt(10)
    return bcrypt.hash(pass,salt)
}

//signup

router.post("/signup",async(req,res)=>{
    let {data}={"data":req.body}
    let password=req.body.password
    const hashPassword=await hashPasswordGenerator(password)
    data.password=hashPassword
    let authUser=new authModel(data)
    let result=await authUser.save()
    res.json({
        status:"success"
    })
})

module.exports=router
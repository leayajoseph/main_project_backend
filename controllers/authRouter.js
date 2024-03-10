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

//login
router.post("/login",async(req,res)=>{
    let input=req.body
    let email=req.body.email
    let data=await authModel.findOne({"email":email})
    if(!data)
    {
        return res.json({
            status:"invalid email"
        })
    }
    console.log(data)
    let dbPassword=data.password
    let inputPassword=req.body.password
    console.log(dbPassword)
    console.log(inputPassword)
    const match=await bcrypt.compare(inputPassword,dbPassword)
    if(!match)
    {
        return res.json({
            status:"invalid password"
        })
    }
    res.json({
        status:"success","userdata":data
    })
})
module.exports=router
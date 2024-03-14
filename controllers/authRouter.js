const express=require("express")

const router=express.Router()

const otpController=require("../controllers/otp.controller")
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

//view user

router.get("/viewuser",async(req,res)=>{
    let result=await authModel.find()
    res.json(result)
})

//reset password

router.post("/otp-reset-password",otpController.otpReset);
router.post("/otp-verify",otpController.verifyOTP);

router.post("/change_password",async(req,res)=>{
    const {email,password}=req.body;
    const hashPassword=await hashPasswordGenerator(password)
    await authModel.updateOne(
        {"email":email},
        {$set:{"password":hashPassword}}
    );
    return res.json({message:"Success"});


});

module.exports=router
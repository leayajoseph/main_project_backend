const express=require("express")

const router=express.Router()
const vendorModel=require("../models/vendor")
const categoryModel=require("../models/categoryModel")
const upload=require("../upload")

router.post('/upload', upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'fssai', maxCount: 1 }]), 
(req, res) => {
    const newdata = new vendorModel({
      company_name: req.body.company_name,
      email: req.body.email,
      address: req.body.address,
      logo: req.files['logo'][0].path,
      fssai: req.files['fssai'][0].path
    });
  
    newdata.save()
      .then(() => res.send("Successfully uploaded"))
      .catch(err => console.log(err));
  });

  router.get("/viewVendor",async(req,res)=>{
    let result=await vendorModel.find()
    res.json(result)
});


  module.exports=router
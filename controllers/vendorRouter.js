const express=require("express")

const router=express.Router()
const vendorModel=require("../models/vendor")
const upload=require("../upload")

router.post('/upload', upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'fssai', maxCount: 1 }]), 
(req, res) => {
    const newdata = new vendorModel({
      company_name: req.body.company_name,
      email: req.body.email,
      address: req.body.address,
      logo: {
        data: req.files['logo'][0].filename,
        contentType: 'image/png'
      },
      fssai: {
        data: req.files['fssai'][0].filename,
        contentType: 'application/pdf'
      }
    });
  
    newdata.save()
      .then(() => res.send("Successfully uploaded"))
      .catch(err => console.log(err));
  });

  router.get("/viewVendor",async(req,res)=>{
    let result=await vendorModel.find()
    res.json(result)
})

  module.exports=router
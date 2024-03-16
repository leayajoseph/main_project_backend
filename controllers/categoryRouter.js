const express=require("express")
const path=require('path')
const router=express.Router()
const categoryModel=require("../models/categoryModel")

const multer=require('multer')

const Storage=multer.diskStorage({
    destination: 'uploads',
    filename:(req,file,cb)=>{
        let ext=path.extname(file.originalname)
        cb(null, Date.now()+ext);
    },
});

const upload=multer({
    storage:Storage
}).single("category_icon")

router.post('/category_upload',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            const newcategory=new categoryModel({
                category_name:req.body.category_name,
                category_icon:req.file.path
            })
            newcategory.save()
      .then(() => res.send("Successfully uploaded"))
      .catch(err => console.log(err));
        }
    })
})

module.exports=router

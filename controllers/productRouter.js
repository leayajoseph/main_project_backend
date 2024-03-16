const express=require("express")
const path=require('path')
const router=express.Router()
const productModel=require("../models/productModel")

const multer=require('multer')

const Storage=multer.diskStorage({
    destination: 'uploads',
    filename:(req,file,cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        let ext=path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    },
});

const upload=multer({
    storage:Storage
}).array('product_img[]')

router.post('/product_upload',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            const discount=req.body.discount;
            const price=req.body.price;
            const discount_price=calculateDiscountPrice(price,discount);
            const newProduct=new productModel({
                product_name:req.body.product_name,
                price:req.body.price,
                discount:req.body.discount,
                discount_price:discount_price,
                short_desc:req.body.short_desc,
                long_desc:req.body.long_desc,
                vendor_id:req.body.vendor_id,
                category_id:req.body.category_id,
                video_link:req.body.video_link
            })
            if(req.files){
                let path=''
                req.files.forEach(function(files,index,arr){
                    path=path+files.path+','
                })
                path=path.substring(0,path.lastIndexOf(","))
                newProduct.product_img=path
            }
            newProduct.save()
      .then(() => res.send("Successfully uploaded"))
      .catch(err => console.log(err));
        }
    })
});
function calculateDiscountPrice(price, discount) {
    const discountedAmount = (parseInt(price) * (parseInt(discount) / 100));
    return (parseInt(price) - discountedAmount).toString();
}

module.exports=router

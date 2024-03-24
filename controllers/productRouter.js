const express=require("express")
const path=require('path')
const router=express.Router()
const productModel=require("../models/productModel")

const multer=require('multer')
const { ObjectId } = require("bson")

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

router.get("/viewproduct",async(req,res)=>{
    let result=await productModel.find()
    res.json(result)
});

router.get('/product_category', async(req,res)=>{
    let category_id=req.query.category_id
    let data=await productModel.find({"category_id":category_id});
    if(!data)
    {
        return res.json({
            status: "No products"
        })
    }
    res.json(data)
});
function calculateDiscountPrice(price, discount) {
    const discountedAmount = (parseInt(price) * (parseInt(discount) / 100));
    return (parseInt(price) - discountedAmount).toString();
}

router.put('/update_product', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error uploading files' });
        }

        // Extract product ID from request query
        const productId = req.query.id;

        // Extract other product details from request body
        const {
            product_name,
            price,
            discount,
            discount_price,
            short_desc,
            long_desc,
            vendor_id,
            category_id,
            video_link
        } = req.body;

        let product_img = '';

        if (req.files) {
            req.files.forEach((file) => {
                product_img += file.path + ',';
            });
            product_img = product_img.slice(0, -1); // Remove the last comma
        }

        // Update the product in the database
        productModel.findByIdAndUpdate(productId, {
            product_name,
            price,
            discount,
            discount_price,
            short_desc,
            long_desc,
            vendor_id,
            category_id,
            video_link,
            product_img
        }, { new: true })
        .then((updatedProduct) => {
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(updatedProduct);
        })
        .catch((error) => {
            console.error('Error updating product:', error.message);
            res.status(500).json({ message: 'Internal server error' });
        });
    });
});

module.exports=router

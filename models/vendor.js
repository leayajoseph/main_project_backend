const mongoose=require('mongoose');
const VendorSchema=mongoose.Schema({
    company_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    logo:{
        type:String,
        required:true
    },
    fssai:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('vendor',VendorSchema)
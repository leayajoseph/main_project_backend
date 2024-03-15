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
        data:Buffer,
        contentType:String
    },
    fssai:{
        data:Buffer,
        contentType:String
    }
})
module.exports=mongoose.model('vendor',VendorSchema)
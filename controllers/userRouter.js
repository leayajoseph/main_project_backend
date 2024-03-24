const express=require("express")
const router=express.Router()
const userModel=require("../models/authModel")

router.get("/user_account",async(req,res)=>{
    let user_id=req.query.user_id
    let data=await userModel.findOne({"_id":user_id});
    if(!data)
    {
        return res.json({
            status:"no user"
        })
    }
    res.json(data)
});

router.put('/update_user', async (req, res) => {
    try {
        const userId = req.query.userId;
        const { email, name, phone, address, pincode } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const updatedFields = {};
        if (email) updatedFields.email = email;
        if (name) updatedFields.name = name;
        if (phone) updatedFields.phone = phone;
        if (address) updatedFields.address = address;
        if (pincode) updatedFields.pincode = pincode;

        const updatedUser = await userModel.findByIdAndUpdate(userId, updatedFields, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports=router
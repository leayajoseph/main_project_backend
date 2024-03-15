const express = require("express")
const cors=require("cors")
const mongoose=require("mongoose")

const app=express()

const authRoute=require("./controllers/authRouter")
const vendorRoute=require("./controllers/vendorRouter")


app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://leaya:Leaya231@cluster0.sxtvlhw.mongodb.net/villagezoneDb?retryWrites=true&w=majority",{
useNewUrlParser: true
})

app.use("/api/auth",authRoute)
app.use("/api/vendor",vendorRoute)

app.listen(3001,()=>{
    console.log("server running")
})
const express = require('express')
const app = express();
const errorMiddleare = require('./middleware/error')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors =require("cors");
const path = require('path')



//config
if (process.env.NODE_ENV !== "PRODUCTION") {
require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(cors());
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended:true , limit:"1mb"}))
app.use(fileUpload())

//import routes
const product = require('./routes/productRoute')
const user = require('./routes/userRoute')
const order = require('./routes/orderRoute')
const payment = require('./routes/paymentRoute')


app.use("/api/V1",product)
app.use("/api/V1",user)
app.use("/api/V1",order)
app.use("/api/V1",payment)

app.use(express.static(path.join(__dirname,"../frontend/build")));
app.get("*",(req,res)=>{
  res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
})

app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

//middleware for error
app.use(errorMiddleare);

module.exports = app
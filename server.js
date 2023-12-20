//import express
const express = require("express");
//import dotenv
const dotenv = require("dotenv");
//import other dependencies
const colors = require('colors')
const morgan = require("morgan")
const cors = require("cors");
const connectDB = require("./config/db");
const path = require('path')

//dot config
dotenv.config();

//mongodb connection
connectDB();
//create rest object with the help of which we can create a server and store all the functionalities of express inside a variable named app
const app = express();

//middlewares
app.use(express.json());  //app can access json responses also
app.use(cors());
app.use(morgan("dev"));  //receive a message on the console that which url is active and what the response is and what time it took


//routes
//1 test route
//'/' indicates local host home route and then we use call back function which has reques,response and middleware req is used to take request from the user and res to give some response from the user
//json response
//first we used get method now we are using use method it acts as middleware
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));

//Static Folders
app.use(express.static(path.basename.join(__dirname,'./client/build')))

//Static Routes
app.get('*', function(req,res){
  res.sendFile(path.join(__dirname,'./client/build/index.html'));
})

//create port
const PORT = process.env.PORT || 8080;

//create a method named listen to call
app.listen(PORT, () => {
    console.log(
      `Node Server Running In ${process.env.DEV_MODE} ModeOn Port ${process.env.PORT}` .bgBlue.white
    );
  })
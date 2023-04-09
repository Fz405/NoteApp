const express= require("express");   // importing express library
const app= express();             // we made application object with the help of express, app object is server application
const userRouter = require("./routes/userRoutes");// importing object here 
const noteRouter = require("./routes/noteRoutes");
const dotenv= require("dotenv");
const cors= require("cors"); // this library is middleware...will add headers from api responses
dotenv.config(); // read env file  make environment crossponding to variables to read ...make them system variables
const mongoose= require("mongoose");
app.use(express.json()); // it convert req.body(which is in string form) to json
// app.use((req,res,next)=>{   test middleware
//     console.log("HTTP method-" + req.method+ " url" + req.url);
//     next();

// });
app.use(cors()); //it will pass headers in all responses of API
app.use("/users", userRouter);  // defined all end points for users in this file
app.use("/note", noteRouter);
app.get("/",(req, res)=>{      // request will send to server for get method on root url
    res.send("Notes API from Faiza");
}); 



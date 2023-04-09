const express= require("express");
const { signup, signin } = require("../controllers/userController");
const userRouter= express.Router();
userRouter.post("/signup",signup);
userRouter.post("/signin",signin);
module.exports= userRouter; // if we want to access this object in somewhere else then we do this to export that object
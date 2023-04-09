const express= require("express");
const { createNotes, getNotes, deleteNotes, updateNotes } = require("../controllers/noteController");
const auth = require("../middeware/auth");
const noteRouter= express.Router();
// All endpoints are authenticated endpoints...We can call only these endpoints when we have vali token..To check valid token we defined middleware (auth) and we call auth before every function call
noteRouter.get("/",auth, getNotes);
noteRouter.post("/",auth, createNotes);
noteRouter.delete("/:id",auth, deleteNotes);
noteRouter.put("/:id",auth, updateNotes);
module.exports= noteRouter; // if we want to access this object in somewhere else then we do this to export that object
// noteRouter.post("/",(req, res)=>{ 
//     res.send("POSTnpm start Request");       
// });
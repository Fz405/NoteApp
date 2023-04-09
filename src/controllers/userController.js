const userModel= require("../models/user");
const bycrypt= require("bcrypt"); // library to hash password
const jwt= require("jsonwebtoken");
const SECRET_kEY= process.env.SECRET_kEY;
const signup =async(req, res)=>  // function for sigup and work related 
//to database is Asynchronous because it takes time so we make this asynchronous
{
    //existing user check
    // Hashed password
    // user creation
    // token generate

    const {username,email, password }= req.body;  // This body have three properties
    try {
        //models help us to interact with database
        const existingUser= await userModel.findOne({email:email}) // in this function pass object(filter) to check that type of  
        //user exist or not... we will also use await in above because we are going to check with database which takes time, 
        //jb tk response nhi aata execution yehi py ruka rhy ga (wait krta rhy ga), when 
        //we use await function we have to make sure parent function is async function.
         if(existingUser)
         {
            return res.status(400).json({message:"user already exists"});
         }
         const hashedPassword= await bycrypt.hash(password, 10); // this hash function execute for 10 times

         //create user
         const result= await userModel.create({
            username:username,
            email:email,
            password:hashedPassword,
             });
            //Token genertion...we will use JWT(jsonwebtokens) library for token generation
             const token = jwt.sign({email:result.email, id:result._id}, process.env.SECRET_kEY);  // here we have to passs two parameters..1st what we want to store(payload) which later on validates user
             // and 2nd one is to pass secret ...mongodb also generates unique id for user
            res.status(201).json({user:result, token:token}); //201 means record created sucessfully
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
        
    }

}

const signin = async(req, res)=>  // function for sigin
{
    const {email, password}=req.body;
    try {
        const existingUser= await userModel.findOne({email:email}) // in this function pass object(filter) to check that type of  
         if(!existingUser)
         {
            return res.status(404).json({message:"user not found"});
         }
       const matchPassword= await bycrypt.compare(password, existingUser.password);
       if(!matchPassword)
       {
        return res.status(400).json({message:"invalid credentials"})
       }
       const token = jwt.sign({email:existingUser.email, id:existingUser._id}, SECRET_kEY);  // here we have to passs two parameters..1st what we want to store(payload) which later on validates user
       // and 2nd one is to pass secret ...mongodb also generates unique id for user
      res.status(200).json({user:existingUser, token:token}); 
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"});  
    }

}
module.exports= {signin, signup}
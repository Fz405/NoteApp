const noteModel = require("../models/note");

const createNotes= async (req, res)=>
{
  //console.log(req.userId);
  const {title, description}= req.body;
  const newNote= new noteModel(
    {
        title:title,
        Desc: description,
        userId: req.userId
    }
  );
  try {
    //by using await execution remains there until our newNote saved
    await newNote.save();
    res.status(201).json(newNote);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Something went wrong"});
    
  }

}

const updateNotes= async(req, res)=>
{
    const id= req.params.id;
    const {title, description}= req.body;
    const newNote= {
            title:title,
            Desc: description,
            userId: req.userId
        }

        try {
            await noteModel.findByIdAndUpdate(id, newNote, {new:true});  // new will update object in db and thrn return it
            res.status(201).json(newNote);
    
        } catch (error) {
          console.log(error);
          res.status(500).json({message:"Something went wrong"});
          
        }

    
}

const deleteNotes= async (req, res)=>
{
    const id= req.params.id;
          try {
           const note= await noteModel.findByIdAndRemove(id);
            res.status(202).json(note);
    
        } catch (error) {
          console.log(error);
          res.status(500).json({message:"Something went wrong"});
          
        }
}

const getNotes= async (req, res)=>
{
    try {
        const notes= await noteModel.find({userId:req.userId})
        res.status(200).json(notes);
        
      } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
        
      }
    
}
module.exports=
{
    createNotes,
    updateNotes,
    deleteNotes,
    getNotes
}


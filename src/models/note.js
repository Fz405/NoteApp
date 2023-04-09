const mongoose= require("mongoose");

const noteSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true

        }
        ,Desc: {
            type: String
            , required:true

        }
        ,
        userId:{
         type:mongoose.Schema.Types.ObjectId,  // telling about user id of User here
         ref: "User",
         required: true
    
        }
    }, {timestamps: true}
);
module.exports= mongoose.model("Note", noteSchema);
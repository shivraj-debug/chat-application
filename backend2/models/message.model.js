import mongoose from "mongoose"

//A Mongoose schema is a blueprint for the data, specifying the fields and their types, as well as any validation rules, default values, and other schema-level configurations.

const messageSchema=new mongoose.Schema({
        senderId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        receiverId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        message:{
            type:String,
            required:true
        }
},{timestamps:true}); //by use of time stamp mongodb created time for created and updated.

const Message=mongoose.model("Message",messageSchema); //here message is the name of model  and jo mmodel ka name hota h wahi plural of model collection ka naam hota h

export default Message;
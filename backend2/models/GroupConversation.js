import mongoose from "mongoose"

const conversationSchema=new mongoose.Schema({
    groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group", 
    required: true,
  },
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"GroupMessage",
            // strictPopulate:false,
            default:[]
        },
    ]
},{timestamps:true})

const GroupConversation=mongoose.model("GroupConversation",conversationSchema);

export default GroupConversation;
import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js'
import { getReceiverSocketId,io } from "../socket/socket.js";

export const sendMessage = async (req,res) => {
     try{
          const {message}=req.body;
          const {id:receiverId}=req.params;
          const senderId=req.user._id;

         let conversation= await Conversation.findOne({
          participants:{ $all : [senderId,receiverId]} //it will return all conversation bw this this sender and receiver id;
         })

         if(!conversation){
               conversation=await Conversation.create({
                    participants:[senderId,receiverId]
               })
         }

         const newmessage=new Message({
               senderId,
               receiverId,
               message
         })

         if(newmessage){
          conversation.messages.push(newmessage.id);
         }

     //this both run in parallel
     await Promise.all([conversation.save(),newmessage.save()]);

     // login for socket.io
     const receiverSocketId = getReceiverSocketId(receiverId);
      if(receiverSocketId){
        // Emit the message to the specific receiver
        io.to(receiverSocketId).emit('newMessage', newmessage);
      }


         res.status(201).json(newmessage);

     }catch(err){
         console.log("error in sendMessage",err.message);
         res.status(500).json({err:"internal in message server error"})
     }
};

export const getMessage=async (req,res)=>{
    const { id: userToChatId } = req.params;
    const senderId = req.user.id;

try {
  const conversation = await Conversation.findOne({
    participants: { $all: [senderId, userToChatId] }
  }).populate("messages");  // Ensure this matches your schema field
  //yaha messages is the field name of model conversation that store message of model Message

  if (!conversation) {
    return res.status(200).json([]);
  }

  const messages = conversation.messages;
  res.status(200).json(messages);
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
}

}
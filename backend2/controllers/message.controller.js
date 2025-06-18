import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import Group from "../models/group.model.js";
import GroupConversation from "../models/GroupConversation.js";

// export const sendMessage = async (req,res) => {
//      try{
//           const {message}=req.body;
//           const {id:receiverId}=req.params;
//           const senderId=req.user._id;

//          let conversation= await Conversation.findOne({
//           participants:{ $all : [senderId,receiverId]} //it will return all conversation b/w this this sender and receiver id;
//          })

//          if(!conversation){
//                conversation=await Conversation.create({
//                     participants:[senderId,receiverId]
//                })
//          }

//          const newmessage=new Message({
//                senderId,
//                receiverId,
//                message
//          })

//          if(newmessage){
//           conversation.messages.push(newmessage.id);
//          }

//      //this both run in parallel
//      await Promise.all([conversation.save(),newmessage.save()]);

//      // login for socket.io
//      const receiverSocketId = getReceiverSocketId(receiverId);
//       if(receiverSocketId){
//         // Emit the message to the specific receiver
//         io.to(receiverSocketId).emit('newMessage', newmessage);
//       }

//          res.status(201).json(newmessage);

//      }catch(err){
//          console.log("error in sendMessage",err.message);
//          res.status(500).json({err:"internal in message server error"})
//      }
// };

export const getMessage = async (req, res) => {
  const { id: userToChatId } = req.params;
  const senderId = req.user.id;
  
  try {

    const isgroupChat = await Group.findById(userToChatId);

    let conversation;
    if (isgroupChat) {
      conversation = await GroupConversation.findOne({
        groupId: userToChatId,
      }).populate("messages");
    }else{
       conversation = await Conversation.findOne({
      participants: { $all: [senderId,userToChatId] },
    }).populate("messages");
    }
   
    if (!conversation) {
      return res.status(200).json([]);
    }

    const messages = conversation.messages;


    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const groupcreatechat = async (req, res) => {
  try {
    const { name, description, avatar, members, isPrivate } = req.body;
    console.log("members:", members);

    if (!name || !Array.isArray(members) || members.length === 0) {
      return res
        .status(400)
        .json({ error: "Group name and members are required." });
    }

    const member = members.map((value) => ({
      user: value,
      role: "member",
    }));

    member.push({
      user: req.user._id,
      role: "admin",
    });

    const newGroup = new Group({
      name,
      description: description,
      avatar: avatar || "",
      isPrivate: !!isPrivate,
      createdBy: req.user._id,
      members: member,
    });

    const savedGroup = await newGroup.save();

    const populatedGroup = await Group.findById(savedGroup._id)
      .populate("members.user", "username email avatar isOnline")
      .populate("createdBy", "username email avatar");

    res.status(201).json(populatedGroup);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const groupgetchat = async (req, res) => {
  try {
    const groups = await Group.find({
      "members.user": req.user._id,
    })
      .populate("members.user", "fullName avatar description")
      .populate("createdBy", "username email avatar")
      .sort({ updatedAt: -1 });

    res.status(200).json(groups);
  } catch (error) {
    console.error("Error fetching group chats:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const groupgetchatbyid = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate("members.user", "username email avatar isOnline")
      .populate("createdBy", "username email avatar");

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    // Check if user is member
    const isMember = group.members.some(
      (member) => member.user._id.toString() === req.user.userId
    );

    if (!isMember) {
      return res.status(403).json({ error: "Access denied" });
    }

    res.json(group);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const groupaddmember = async (req, res) => {
  try {
    const { userId } = req.body;
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    // Check if user is admin
    const userMember = group.members.find(
      (member) => member.user.toString() === req.user.userId
    );

    if (!userMember || userMember.role !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }

    // Check if user is already a member
    const isAlreadyMember = group.members.some(
      (member) => member.user.toString() === userId
    );

    if (isAlreadyMember) {
      return res.status(400).json({ error: "User is already a member" });
    }

    group.members.push({ user: userId, role: "member" });
    await group.save();
    await group.populate("members.user", "username email avatar isOnline");

    res.json(group);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const groupgetmessages = async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    // Check if user is member
    const isMember = group.members.some(
      (member) => member.user.toString() === req.user.userId
    );

    if (!isMember) {
      return res.status(403).json({ error: "Access denied" });
    }

    const messages = await Message.find({ group: req.params.id })
      .populate("sender", "username email avatar")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    res.json(messages.reverse());
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

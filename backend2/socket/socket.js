//     //io.emit is used to send message to all connected clients
//     //socket.emit is used to send message to only the connected client
//     //socket.broadcast.emit is used to send message to all connected clients except the one who sent the message
//     //socket.to(socketId).emit is used to send message to only the client with the socketId
//     //io.to(groupId).emit is used to send message to all clients in the room
//     //socket.broadcast.to(groupId).emit is used to send message to all clients in the room except the one who sent the message
//     //socket.join(groupId) is used to make the client join the room
//     //socket.leave(groupId) is used to make the client leave the room
//     //io.of(namespace).emit is used to send message to all connected clients in the namespace
//     //socket.join(namespace) is used to make the client join the namespace
//     //socket.leave(namespace) is used to make the client leave the namespace
//     //socket.disconnect() is used to disconnect the client
//     //socket.rooms is used to get the list of rooms the client has joined

// import { Server } from "socket.io";
// import http from "http";
// import express from "express";

// const app = express();

// const server = http.createServer(app);
// const io = new Server(server, {
// 	cors: {
// 		origin: ["http://localhost:5173"],
// 		methods: ["GET", "POST"],
//         credentials: 'include'
// 	},
// });

// export const getReceiverSocketId = (receiverId) => {
// 	return userSocketMap[receiverId];
// };

// const userSocketMap = {}; // {userId: socketId}

// io.on("connection", (socket) => {

// 	const userId = socket.handshake.query.userId;
// 	if (userId != "undefined") userSocketMap[userId] = socket.id;

// 	// io.emit() is used to send events to all the connected clients
// 	io.emit("getOnlineUsers", Object.keys(userSocketMap));

// 	// socket.on() is used to listen to the events. can be used both on client and server side
// 	socket.on("disconnect", () => {
// 		// console.log("user disconnected", socket.id);
// 		delete userSocketMap[userId];
// 		io.emit("getOnlineUsers", Object.keys(userSocketMap));
// 	});
// });

// export { app, server,io };

import { Server } from "socket.io";
import http from "http";
import express from "express";
import GroupMessage from "../models/group.message.model.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import GroupConversation from "../models/GroupConversation.js";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: "include",
  },
});

// Maps for tracking users and groups
const userSocketMap = {}; // {userId: socketId}
const userRoomMap = {}; // {userId: [roomIds]}
const roomUserMap = {}; // {groupId: [userIds]}

// Helper functions
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

export const getUsersInRoom = (groupId) => {
  return roomUserMap[groupId] || [];
};

export const getUserRooms = (userId) => {
  return userRoomMap[userId] || [];
};

// Utility functions
const addUserToRoom = (userId, groupId) => {
  // Add room to user's room list
  if (!userRoomMap[userId]) {
    userRoomMap[userId] = [];
  }
  if (!userRoomMap[userId].includes(groupId)) {
    userRoomMap[userId].push(groupId);
  }

  // Add user to room's user list
  if (!roomUserMap[groupId]) {
    roomUserMap[groupId] = [];
  }
  if (!roomUserMap[groupId].includes(userId)) {
    roomUserMap[groupId].push(userId);
  }
};

const removeUserFromRoom = (userId, groupId) => {
  // Remove room from user's room list
  if (userRoomMap[userId]) {
    userRoomMap[userId] = userRoomMap[userId].filter((id) => id !== groupId);
    if (userRoomMap[userId].length === 0) {
      delete userRoomMap[userId];
    }
  }

  // Remove user from room's user list
  if (roomUserMap[groupId]) {
    roomUserMap[groupId] = roomUserMap[groupId].filter((id) => id !== userId);
    if (roomUserMap[groupId].length === 0) {
      delete roomUserMap[groupId];
    }
  }
};

const removeUserFromAllRooms = (userId) => {
  const userRooms = userRoomMap[userId] || [];
  userRooms.forEach((groupId) => {
    removeUserFromRoom(userId, groupId);
  });
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;

    // Emit updated online users list
    io.emit("getOnlineUser", Object.keys(userSocketMap));

    // console.log(`User ${userId} connected with socket ${socket.id}`);
  }

  // ============ PERSONAL CHAT EVENTS =============

  // Handle private messages`
  socket.on("sendPrivateMessage", async (data) => {
    const { receiverId, message, senderId } = data;
    // console.log("receiverID", receiverId , senderId);

    const receiverSocketId = getReceiverSocketId(receiverId);

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }, //it will return all conversation b/w this this sender and receiver id;
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newmessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newmessage) {
      conversation.messages.push(newmessage.id);
    }

    //this both run in parallel
    await Promise.all([conversation.save(), newmessage.save()]);

    socket.emit("receivePrivateMessage", newmessage); // for the sender

    if (receiverSocketId) {
      // Send to specific user
      io.to(receiverSocketId).emit("receivePrivateMessage", newmessage);
  
    }
  });

  // ============ GROUP CHAT EVENTS ============

  // Join a group/room
  socket.on("joinRoom", (data) => {
    const { groupId, userId } = data;

    if (!groupId || !userId) return;

    // Join the socket room
    socket.join(groupId);

    // Update tracking maps
    addUserToRoom(userId, groupId);

    // Notify others in the room
    socket.to(groupId).emit("userJoinedRoom", {
      userId,
      groupId,
      message: `${userId} joined the room`,
      timestamp: new Date(),
    });

    // Send current room members to the joining user
    socket.emit("roomMembers", {
      groupId,
      members: getUsersInRoom(groupId),
    });

    console.log(`User ${userId} joined room ${groupId}`);
  });

  // Leave a group/room
  socket.on("leaveRoom", (data) => {
    const { groupId, userId } = data;

    if (!groupId || !userId) return;

    // Leave the socket room
    socket.leave(groupId);

    // Update tracking maps
    removeUserFromRoom(userId, groupId);

    // Notify others in the room
    socket.to(groupId).emit("userLeftRoom", {
      userId,
      groupId,
      message: `${userId} left the room`,
      timestamp: new Date(),
    });

    console.log(`User ${userId} left room ${groupId}`);
  });

  // Send message to group/room
  socket.on("sendGroupMessage", async (data) => {
    const { groupId, message, senderId } = data;

    if (!groupId || !message || !senderId) return;

    let conversation = await GroupConversation.findOne({ groupId });

    if (!conversation) {
      conversation = await GroupConversation.create({
        groupId,
        participants: [senderId], // Initialize with the sender
        messages: [],
      });
    }

    const newmessage = new GroupMessage({
      senderId,
      groupId,
      message,
    });

    if (newmessage) {
      conversation.messages.push(newmessage.id);
    }

    //this both run in parallel
    await Promise.all([conversation.save(), newmessage.save()]);

    io.to(groupId).emit("receiveGroupMessage", newmessage);
  });

  // Get room members
  socket.on("getRoomMembers", (data) => {
    const { groupId } = data;

    if (!groupId) return;

    socket.emit("roomMembers", {
      groupId,
      members: getUsersInRoom(groupId),
    });
  });

  // Create a new room
  socket.on("createRoom", (data) => {
    const { groupId, roomName, creatorId } = data;

    if (!groupId || !creatorId) return;

    // Join the creator to the room
    socket.join(groupId);
    addUserToRoom(creatorId, groupId);

    // Emit room created event
    socket.emit("roomCreated", {
      groupId,
      roomName: roomName || groupId,
      creatorId,
      members: [creatorId],
      timestamp: new Date(),
    });

    console.log(`Room ${groupId} created by ${creatorId}`);
  });

  // Invite user to room
  socket.on("inviteToRoom", (data) => {
    const { groupId, invitedUserId, inviterId } = data;

    if (!groupId || !invitedUserId || !inviterId) return;

    const invitedUserSocketId = getReceiverSocketId(invitedUserId);

    if (invitedUserSocketId) {
      io.to(invitedUserSocketId).emit("roomInvitation", {
        groupId,
        inviterId,
        timestamp: new Date(),
      });
    }

    console.log(
      `User ${invitedUserId} invited to room ${groupId} by ${inviterId}`
    );
  });

  // Handle typing indicators for rooms
  socket.on("typing", (data) => {
    const { groupId, userId, isTyping } = data;

    if (!groupId || !userId) return;

    socket.to(groupId).emit("userTyping", {
      groupId,
      userId,
      isTyping,
      timestamp: new Date(),
    });
  });

  // ============ CONNECTION MANAGEMENT ============

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    if (userId && userId !== "undefined") {
      // Remove user from all rooms
      removeUserFromAllRooms(userId);

      // Remove from user socket map
      delete userSocketMap[userId];

      // Emit updated online users list
      io.emit("getOnlineUsers", Object.keys(userSocketMap));

      console.log(`User ${userId} disconnected`);
    }
  });

  // Handle reconnection
  socket.on("rejoinRooms", (data) => {
    const { userId, roomIds } = data;

    if (!userId || !roomIds || !Array.isArray(roomIds)) return;

    roomIds.forEach((groupId) => {
      socket.join(groupId);
      addUserToRoom(userId, groupId);

      // Notify others in the room about rejoin
      socket.to(groupId).emit("userRejoinedRoom", {
        userId,
        groupId,
        timestamp: new Date(),
      });
    });

    console.log(`User ${userId} rejoined rooms:`, roomIds);
  });
});

export { app, server, io };


//     //io.emit is used to send message to all connected clients
//     //socket.emit is used to send message to only the connected client
//     //socket.broadcast.emit is used to send message to all connected clients except the one who sent the message
//     //socket.to(socketId).emit is used to send message to only the client with the socketId
//     //io.to(roomId).emit is used to send message to all clients in the room
//     //socket.broadcast.to(roomId).emit is used to send message to all clients in the room except the one who sent the message
//     //socket.join(roomId) is used to make the client join the room
//     //socket.leave(roomId) is used to make the client leave the room
//     //io.of(namespace).emit is used to send message to all connected clients in the namespace
//     //socket.join(namespace) is used to make the client join the namespace
//     //socket.leave(namespace) is used to make the client leave the namespace
//     //socket.disconnect() is used to disconnect the client
//     //socket.rooms is used to get the list of rooms the client has joined


import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:5173"],
		methods: ["GET", "POST"],
        credentials: 'include'
	},
});

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {

	const userId = socket.handshake.query.userId;
	if (userId != "undefined") userSocketMap[userId] = socket.id;

	// io.emit() is used to send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	// socket.on() is used to listen to the events. can be used both on client and server side
	socket.on("disconnect", () => {
		// console.log("user disconnected", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, server,io };
import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import connectMongo from "./database/connect_mongo.js";
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.routes.js';
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import { server,app } from "./socket/socket.js"; 

dotenv.config();
const port = process.env.PORT || 3000;

// CORS configuration 
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your actual frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Include OPTIONS for preflight requests
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true 
};

app.use(cors(corsOptions)); 
app.use(express.json());
app.use(cookieParser());

// Define Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Connect to MongoDB
connectMongo();

// Use httpserver.listen() to start the server with both Express and Socket.IO
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
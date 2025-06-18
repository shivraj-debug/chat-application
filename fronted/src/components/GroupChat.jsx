// import { useState, useEffect, useRef } from "react";
// import { useAuthContext } from "../context/AuthContext";
// import { useSocketContext } from "../context/useSocketContext";
// import useConversation from "../zustand/useConversation";

// function GroupChat() {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");

//   // const url = import.meta.env.VITE_URL || "http://localhost:3000";
//   const { authuser } = useAuthContext();
//   const { socket } = useSocketContext();
//   const { selectedConversation } = useConversation();
//   const messagesEndRef = useRef(null);

//   const currentUser = {
//     id: authuser?._id,
//     name: authuser?.fullName || "Anonymous",
//   };

//   useEffect(() => {
//     if (selectedConversation) {
//       fetchMessages(selectedConversation._id);
//       socket.emit("joinRoom", {
//         groupId: selectedConversation._id,
//         userId: currentUser.id,
//       });
//     }
//   }, [selectedConversation]);

//   useEffect(() => {
//     if (!socket) return;
//     socket.on("newGroupMessage", (data) => {
//       if (data.groupId === selectedConversation?._id) {
//         setMessages((prev) => [...prev, data]);
//       }
//     });

//     return () => {
//       socket.off("newGroupMessage");
//     };
//   }, [selectedConversation]);

//   const fetchMessages = async (groupId) => {
//     const res = await fetch(`/api/groups/${groupId}/messages`, {
//       method: "GET",
//       credentials: "include",
//     });
//     setMessages(res.data);
//   };

//   const handleSendMessage = () => {
//     if (!message.trim()) return;

//     socket.emit("sendGroupMessage", {
//       roomId: selectedConversation._id,
//       message,
//       senderId: currentUser.id,
//       senderName: currentUser.name,
//     });

//     setMessage("");
//   };

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return <div>

//   </div>;
// }

// export default GroupChat;

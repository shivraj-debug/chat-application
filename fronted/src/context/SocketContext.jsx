import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import PropTypes from "prop-types";
import { useAuthContext } from "./AuthContext";
import useConversation from "../zustand/useConversation";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authuser } = useAuthContext();
  const [activePage, setActivePage] = useState("messenger");

  const { selectedConversation } = useConversation();
  const url = import.meta.env.VITE_URL;

  // Socket connect / disconnect
  useEffect(() => {
    if (!authuser) return;

    const newSocket = io(url, {
      query: { userId: authuser._id },
      // withCredentials: true,
    });

    setSocket(newSocket);

    newSocket.on("getOnlineUsers", (data) => {
      setOnlineUsers((prev) => {
        if (!prev.includes(data.userId)) {
          return [...prev, data.userId];
        }
        return prev;
      });
    });

    newSocket.on("user_offline", (data) => {
      setOnlineUsers((prev) => prev.filter((id) => id !== data.userId));
    });

    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, [authuser, url]);

  // Join/leave group room when selectedConversation changes
  useEffect(() => {
    if (!socket || !authuser || !selectedConversation?._id) return;

    const groupId = selectedConversation._id;

    socket.emit("joinRoom", {
      groupId,
      userId: authuser._id,
    });

    return () => {
      socket.emit("leaveRoom", {
        groupId,
        userId: authuser._id,
      });
    };
  }, [socket, authuser, selectedConversation]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, activePage, setActivePage }}>
      {children}
    </SocketContext.Provider>
  );
};

SocketContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

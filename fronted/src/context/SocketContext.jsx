import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import PropTypes from "prop-types";
import { useAuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authuser } = useAuthContext();

  useEffect(() => {
    if (authuser) {
      const socket = io("http://localhost:3000", {
        query: { userId: authuser._id }, //Replace with your logic for user ID
        // transports: ["websocket"], // Force WebSocket transport
      });
      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.close();
      };
    } else {
             if(socket) {
             socket.close();
             setSocket(null);
           }
    }
  }, [authuser]);


  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

SocketContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

import { BiSolidSend } from "react-icons/bi";
// import useSendMeassge from "../../hooks/useSendMessage";
import { useState, useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/useSocketContext";
import { useAuthContext } from "../../context/AuthContext";

function MessageInput() {
  const [message, setMessage] = useState("");
  // const { loading, sendMessage } = useSendMeassge();
  const { socket } = useSocketContext();

  // for implement of detect typing
  // const [isTyping,setIsTyping]=useState(false);
  // const [typingUser, setTypingUser] = useState('');

  const { selectedConversation, setMessages } = useConversation();
  const { authuser } = useAuthContext();

  useEffect(() => {
    if (!socket) return;

    socket.on("receivePrivateMessage", (data) => {
      // setMessages([...messages, newMessage]);
       console.log("Received group message:", data);
     
      setMessages((prev) => [...prev, data]);
      return;
    });

    return () => {
      socket.off("receivePrivateMessage");
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("receiveGroupMessage", (data) => {
      console.log("Received group message:", data);
      setMessages((prev) => [...prev, data]);
      
      return
    });

    return () => {
      socket.off("receiveGroupMessage");
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const isGroupChat = selectedConversation?.members?.length > 0;

    const payload = {
      message: message,
      senderId: authuser._id,
    };

    if (isGroupChat) {
      socket.emit("sendGroupMessage", {
        ...payload,
        groupId: selectedConversation._id,
      });
    } else {
      socket.emit("sendPrivateMessage", {
        ...payload,
        receiverId: selectedConversation._id,
      });
    }
    // setMessages((prevMessages) => [...prevMessages, message]);
    // const newMessageObj = {
    //   ...payload,
    //   receiverId: selectedConversation._id,
    //   createdAt: new Date().toISOString(),
    // };
    // setMessages((prev) => [...prev, newMessageObj]);
    setMessage("");
  };

  return (
    <div className="w-full p-3 bg-gray-800 border-t border-gray-700">
      <form className="px-6 flex my-3 mb-0 w-full" onSubmit={handleSubmit}>
        <div className="w-full relative">
          <input
            type="text"
            placeholder="type your message"
            className="border text-sm rounded-lg block min-w-full md:px-4 md:-mx-2 p-3 bg-gray-700 border-gray-600 text-white "
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            // onKeyDown={(e) => {
            //   if (e.key === "Enter") handleSubmit();
            // }}
          />
          <button
            type="submit"
            className="absolute inset-y-0  end-2 flex items-center pe-3"
          >
            {/* {loading ? (
              <div className="loading loading-spinner"></div>
            ) : (
              <BiSolidSend />
            )} */}
            <BiSolidSend />
          </button>
        </div>
        <div className="">
          <img
            src="/upload.png"
            alt="emoji"
            className="w-7  invert h-7 cursor-pointer ml-2 mt-2 "
          />
        </div>
      </form>
    </div>
  );
}

export default MessageInput;

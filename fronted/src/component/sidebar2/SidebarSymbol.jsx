import { useState } from 'react';
import { FaComment, FaPhone,FaCog } from 'react-icons/fa';
import { HiOutlineStatusOnline } from "react-icons/hi";
import { LuArchiveRestore } from "react-icons/lu";
import { SiChatbot } from "react-icons/si";
import MessageContainer from "../messages/MessageContainer.jsx"
import Call from  "../icon/Call.jsx"

const SidebarSymbol = () => {
  const [notifications, setNotifications] = useState({
    messages: 2,
    items: 2
  });
  const [activepage,setActivePage]=useState("messenger")

  const render=()=>{
    if(activepage=="messenger") return <MessageContainer/>
    if(activepage=="call") return <Call/>
  }

  return (
    <div className="flex gap-4 flex-col  bg-gray-800 text-white w-16 h-full p-4">
      {/* Chat Icon with Badge */}
      <div className="relative mb-4 mt-8 cursor-pointer">
        <button onClick={setActivePage("messenger")}>
        <FaComment className="text-3xl " />
        </button>
        {notifications.messages > 0 && (
          <span className="absolute top-0 right-0 bg-green-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
            {notifications.messages}
          </span>
        )}
      </div>

      {/* Phone Icon */}
      <div className="mb-4 cursor-pointer">
        <FaPhone className="text-3xl" />
      </div>

      
      <div className="mb-4 cursor-pointer">
        <LuArchiveRestore className="text-3xl" />
      </div>

      {/* Favorite Icon */}
      <div className="mb-4 cursor-pointer">
      <HiOutlineStatusOnline className='text-3xl' />
        {notifications.items > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
            {notifications.items}
          </span>
        )}
      </div>

      {/* Bottom Circle Button */}
      <div className=" cursor-pointer">
      <SiChatbot className="text-3xl" />
      </div>


      {/* Settings Icon */}
      <div className="mt-auto mb-4 cursor-pointer">
        <FaCog className="text-3xl" />
      </div>
    </div>
  );
};

export default SidebarSymbol;
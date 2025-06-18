import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import { Video, Search } from "lucide-react";
import { PhoneCall } from "lucide-react";
import { useState } from "react";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [isZoomed, setIsZoomed] = useState(false);
  const { authuser } = useAuthContext();
  const profile = selectedConversation?.senderId === authuser._id;

  useEffect(() => {
    // cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className=" w-full flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-500 h-18  flex px-4 py-2 mb-2">
            {/* <span className='label-text'>To:</span>{" "} */}
            <div className="flex items-center gap-1 relative ">
              <img
                src={
                  profile
                    ? authuser.profilePic
                    : selectedConversation.profilePic
                }
                alt="User Avatar"
                onClick={toggleZoom}
                className="w-12 h-12 rounded-full cursor-pointer border-2 border-white shadow-md hover:scale-105 transition duration-200"
              />
              {/* Backdrop when zoomed */}
              {/* Zoom Modal */}
              {isZoomed && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center"
                  onClick={toggleZoom}
                >
                  <img
                    src={
                      profile
                        ? authuser.profilePic
                        : selectedConversation.profilePic
                    }
                    alt="Zoomed Avatar"
                    className="w-72 h-72 md:w-96 md:h-96 rounded-full object-cover border-4 border-white shadow-2xl transform transition-transform duration-300"
                    onClick={(e) => e.stopPropagation()} // prevent closing when clicking on the image
                  />
                </div>
              )}

              <div className="text-gray-900  ml-2 mt-1 font-bold text-xl">
                <div>
                  {selectedConversation.fullName || selectedConversation.name}
                </div>
                <div className="-mt-1">
                  {selectedConversation.members &&
                    selectedConversation.members.map((member) => (
                      <span key={member._id} className="text-sm text-gray-900">
                        {member.user.fullName + ","}
                      </span>
                    ))}
                </div>
              </div>
            </div>
            <div className="flex items-center mr-5 gap-2 ml-auto">
              <button className="btn btn-ghost btn-md">
                <Video className="text-gray-800" />
              </button>
              <button className="btn btn-ghost btn-md">
                <PhoneCall className="text-gray-800" />
              </button>
              <button className="btn btn-ghost btn-md">
                <Search className="text-gray-800" />
              </button>
            </div>
          </div>
          <Messages/>
          <MessageInput/>
        </>
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  const { authuser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authuser.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

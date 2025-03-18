import { BiSolidSend } from "react-icons/bi"
import useSendMeassge from "../../hooks/useSendMessage" 
import { useState } from "react"
// import useConversation from "../../zustand/useConversation";

function MessageInput() {

  const [message,setMessage]=useState("");
  const {loading,sendMessage}=useSendMeassge();
  
  // // // for implement of detect typing
  // const [isTyping,setIsTyping]=useState(false);
  // const [typingUser, setTypingUser] = useState('');

  // const {selectedConversation} = useConversation();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!message){
        return;
    }
    await sendMessage(message);
    setMessage("");
  }

  return (
    <form className="px-6 my-3 w-full" onSubmit={handleSubmit} > 
        <div className="w-full relative">
            <input 
            type="text"
            placeholder="type your message"
            className="border text-sm rounded-lg block min-w-full md:px-4 md:-mx-2 p-3 bg-gray-700 border-gray-600 text-white "
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            />
            <button type="submit" className="absolute inset-y-0  end-2 flex items-center pe-3" >
                {loading ? <div className="loading loading-spinner"></div>:<BiSolidSend/>}
            </button>
        </div>
    </form>
  )
}

export default MessageInput

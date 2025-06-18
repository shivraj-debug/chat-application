import { useSocketContext } from '../../context/useSocketContext';
import useConversation from '../../zustand/useConversation';
import propTypes from 'prop-types';

const Conversation=({conversation,lastIdx}) =>{

    const {selectedConversation,setSelectedConversation} = useConversation();
  
    const isSelected=selectedConversation?._id === conversation._id;

    const {onlineUsers} = useSocketContext();

    const isOnline=onlineUsers.includes(conversation._id); 

  return (
   <>
   <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelected ? "bg-sky-500" : ""}`} 
    onClick={()=>setSelectedConversation(conversation)}
   >

    <div className={`avatar ${isOnline} ? "online" : ""`}>
        <div className='w-12 rounded-full'>
            <img src={conversation.profilePic} alt="user avatar"/>
        </div>
    </div>

    <div className='flex flex-col flex-1'>
    <div className='flex justify-center gap-7'>
        <p className='font-bold text-lg text-gray-200'>{conversation.fullName || conversation.name}</p>
        {/* <span className='text-xl'>{emoji}</span> */}
    </div>
    </div>
   </div>

    {!lastIdx && <div className='divider my-0 py-0 h-1'/>  }
   </>
  )
}

Conversation.propTypes={
    conversation:propTypes.object.isRequired,
    lastIdx:propTypes.bool.isRequired,
    // emoji:propTypes.string.isRequired,
}

export default Conversation;

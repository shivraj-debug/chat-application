// // import React from 'react'
// import useConversation from "../../zustand/useConversation";
// import { useAuthContext } from "../../context/Authcontext";
// import propTypes from "prop-types";
// import { extractTime } from "../../utils/extractTime";

// function Message({message}) {

//   const {authuser}=useAuthContext();
//   const {selectedConversation}=useConversation();
//   const fromMe = message.senderId===authuser._id;
//   const formattedTime = extractTime(message.createdAt);
//   const chatClassNames = fromMe ? "chat end" : "chat start";
//   const profilePic=fromMe ? authuser.profilePic : selectedConversation?.profilePic;
//   const backColor=fromMe ? "bg-blue-500" : "bg-gray-500";
//   const shakeClass=message.shouldShake ? "shake" : "";


//   return(
//     // <div className="chat chat-start">
// //   <div className="chat-image avatar">
// //     <div className="w-10 rounded-full">
// //       <img
// //         alt="Tailwind CSS chat bubble component"
// //         src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
// //     </div>
// //   </div>
// //   <div className="chat-header">
// //     Obi-Wan Kenobi
// //     <time className="text-xs opacity-50">12:45</time>
// //   </div>
// //   <div className="chat-bubble">You were the Chosen One!</div>
// //   <div className="chat-footer opacity-50">Delivered</div>
// // </div>
// <div className={`chat ${chatClassNames}`}>
//   <div className="chat-image avatar">
//     <div className="w-10 rounded-full">
//       {/* <img
//         alt="Tailwind CSS chat bubble component"
//         src={"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} /> */}

//         <img src={profilePic}
//          alt="Tailwind CSS chat bubble component"
//          />
//     </div>
//   </div>
//   {/* <div className="chat-header">
//     Anakin
//     <time className="text-xs opacity-50">12:46</time>
//   </div> */}
//   <div className={`chat-bubble text-white  pb-2  ${shakeClass} ${backColor}`}>{message.message}</div>
//   <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">{formattedTime}</div>
// </div>
//   )
// }

// Message.propTypes={
//   message:propTypes.object.isRequired
// }

// export default Message;


import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import propTypes from "prop-types";

const Message = ({ message }) => {
	const { authuser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authuser._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? authuser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-12 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};

Message.propTypes={
    message:propTypes.object.isRequired
  }
  
export default Message;
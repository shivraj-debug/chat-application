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
				<div className='w-10 rounded-full relative'>
					<img alt='user profile' src={profilePic} />
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
// import {useEffect} from 'react';
// import {useSocketContext} from '../context/useSocketContext';
// import useConversation from '../zustand/useConversation';
// import notificationSound from '../assets/sounds/notification.ogg';  // Import the notification sound

// // const useListenMessage = () => {
// //     const {socket} = useSocketContext();
// //     const {messages,setMessages} = useConversation();

// //     useEffect(()=>{
// //         if(socket){
// //             socket.on('newMessage',(newMessage)=>{
// //                 newMessage.shouldShare=true;
// //                 const sound=new Audio(notificationSound);
// //                 sound.play();
// //                 setMessages([...messages,newMessage]);
// //             });
// //         }
        
// //         return () => {
// //             if(socket){
// //                 socket.off('newMessage');
// //             }
// //         }
// //     },[socket,setMessages,messages]);

// // }

// export default useListenMessage;
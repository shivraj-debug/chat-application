import {useEffect} from 'react';
import {useSocketContext} from '../context/useSocketContext';
import useConversation from '../zustand/useConversation';
import notificationSound from '../assets/sounds/notification.ogg';  // Import the notification sound

const useListenMessage = () => {
    const {socket} = useSocketContext();
    const {messages,setMessages} = useConversation();

    useEffect(()=>{
        if(socket){
            socket.on('newMessage',(newMessage)=>{
                console.log("sound on")
                newMessage.shouldShare=true;
                const sound=new Audio(notificationSound);
                console.log("sound on")
                sound.play();
                console.log("sound on")
                setMessages([...messages,newMessage]);
            });
        }

        return () => {
            if(socket){
                socket.off('newMessage');
            }
        }
    },[socket,setMessages,messages]);

}

export default useListenMessage;
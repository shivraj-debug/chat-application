import { useState ,useEffect} from "react";
import useConversation from "../zustand/useConversation";
import { toast } from "react-hot-toast"; 

const useGetMessage=()=>{
    const [loading, setLoading] = useState(true);
    const {messages,setMessages,selectedConversation}=useConversation();

    useEffect(()=>{
        const getMessages=async()=>{
            setLoading(true);
            try{
                const res=await fetch(`http://localhost:3000/api/messages/${selectedConversation._id}`,{
                    method:"GET",
                    // mode: 'no-cors', // no-cors, cors, *same-origin
                    credentials: 'include',
                });

                const data=await res.json();

                if(data.error){
                    throw new Error(data.error);
                }

                setMessages(data);

            }catch(err){
                toast.error(err.message);
            }finally{
                setLoading(false);
            }
        }
         if(selectedConversation?._id) getMessages();
    },[selectedConversation?._id,setMessages]);

    return {loading,messages};
}

export default useGetMessage;
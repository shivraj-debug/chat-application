import { useState,useEffect } from 'react'
import toast from 'react-hot-toast';

function useGetConversation() {
      const [loading,setLoading]=useState(null);
      const [conversations,setConversations]=useState([]);

      useEffect(()=> {
          const getConversations = async () => {
                setLoading(true);
                try{
                    const res=await fetch("http://localhost:3000/api/users",{
                        method: 'GET',
                        credentials: 'include', // Include cookies in the request
                    });

                    const data=await res.json();
                    if(data.error){
                        throw new Error(data.error);
                    }
                    setConversations(data);

                }catch(error){
                        toast.error(error.message);
                        
                }finally{
                    setLoading(false);
                }
          }
          getConversations();
      },[])

      return {loading,conversations};
}

export default useGetConversation;

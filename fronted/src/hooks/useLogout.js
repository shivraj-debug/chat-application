// import React from 'react'
import {useState} from 'react'
import {useAuthContext} from "../context/AuthContext.jsx"
import toast from "react-hot-toast"

function useLogout() {

    const [loading,setLoading]=useState(false)
    const {setAuthUser} =useAuthContext();
    
    const logout=async () =>{
        setLoading(true)

        try{
            const res=await fetch('http://localhost:3000/api/auth/logout',{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                credentials: 'include',
            })

            const data=await res.json();

            if(data.error){
                throw new Error(res.error);
            }
            localStorage.removeItem('chat-user');
            setAuthUser(null);
            toast.success(data.message)
            
        }catch(err){
            toast.error(err.message,'something wrong in logout')
        }finally{
            setLoading(false)
        }
    }

    return {logout,loading}
}

export default useLogout

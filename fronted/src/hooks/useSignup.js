import { useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { useAuthContext } from "../context/Authcontext";

function useSignup() {
    const [loading,setLoading]=useState(false);
    // const {setAuthUser}=useAuthContext();
    const navigate=useNavigate();

    const signup = async ({fullName,username,password,confirmPassword,gender})=>{
        const success=handleInputError({fullName,username,password,confirmPassword,gender});
        if(!success){
            return ;
        }
        setLoading(true);
        try{
          const res = await fetch("http://localhost:3000/api/auth/signup",{
                method:"POST",
                headers:{"content-Type":"application/json"},
                body:JSON.stringify({fullName,username,password,confirmPassword,gender}),
                credentials: 'include', // Ensures cookies are sent along with the request
          })

          const data = await res.json();

          if(data.error){
            throw new Error(data.error);
          }else{
            toast.success("signup success");
            navigate("/login");
          }
            //local storage
        // localStorage.setItem("chat-use-signup",JSON.stringify(data)); 
        console.log(data);

        // setAuthUser(data); //set the user in context

        }catch(err){
            toast.error(err.message)
        }finally{
            setLoading(false);
        }

    }
    return {loading , signup}
};

export default useSignup;

function handleInputError({fullName,username,password,confirmPassword,gender}){
    if(!fullName || !username || !password || !confirmPassword || !gender){
        toast.error("fill all the fields")
        return false;
    }

    if(password != confirmPassword){
        toast.error("password do not match client side");
        return false;
    }

    if(password.length < 6){
        toast.error("password must be a atleast 6 character");
        return false;
    }

    return true;
}

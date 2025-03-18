import { createContext ,useContext,useState } from "react";
import { PropTypes } from 'prop-types'; 

export  const AuthContext=createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext= () => {
    return useContext(AuthContext);
}

export const AuthContextProvider=({ children })=>{
        const [authuser,setAuthUser]=useState(JSON.parse(localStorage.getItem("chat-user")) || null);

        return <AuthContext.Provider value={{authuser,setAuthUser}}>

            {children}

        </AuthContext.Provider>;
}
AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}


import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

function useLogin() {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async (username, password) => {
        const success = handleInputError(username , password);
        if (!success) return;  // Return early if there's an input error.

        setLoading(true);

        try {
            const res = await fetch("http://localhost:3000/api/auth/login",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                },
                credentials: 'include', // Include cookies or authorization headers
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();
            if (data.error) {
                // If the backend returns an error
                throw new Error(data.error);
            }

            // Successful login
            localStorage.setItem('chat-user', JSON.stringify(data));
            setAuthUser(data);
            toast.success('Login successful!');
        } catch (err) {
            // Catch any errors and show them via toast
            console.error("Login error:", err);  // Log error for debugging
            toast.error(`Login failed: ${err.message}`);
        } finally {
            // Ensure loading state is always updated
            setLoading(false);
        }
    };

    return { login, loading };
}

export default useLogin;

// Helper function to check if input is valid
function handleInputError(username, password) {
    if (!username || !password) {
        toast.error("Please fill in both username and password.");
        return false;
    }
    return true;
}

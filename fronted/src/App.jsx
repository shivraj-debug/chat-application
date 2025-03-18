import Home from "./pages/home/Home.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/signup/Signup.jsx";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext.jsx";

function App() {
    const { authuser } = useAuthContext();

    return (
        <div className="p-4 h-screen  flex items-center justify-center">
            <Toaster />
            <Routes>
                {/* Home Route: Authenticated users go to Home, otherwise to Login */}
                <Route path="/" element={authuser ? <Home /> : <Navigate to="/login" />} />

                {/* Login Route: If authenticated, redirect to Home, otherwise show Login */}
                <Route path="/login" element={authuser ? <Navigate to="/" /> : <Login />} />

                {/* Signup Route: If authenticated, redirect to login, otherwise show Signup */}
                <Route path="/signup" element={<Signup/>} />
                        
            </Routes>
        </div>
    );
}

export default App;

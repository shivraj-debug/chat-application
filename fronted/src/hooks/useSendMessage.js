import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import {useState} from "react";

const useSendMeassge = () => {
    const [loading, setLoading] = useState(false);
    const {messages, setMessages,selectedConversation} = useConversation();

    const sendMessage = async (message) => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3000/api/messages/send/${selectedConversation._id}`, {
                method: "POST",
                headers: {"content-Type": "application/json"},
                body: JSON.stringify({message}),
                credentials: 'include',
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setMessages([...messages, data]);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    return {loading, sendMessage};
}

export default useSendMeassge;
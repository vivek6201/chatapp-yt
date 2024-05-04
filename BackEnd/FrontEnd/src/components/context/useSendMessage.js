import React, { useState } from "react";
import useConversation from "../../zustand/useConversation";
import axios from "axios";
const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async(message) => {
        setLoading(true);
        try {
            const { data } = await axios.post(
                `/api/message/send/${selectedConversation._id}`, {
                    message,
                }
            );
            setLoading(false);
            setMessages([...messages, data]);
        } catch (error) {
            setLoading(false);
        }
    };
    return { sendMessage, loading };
};

export default useSendMessage;
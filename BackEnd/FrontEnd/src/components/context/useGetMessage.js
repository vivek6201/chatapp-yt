import React, { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import axios from "axios";

const useGetMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    useEffect(() => {
        const getMessages = async() => {
            setLoading(true);
            await axios
                .get(`/api/message/get/${selectedConversation._id}`)
                .then((res) => {
                    setLoading(false);
                    setMessages(res.data);
                    console.log(res.data);
                })
                .catch((err) => {
                    setLoading(false);
                });
        };
        if (selectedConversation._id) getMessages();
    }, [selectedConversation._id, setMessages]);
    return { loading, messages };
};

export default useGetMessage;
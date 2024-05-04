import { useSocketContext } from "./SocketContext";
import useConversation from "../../zustand/useConversation";
import { useEffect } from "react";
import sound from "../../assets/notification.mp3";
const useGetLiveSocketMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    // listening event.
    useEffect(() => {
        socket.on("newMessage", (newMessage) => {
            const notification = new Audio(sound);
            notification.play();
            setMessages([...messages, newMessage]);
        });
        return () => socket.off("newMessage");
    }, [socket, messages, setMessages]);
};

export default useGetLiveSocketMessages;
import React from "react";
import { useAuth } from "../../components/context/AuthProvider";
import useConversation from "../../zustand/useConversation";
function Message({ message }) {
  // const { authUser } = useAuth();
  const authUser = JSON.parse(localStorage.getItem("ChatUser"));
  const fromMe = message.senderId === authUser._id;

  const chatName = fromMe ? "chat-end" : "chat-start";
  const chatColor = fromMe ? "bg-blue-500" : "";

  // Extracting hour and minutes from createdAt
  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <div className="px-6 sm:px-10 md:px-20 my-3 p-4">
        <div className={`chat ${chatName}`}>
          <div className={`chat-bubble text-white ${chatColor}`}>
            {message.message}
          </div>
          <div className="text-gray-300 text-xs chat-footer">{formattedTime}</div>
        </div>
      </div>
    </>
  );
}

export default Message;

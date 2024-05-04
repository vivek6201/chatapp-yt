import React from "react";
import useConversation from "../../zustand/useConversation";
import useGetUsers from "../../components/context/useGetUsers";
import { useSocketContext } from "../../components/context/SocketContext";
import { useAuth } from "../../components/context/AuthProvider";

function ChatUser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const getUserOnlineStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  return (
    <>
      <div className="flex items-center h-[8%] justify-center gap-4 bg-slate-800 hover:bg-slate-700 duration-300 rounded-md">
        <div className="avatar online">
          <div className="w-14 rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <div>
          <h3 className="text-xl">{selectedConversation.fullName}</h3>
          <span className="text-sm">
            {" "}
            {getUserOnlineStatus(selectedConversation._id)}
          </span>
        </div>
      </div>
    </>
  );
}

export default ChatUser;
